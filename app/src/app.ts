import { router as apiRouter } from './api';
import { errorHandlingMiddleware } from './error';
import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.send('OK');
});

app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).send('Not found');
});

app.use(errorHandlingMiddleware);

export { app };
