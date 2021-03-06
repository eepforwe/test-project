/* eslint no-param-reassign: "off"*/

import buildFormObj from '../lib/formObjectBuilder';
import encrypt from '../lib/security';

export default (router, { User }) => {
  router
    .get('newSession', '/session/new', async (ctx) => {
      const data = {};
      ctx.render('sessions/new', { f: buildFormObj(data) });
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
        ctx.flash.set('Success Authorization');
        ctx.redirect(router.url('tasks'));
        return;
      }
      ctx.flash.set('email or password were wrong');
      ctx.render('session/new', { f: buildFormObj({ email }) });
    })
    .delete('session', '/session', async (ctx) => {
      ctx.session = {};
      ctx.redirect(router.url('root'));
    });
};