import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';
import Pug from 'koa-pug';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import koaLogger from 'koa-logger';
import middleware from 'koa-webpack';
import rollbar from 'rollbar';
import path from 'path';
import session from 'koa-generic-session';
import flash from 'koa-flash-simple';
import _ from 'lodash';
import methodOverride from 'koa-methodoverride';
import getWebpackConfig from '../webpack.config.babel';
import addRoutes from './controllers';
import container from './container';

export default () => {
  const app = new Koa();
  const router = new Router();

  app.use(methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      return req.body._method;
    }
  }));

  app.use(bodyParser());
  app.use(koaLogger());
  app.use(serve(path.join(__dirname, '..', 'public')));
  app.keys = ['some secret durr'];
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

  addRoutes(router, container);
  app.use(router.allowedMethods());
  app.use(router.routes());

  app.use(middleware({
    config: getWebpackConfig(),
  }));

  const pug = new Pug({
    viewPath: path.join(__dirname, 'views'),
    baseDir: path.join(__dirname, 'views'),
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
  // app.use(rollbar.errorHandler(process.env.ROLLBAR_TOKEN));

  return app;
};
