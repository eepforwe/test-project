import Koa from 'koa';
import Router from 'koa-router';
import Pug from 'koa-pug';
import middleware from 'koa-webpack';
import rollbar from 'rollbar';
import path from 'path';
import getWebpackConfig from '../webpack.config.babel';

const app = new Koa();
const pug = new Pug({
  viewPath: path.join(__dirname, 'views'),
  baseDir: path.join(__dirname, 'views'),
});
app.use(pug);

const router = new Router();
app.use(router.allowedMethods());
app.use(router.routes());

router.get('/', (ctx) => {
  ctx.render('welcome');
});

const rollbarTocken = process.env.ROLLBAR_TOCKEN;
rollbar.init(rollbarTocken);
app.use(rollbar.errorHandler(rollbarTocken));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('hui');
});
