import buildFormObj from '../lib/formObjectBuilder';

export default (router, { User, Task, Status, Tag, Comment }) => {
  router
    .get('task form', '/tasks/new', async (ctx) => {
      const id = ctx.state.signedId();
      const user = await User.findBy(id);
      const task = Task.build();
      const users = await User.findAll();
      ctx.render('tasks/new', { f: buildFormObj(task), users, user });
    })
    .get('tasks', '/tasks', async (ctx) => {
      const tasks = await Task.findAll();
      const statuses = await Status.findAll();
      ctx.render('tasks/index', { tasks, statuses });
    })
    .post('new task', '/tasks/new', async (ctx) => {
      const form = ctx.request.body.form;
      const task = Task.build(form);
      try {
        await task.save();
        ctx.flash.set('Task was created OK');
        ctx.redirect(router.url('tasks'));
      } catch (e) {
        ctx.render('tasks/new', { f: buildFormObj(task, e) });
      }
    });
};
