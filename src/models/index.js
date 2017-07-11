import getStatus from './Status';
import getTag from './Tag';
import getTask from './Task';
import getUser from './User';

export default connect => ({
  User: getUser(connect),
  Task: getTask(connect),
  Tag: getTag(connect),
  Status: getStatus(connect),
});
