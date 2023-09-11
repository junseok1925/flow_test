const express = require('express');
const app = express();
const router = require('./routers');
const expressLayouts = require('express-ejs-layouts'); // EJS 설정

require('dotenv').config();
const port = process.env.PORT

app.set('view engine', 'ejs'); // EJS를 뷰 엔진으로 설정
app.use(expressLayouts); // EJS 레이아웃을 사용하기 위한 미들웨어

app.use(express.json()); // JSON 데이터를 파싱하기 위한 미들웨어
app.use('/api', router);

// 추가된 라우트 ejs
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
  console.log(`server 열림 http://localhost:${port}`);
});
