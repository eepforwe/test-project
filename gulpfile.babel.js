import gulp from 'gulp';
import getServer from './src';
import init from './src/init';

gulp.task('server', (cb) => {
  getServer().listen(process.env.PORT || 5000, cb);
});

gulp.task('init', async () => {
  await init();
  console.log('db was created');
});
