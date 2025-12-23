const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the project root (where wormgpt[1].html lives)
app.use(express.static(path.join(__dirname)));

// Serve the chat HTML at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'wormgpt[1].html'));
});

app.listen(port, () => {
  console.log(`T20-CLASSIC AI running on port ${port}`);
});
