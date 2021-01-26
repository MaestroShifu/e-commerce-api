import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';

const app: express.Express = express();

// Set security Http headers
app.use(helmet());
// Parse json request body
app.use(bodyParser.json());
// parse urlencoded request body
app.use(bodyParser.urlencoded({extended: false}));
// Sanitize request data of xss
app.use(xss());
// gzip compression
app.use(compression());
// Enable cors
app.use(cors());
app.options('*', cors());

export default app;