import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from "../middleware/error.js";


// import router
import base from '../routes/base.js';
import validate from '../routes/validate.js';

const app = express();

app.use(express.json());

// Enable CORS
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// mount router
app.use('/validate-rule', validate);
app.use('/', base);


// handle errors
app.use(errorHandler);

export default app;
