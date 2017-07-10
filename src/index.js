import Koa from 'koa';
import Router from 'koa-router';
import Pug from 'koa-pug';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';
import koaLogger from 'koa-logger';
import middleware from 'koa-webpack';
import rollbar from 'rollbar';
import path from 'path';
import getWebpackConfig from '../webpack.config.babel';

export default () => {
  const app = new Koa();
  const router = new Router();

  app.use(bodyParser());
  app.use(koaLogger());

  router.get('/', (ctx) => {
    ctx.render('welcome');
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
  app.use(serve(path.join(__dirname, 'views')));

  const pug = new Pug({
    viewPath: path.join(__dirname, 'views'),
    baseDir: path.join(__dirname, 'views'),
  });
  pug.use(app);
  // app.use(rollbar.errorHandler(process.env.ROLLBAR_TOKEN));

  return app;
};
