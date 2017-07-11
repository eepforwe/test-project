import Sequelize from 'sequelize';
import encrypt from '../lib/security';

export default connect => connect.define('User', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Email address already in use!',
    },
    validate: {
      isEmail: true,
      notEmpty: {
        args: true,
        msg: 'Email must not be empty',
      },
    },
  },
  password_hash: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name',
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name',
  },
  password: {
    type: Sequelize.VIRTUAL,
    allowNull: false,
    set: function set(value) {
      this.setDataValue('password', value);
      this.setDataValue('password_hash', encrypt(value));
    },
    validate: {
      len: {
        args: [6, 18],
        msg: 'password length must be 6-18 symbols',
      },
    },
  },
}, {
  freezeTableName: true,
});
