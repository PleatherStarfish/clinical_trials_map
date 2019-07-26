const express = require('express');
const bodyParser =require('body-parser');
const cors = require('cors');
const proxy = require('http-proxy-middleware');

const server = express();

const port = process.env.PORT || 3001;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use('/api/query', proxy({ target: 'https://clinicaltrials.gov', changeOrigin: true }));

server.get('/', (req, res) => res.send('Test'));

server.listen(port, () => console.log(`Example app listening on port ${port}!`));
