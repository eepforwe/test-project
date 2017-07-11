import buildFormObj from '../lib/formObjectBuilder';
import encrypt from '../lib/security';

export default (router, { User }) => {
  router
    .get('newSession', '/session/new', async (ctx) => {
      const data = {};
      ctx.render('/session/new', { f: buildFormObj(data) });
    })
    .post('session', '/session', async (ctx) => {
      const { email, password } = ctx.request.body.form;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user && user.password_hash === encrypt(password)) {
        ctx.session.userId = user.id;
        ctx.redirect(router.url('tasks'));
      } else {
        ctx.flash.set('email or password wrong');
        ctx.render('/session/new', { f: buildFormObj(email) });
      }
    })
    .delete('session', '/session', async (ctx) => {
      ctx.session = {};
      ctx.redirect(router.url('root'));
    });
};
