const express = require('express');
const iconv = require('iconv-lite');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.text({ type: '*/*', limit: '1mb' }));

app.post('/encode', (req, res) => {
  const utf8Text = req.body;
  const sjisBuffer = iconv.encode(utf8Text, 'shift_jis');
  res.setHeader('Content-Type', 'text/csv; charset=Shift_JIS');
  res.send(sjisBuffer);
});

app.get('/', (req, res) => {
  res.send('Shift_JIS encoder is running!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
