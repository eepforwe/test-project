import path from 'path';

export default () => ({
  entry: {
    app: ['./client'],
  },
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'application.js',
    publicPath: '/assets/',
  },
});
