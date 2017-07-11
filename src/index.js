/* eslint no-param-reassign: "off"*/
/* eslint no-underscore-dangle: "off"*/

import 'babel-polyfill';
import path from 'path';
import _ from 'lodash';
import rollbar from 'rollbar';
import Koa from 'koa';
import Router from 'koa-router';
import Pug from 'koa-pug';
import serve from 'koa-static';
import session from 'koa-generic-session';
import flash from 'koa-flash-simple';
import bodyParser from 'koa-bodyparser';
import koaLogger from 'koa-logger';
import methodOverride from 'koa-methodoverride';
import middleware from 'koa-webpack';
import getWebpackConfig from '../webpack.config.babel';
import addRoutes from './controllers';
import container from './container';

export default () => {
  const app = new Koa();
  app.use(bodyParser());
  app.use(koaLogger());
  app.use(methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      return req.body._method;
    }
    return '';
  }));
  app.use(serve(path.join(__dirname, '..', 'public')));
  app.keys = ['some secret hurr'];
  app.use(session(app));
  app.use(flash());

  app.use(async (ctx, next) => {
    ctx.state = {
      flash: ctx.flash,
      isSignedIn: () => ctx.session.userId !== undefined,
      signedId: () => ctx.session.userId,
    };
    await next();
  });

  const router = new Router();
  const isLogined = async (ctx, next) => {
    if (ctx.session.userId) {
      await next();
      return;
    }
    ctx.flash.set('Please register or log in your account!');
    ctx.redirect(router.url('newSession'));
  };
  router.use('/tasks', isLogined);
  addRoutes(router, container);
  app.use(router.allowedMethods());
  app.use(router.routes());

  app.use(middleware({
    config: getWebpackConfig(),
  }));

  const pug = new Pug({
    viewPath: path.join(__dirname, 'views'),
    basedir: path.join(__dirname, 'views'),
    debug: true,
    pretty: true,
    compileDebug: true,
    locals: [],
    helperPath: [
      { _ },
      { urlFor: (...args) => router.url(...args) },
    ],
  });

  pug.use(app);
  rollbar.init('');
  rollbar.errorHandler('');
  rollbar.handleUnhandledRejections('');
  return app;
};