const express = require('express');
const iconv = require('iconv-lite');
const app = express();
const port = process.env.PORT || 3000;

// バイナリ(base64)受信のための設定
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Shift_JISにエンコードするCSVエンドポイント
app.post('/convert-csv', (req, res) => {
  const base64Csv = req.body.base64; // base64でエンコードされたCSV文字列

  if (!base64Csv) {
    return res.status(400).send('Missing "base64" field in request body.');
  }

  try {
    // base64からバッファに変換（utf-8 CSV文字列として解釈）
    const utf8Buffer = Buffer.from(base64Csv, 'base64');

    // Shift_JISにエンコード
    const shiftJisBuffer = iconv.encode(utf8Buffer.toString('utf-8'), 'Shift_JIS');

    // ダウンロード可能なファイルとしてレスポンス
    res.set({
      'Content-Type': 'text/csv; charset=Shift_JIS',
      'Content-Disposition': 'attachment; filename="converted.csv"',
    });

    res.send(shiftJisBuffer);
  } catch (err) {
    res.status(500).send('Encoding error: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`Shift_JIS CSV encoder API running at http://localhost:${port}`);
});