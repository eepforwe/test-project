import Sequelize from 'sequelize';

export default connect => connect.define('Tag', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      unique: true,
    },
  },
}, {
  freezeTableName: true,
});
