import express from 'express';
import cors from 'cors';
import routes from './routes';

export const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

server.use(routes);
