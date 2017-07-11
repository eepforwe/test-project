export default (router) => {
  router.get('/404', (ctx) => {
    /* eslint-disable no-alert, no-param-reassign */
    ctx.status = 404;
    /* eslint-enable no-alert, no-param-reassign */
    ctx.render('errors/index');
  });
};