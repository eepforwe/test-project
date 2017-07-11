import Sequelize from 'sequelize';

export default connect => connect.define('Comment', {
  content: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
}, {
  freezeTableName: true,
});
