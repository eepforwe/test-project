import server from '..';

server().listen(process.env.PORT || 5000, () => {
  console.log('Server listen on port 5000');
});