import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
