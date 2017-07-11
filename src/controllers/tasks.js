import url from 'url';
import rollbar from 'rollbar';
import buildFormObj from '../lib/formObjectBuilder';
import { getData, getParams } from '../lib/getData';

export default (router, { User, Task, Status, Tag, Comment }) => {
  router
    .get('task form', '/tasks/new', async (ctx) => {
      const task = Task.build();
      const users = await User.findAll();
      ctx.render('tasks/new', { f: buildFormObj(task), users });
    })
    .get('tasks', '/tasks', async (ctx) => {
      const { query } = url.parse(ctx.request.url, true);
      const where = getParams(query, ctx);
      const filteredTasks = await Task.findAll({ where });
      const tasks = await Promise.all(
        filteredTasks.map(async task => getData(task)));
      const statuses = await Status.findAll();
      ctx.render('tasks/index', { tasks, statuses });
    })
    .get('task', '/tasks/:id', async (ctx) => {
      const id = Number(ctx.params.id);
      const taskPromise = await Task.findById(id);
      const task = await getData(taskPromise);
      const statuses = await Status.findAll();
      ctx.render('tasks/task', { f: buildFormObj(task), task, statuses });
    })
    .post('new task', '/tasks/new', async (ctx) => {
      const form = ctx.request.body.form;
      form.creatorId = ctx.session.userId;
      const users = await User.findAll();
      //  const tags = form.Tags.split(' ');
      const task = Task.build(form);
      try {
        await task.save();
        // tags.map(tag => Tag.findOne({ where: { name: tag } })
        //   .then(async result => (result ? task.addTag(result) :
        //   task.createTag({ name: tag }))));
        ctx.flash.set('Task has been created');
        ctx.redirect(router.url('tasks'));
      } catch (e) {
        rollbar.handleError(e);
        ctx.render('tasks/new', { f: buildFormObj(task, e), users });
      }
    })
    .patch('task', '/tasks/:id', async (ctx) => {
      const { statusId, taskId } = ctx.request.body;
      const task = await Task.findById(Number(taskId));
      task.setStatus(Number(statusId));
      ctx.redirect(`/tasks/${taskId}`);
    })
    .delete('delete task', '/tasks/:id', async (ctx) => {
      const taskId = Number(ctx.params.id);
      Task.destroy({
        where: { id: taskId },
      });
      ctx.flash.set('Task has been deleted');
      ctx.redirect(router.url('tasks'));
    });
};