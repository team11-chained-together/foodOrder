import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import LogMiddleware from './middlewares/log.middleware.js';
import ErrorHandlingMiddleware from './middlewares/error-handling.middleware.js';
import storeRouter from './routes/store.router.js';
import userRouter from './routes/user.router.js';
import menuRouter from './routes/menu.router.js';
import testnodemailer from './routes/testnodemailer.router.js';

import checkOrderRouter from './routes/checkOrder.router.js';
import userOrderRouter from './routes/userOrder.router.js';
import reviewRouter from './routes/review.router.js';
import storeRankingRouter from './routes/storeRanking.router.js';

const app = express();
const PORT = 7777;

app.use(LogMiddleware);
app.use(express.json());
app.use(cookieParser());

// 세션 설정
app.use(
  session({
    secret: 'your-secret-key', // 세션 암호화 키
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false ,
    }, // HTTPS 사용 시 true로 설정
  }),
);

app.use('/api', [
  storeRouter,
  userRouter,
  menuRouter,
  userOrderRouter,
  reviewRouter,
  checkOrderRouter,
  testnodemailer,
  storeRankingRouter,
]); //라우터 넣는 곳

app.use(ErrorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
