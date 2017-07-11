import Sequelize from 'sequelize';
import encrypt from '../lib/security';

export default connect => connect.define('User', {
  email: {
    type: Sequelize.STRING,
    unique: {
      args: true,
      msg: 'Oops. Looks like account with this email address already use',
    },
    validate: {
      isEmail: {
        args: true,
        msg: 'The email you entered is invalid.',
      },
      notEmpty: {
        args: true,
        msg: 'Please enter the email',
      },
    },
  },

  password_hash: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },

  password: {
    type: Sequelize.VIRTUAL,
    set: function set(value) {
      this.setDataValue('password_hash', encrypt(value));
      this.setDataValue('password', value);
      return value;
    },
    validate: {
      len: {
        args: [4, 18],
        msg: 'password length must be 4 - 18 symbols',
      },
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
}, {
  getterMethods: {
    fullName: function fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
  },
  freezeTableName: true,
});
