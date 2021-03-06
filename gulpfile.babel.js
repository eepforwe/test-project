import gulp from 'gulp';
import gutil from 'gulp-util';
import repl from 'repl';
import container from './src/container';
import getServer from './src';
import init from './src/init';

gulp.task('server', (cb) => {
  getServer().listen(process.env.PORT || 5000, cb);
});

gulp.task('init', async () => {
  await init();
  console.log('db was created');
});

gulp.task('console', () => {
  gutil.log = gutil.noop;
  const replServer = repl.start({
    prompt: 'Application console > ',
  });

  Object.keys(container).forEach((key) => {
    replServer.context[key] = container[key];
  });
});