import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Recipient from '../app/models/Recipient';
import Order from '../app/models/Order';
import Deliveryman from '../app/models/Deliveryman';

import databaseConfig from '../config/database';

const models = [User, File, Recipient, Order, Deliveryman];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
