import express from 'express';
import LogMiddleware from './middlewares/log.middleware.js';
import ErrorHandlingMiddleware from './middlewares/error-handling.middleware.js';
import userRouter from './routes/user.router.js';
// import sotreRouter from './routes/store.router.js';
// import orderRouter from './routes/order.router.js';
// import reviewRouter from './routes/review.router.js';

const app = express();
const PORT = 7777;

app.use(LogMiddleware);
app.use(express.json());
//app.use('/api'); //라우터 넣는 곳
app.use('/api',userRouter);
app.use(ErrorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
