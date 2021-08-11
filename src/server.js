const express = require('express');
const cors = require('cors');
require('dotenv').config();

const router = require('../src/api/students/router');

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());
server.use('/api', router);

server.listen(port, () => {
  console.log('rest api is running in http://localhost:'+port);
});

server.get('/', (request, response) => {
  response.send('Hello Welcome Back');
});
