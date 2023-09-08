const express = require('express');
const app = express();
const router = require('./routers');

require('dotenv').config();
const port = 3000;

app.use(express.json()); // JSON 데이터를 파싱하기 위한 미들웨어
app.use('/api', router);

app.listen(port, () => {
  console.log(`server start http://localhost:${port}`);
});
