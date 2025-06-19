const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const path = require("path");
const PORT = 3000;
const https = require('https');
app.use(cors());
app.use(express.json());


app.use(express.static(__dirname));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: 'Too many requests, please try again later.',
});

app.use(limiter);

let currentdata = {};

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/data', (req, res) => {
  res.json(currentdata);
});


app.post('/data', (req, res) => {
  const password = req.headers['key']; // or 'authorization'
  if (password === 'JFLKDASJFLKASDJFDALSKJFASDKLFJRIOQEWREWQBNRBWQEMNRBWMQNEBRMNWQEBRNMB32M1N4B132M4B123NM4123NB42B3VCYCXZ7ZX7C9Z8X7CZ7898C97EHJB34N32B1M4NB132MN4231BM') {
    currentdata = req.body;
    res.json(currentdata);
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});
