const express = require('express');
const iconv = require('iconv-lite');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.post('/encode', (req, res) => {
  const text = req.body.text;

  if (!text) {
    return res.status(400).send('Missing "text" in request body.');
  }

  try {
    const encoded = iconv.encode(text, 'Shift_JIS');
    res.set('Content-Type', 'application/octet-stream');
    res.send(encoded);
  } catch (err) {
    res.status(500).send('Encoding error: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`Shift_JIS encoder API listening at http://localhost:${port}`);
});
