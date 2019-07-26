const express = require('express');
const bodyParser =require('body-parser');
const cors = require('cors');
const proxy = require('http-proxy-middleware');

const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/query', proxy({ target: 'https://clinicaltrials.gov', changeOrigin: true }));

app.get('/', (req, res) => res.send('Test'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
