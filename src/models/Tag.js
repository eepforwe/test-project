import Sequelize from 'sequelize';

export default connect => connect.define('Tag', {
  name: {
    type: Sequelize.String,
    validate: {
      notEmpty: true,
      unique: true,
    },
  },
}, {
  freezeTableName: true,
});
