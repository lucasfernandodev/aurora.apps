import 'express-async-errors'
import 'dotenv/config'
import express, { type Request, type Response } from 'express';
import { errorMiddleware } from 'middleware/error';
import { errorNotFoundMiddleware } from 'middleware/error-notfound';
import { apiRouter } from 'routes';

const server = express();
const PORT = process.env.PORT || 3000

server.use(express.static('public'))

server.use(express.json({ limit: '5mb' }));
server.use(express.urlencoded({ extended: true }));

server.use(errorMiddleware);
server.use(apiRouter);
server.get("/api/status", (req: Request, res: Response) => {
  console.log("status")
  return res.status(200).end();
})
server.use(errorNotFoundMiddleware)


server.listen(PORT, () => console.log(`⚡ Running on  -> ${PORT}`))