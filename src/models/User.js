import Sequelize from 'sequelize';
import encrypt from '../lib/security';

export default connect => connect.define('User', {
  email: {
    type: Sequelize.STRING,
    unique: {
      args: true,
      msg: 'Email address already in use!',
    },
    validate: {
      isEmail: {
        args: true,
        msg: 'Not email format',
      },
      notNull: true,
      notEmpty: {
        args: true,
        msg: 'Plz enter email',
      },
    },
  },
  password_hash: {
    type: Sequelize.STRING,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },
  firstName: {
    notNull: true,
    type: Sequelize.STRING,
    field: 'first_name',
  },
  lastName: {
    notNull: true,
    type: Sequelize.STRING,
    field: 'last_name',
  },
  password: {
    type: Sequelize.VIRTUAL,
    set: function set(value) {
      this.setDataValue('password_hash', encrypt(value));
      this.setDataValue('password', value);
    },
    validate: {
      notNull: true,
      len: {
        args: [6, 18],
        msg: 'password length must be 6-18 symbols',
      },
    },
  },
}, {
  freezeTableName: true,
});
