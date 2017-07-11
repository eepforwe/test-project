import Sequelize from 'sequelize';

export default connect => connect.define('Comment', {
  content: {
    type: Sequelize.TEXT,
    validate: {
      notEmpty: true,
    },
  },
}, {
  tableName: 'Comment',
});