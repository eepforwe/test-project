export default (router, { Task }) => {
  console.log(Task);
  router
    .get('tasks', '/tasks', (ctx) => {
      ctx.render('tasks/index');
    });
};
