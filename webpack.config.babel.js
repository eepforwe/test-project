import path from 'path';

export default () => ({
  entry: {
    app: ['./client'],
  },
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'index.js',
    publicPath: '/assets/',
  },
});
