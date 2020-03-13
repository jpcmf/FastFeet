import { startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import File from '../models/File';
import Order from '../models/Order';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

class DeliverymanOrderController {
  async index(req, res) {
    const { id } = req.params;
    const { page } = req.query;
    const { delivered } = req.query;
    const currentPage = page || '1';

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man does not exists.' });
    }

    if (delivered === 'false') {
      const orders = await Order.findAndCountAll({
        where: {
          deliveryman_id: id,
          end_date: null,
          canceled_at: null,
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
        limit: 5,
        offset: (currentPage - 1) * 5,
      });

      return res.json(orders);
    }

    const orders = await Order.findAndCountAll({
      where: {
        deliveryman_id: id,
        [Op.or]: [
          { end_date: { [Op.ne]: null } },
          { canceled_at: { [Op.ne]: null } },
        ],
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
      limit: 5,
      offset: (currentPage - 1) * 5,
    });

    return res.json(orders);
  }

  async update(req, res) {
    const { id, orderId } = req.params;

    const { endDelivery } = req.query;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Delivery man does not exists.' });
    }

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(400).json({ error: 'This order does not exists.' });
    }

    const date = new Date();

    const ordersByDay = await Order.findAll({
      where: {
        start_date: {
          [Op.between]: [startOfDay(date), endOfDay(date)],
        },
      },
    });

    if (endDelivery === 'false' && ordersByDay.length >= 5) {
      return res
        .status(400)
        .json({ error: 'Limit of 5 withdrawals per day exceeded.' });
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
    } = await Order.findByPk(orderId);

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
}

export default new DeliverymanOrderController();
