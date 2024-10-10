import express from 'express';
import LogMiddleware from './middlewares/log.middleware.js';
import ErrorHandlingMiddleware from './middlewares/error-handling.middleware.js';
<<<<<<< HEAD
import storeRouter from './routes/store.router.js';
=======
import userRouter from './routes/user.router.js';
>>>>>>> shinminjae

const app = express();
const PORT = 7777;

app.use(LogMiddleware);
app.use(express.json());
<<<<<<< HEAD
app.use('/api', [storeRouter]); //라우터 넣는 곳
=======
//app.use('/api'); //라우터 넣는 곳
app.use('/api', userRouter);
>>>>>>> shinminjae
app.use(ErrorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
