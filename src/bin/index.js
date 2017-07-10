#! /usr/bin/env node

import server from '../'

server().listen(process.env.PORT || 3000, () => {
  console.log('Server listen on port 3000');
});