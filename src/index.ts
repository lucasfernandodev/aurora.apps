import 'express-async-errors'
import 'dotenv/config'
import express  from 'express';
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
server.use(errorNotFoundMiddleware)

server.listen(PORT, () => console.log(`⚡ Running on  -> ${PORT}`))