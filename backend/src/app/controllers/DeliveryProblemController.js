import * as Yup from 'yup';
import { Op } from 'sequelize';

import DeliveryProblem from '../models/DeliveryProblem';
import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import CancelOrderMail from '../jobs/CancelOrderMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async index(req, res) {
    const { id } = req.params;
    const { page } = req.query;
    const currentPage = page || '1';

    if (id) {
      const deliveryProblem = await DeliveryProblem.findAndCountAll({
        where: {
          delivery_id: id,
        },
        attributes: ['id', 'description'],
      });

      return res.json(deliveryProblem);
    }

    const deliveryProblems = await DeliveryProblem.findAndCountAll({
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: [
            'id',
            'product',
            'start_date',
            'end_date',
            'canceled_at',
          ],
        },
      ],
      order: [['delivery_id', 'ASC']],
      limit: 5,
      offset: (currentPage - 1) * 5,
      attributes: ['id', 'description'],
    });

    return res.json(deliveryProblems);
  }

  async store(req, res) {
    const { deliveryId } = req.params;
    const { description } = req.body;

    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id, delivery_id } = await DeliveryProblem.create({
      delivery_id: deliveryId,
      description,
    });

    return res.json({
      id,
      delivery_id,
      description,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryProblem = await DeliveryProblem.findByPk(id);

    if (!deliveryProblem) {
      return res.status(400).json({ error: 'Problem does not exists.' });
    }

    const { delivery_id } = deliveryProblem;

    const order = await Order.findByPk(delivery_id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
        },
        {
          model: Recipient,
          as: 'recipient',
        },
      ],
    });

    console.log(order);

    if (!order) {
      return res.status(400).json({ error: 'Order does not exists.' });
    }

    if (order.canceled_at !== null) {
      return res
        .status(400)
        .json({ error: 'This order was already cancelled.' });
    }

    if (order.end_date !== null) {
      return res
        .status(400)
        .json({ error: 'This order was already delivered.' });
    }

    const {
      product,
      canceled_at,
      recipient_id,
      deliveryman_id,
    } = await order.update({
      ...req.body,
      canceled_at: new Date(),
    });

    await Queue.add(CancelOrderMail.key, {
      order,
      deliveryProblem,
    });

    return res.json({
      delivery_id,
      product,
      canceled_at,
      recipient_id,
      deliveryman_id,
    });
  }
}

export default new DeliveryProblemController();
