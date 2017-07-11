import getUser from './User';
import getStatus from './Status';
import getTag from './Tag';
import getTask from './Task';
import getComment from './Comment';
import getTaskTag from './TaskTag';


export default (connect) => {
  const models = {
    User: getUser(connect),
    Status: getStatus(connect),
    Task: getTask(connect),
    Tag: getTag(connect),
    TaskTag: getTaskTag(connect),
    Comment: getComment(connect),
  };

  models.User.hasMany(models.Task, { foreignKey: 'creatorId', as: 'creator' });
  models.User.hasMany(models.Task, { foreignKey: 'assignedToId', as: 'assignedTo' });

  models.Task.belongsTo(models.User, { as: 'assignedTo' });
  models.Task.belongsTo(models.User, { as: 'creator' });
  models.Task.belongsTo(models.Status);

  models.Status.hasMany(models.Task);

  // models.Tag.belongsToMany(models.Task, { through: 'TaskTag' });
  // models.Task.belongsToMany(models.Tag, { through: 'TaskTag' });

  return models;
};
