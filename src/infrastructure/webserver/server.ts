import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import startConnectDB from '../orm/config-db';
import { configServer, ConfigServer, ServiceDb } from './server-service';

interface IStartApp {
  appExpress: express.Express
  connectionDb: () => Promise<void>
  config: ConfigServer
}

// Start db config start DB
const startDB = startConnectDB({
  ...ServiceDb,
  config: configServer,
});

const app: express.Express = express();

// Set security Http headers
app.use(helmet());
// Parse json request body
app.use(bodyParser.json());
// parse urlencoded request body
app.use(bodyParser.urlencoded({ extended: false }));
// Sanitize request data of xss
app.use(xss());
// gzip compression
app.use(compression());
// Enable cors
app.use(cors());
app.options('*', cors());

const startApp = (args: IStartApp) => async () => {
  const { appExpress, connectionDb, config } = args;
  // Manejo a la conexion a base de datos
  await connectionDb();
  // Manejo del servidor
  appExpress.listen(config.PORT, () => {
    console.log(`Servidor listo, corre en el puerto: ${config.PORT}`);
  });
};

const startServer = startApp({
  appExpress: app,
  connectionDb: startDB,
  config: configServer,
});

export { app, startServer, startApp };
