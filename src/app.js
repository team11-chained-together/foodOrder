import express from 'express';
import cookieParser from 'cookie-parser';
import LogMiddleware from './middlewares/log.middleware.js';
import ErrorHandlingMiddleware from './middlewares/error-handling.middleware.js';
import storeRouter from './routes/store.router.js';
import userRouter from './routes/user.router.js';
import menuRouter from './routes/menu.router.js';
import userOrderRouter from './routes/userOrder.router.js';

const app = express();
const PORT = 7777;

app.use(LogMiddleware);
app.use(express.json());
app.use(cookieParser());

app.use('/api', [storeRouter, userRouter, menuRouter, userOrderRouter]); //라우터 넣는 곳

app.use(ErrorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
