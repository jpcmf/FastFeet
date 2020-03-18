import * as Yup from 'yup';
import { Op } from 'sequelize';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import NewOrderMail from '../jobs/NewOrderMail';
import Queue from '../../lib/Queue';

class OrderController {
  async index(req, res) {
    const { page, q } = req.query;
    const currentPage = page || '1';
    const name = q || '';

    const orders = await Order.findAndCountAll({
      where: {
        product: { [Op.iLike]: `%${name}%` },
      },
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Recipient,
          as: 'recipient',
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
      order: [['id', 'ASC']],
      limit: 4,
      offset: (currentPage - 1) * 4,
    });

    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    try {
      const { id, deliveryman_id, product } = await Order.create(req.body);

      const deliveryman = await Deliveryman.findByPk(deliveryman_id);

      const order = await Order.findByPk(id, {
        include: [
          {
            model: Recipient,
            as: 'recipient',
            attributes: [
              'name',
              'street',
              'number',
              'complement',
              'state',
              'city',
              'cep',
            ],
          },
        ],
      });

      await Queue.add(NewOrderMail.key, {
        deliveryman,
        product,
        order,
      });

      return res.json(order);
    } catch (err) {
      if (err.parent.constraint === 'orders_deliveryman_id_fkey') {
        return res
          .status(400)
          .json({ error: 'This recipient does not exists.' });
      }

      if (err.parent.constraint === 'orders_recipient_id_fkey') {
        return res
          .status(400)
          .json({ error: 'This delivery man does not exists.' });
      }

      return this;
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'This order does not exists.' });
    }

    await order.update(req.body);

    const {
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    } = await Order.findByPk(id);

    return res.json({
      id,
      recipient_id,
      deliveryman_id,
      signature_id,
      product,
      canceled_at,
      start_date,
      end_date,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(400).json({ error: 'This order does not exists.' });
    }

    await Order.destroy({
      where: {
        id,
      },
    });

    return res.json({ success: 'The order was removed with success.' });
  }
}

export default new OrderController();
