require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname)));

const chatHandler = require('./api/chat.js');
app.post('/api/chat', chatHandler);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'wormgpt[1].html'));
});

app.listen(port, () => {
  console.log(`Dev server with API running on port ${port}`);
});
