import buildFormObj from '../lib/formObjectBuilder';

export default (router, { User }) => {
  router
    .get('user list', '/users', async (ctx) => {
      const users = await User.findAll();
      ctx.render('users', { users });
    })
    .get('reg form', '/users/new', async (ctx) => {
      const user = await User.build();
      ctx.render('users/new', { f: buildFormObj(user) });
    })
    .post('new user', '/users/new', async (ctx) => {
      const form = ctx.request.body.form;
      const user = User.build(form);
      try {
        await user.save();
        ctx.flash.set('User has been created successfully');
        ctx.redirect(router.url('newSession'));
      } catch (e) {
        ctx.render('/users/new', { f: buildFormObj(user, e) });
      }
    })
    .get('profile', '/users/:id', async (ctx) => {
      const id = Number(ctx.params.id);
      const user = User.findById(id);
      ctx.render('/user/profile', { user });
    })
    .delete('delete user', '/users/:id', (ctx) => {
      const userId = Number(ctx.params.id);
      User.destroy({
        where: {
          id: userId,
        },
      });
      ctx.flash.set('User has been deleted');
      ctx.redirect(router.url('root'));
    });
};
