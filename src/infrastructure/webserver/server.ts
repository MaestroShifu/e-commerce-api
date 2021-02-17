import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import startConnectDB from '../orm/config-db';
import { IServiceApp, ServiceApp } from './server-service';

interface IStartApp {
  appExpress: express.Express;
  connectionDb: () => Promise<void>;
  service: IServiceApp;
}

// Start db config start DB
const startDB = startConnectDB(ServiceApp);

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

const listenCallback = (service: IServiceApp) => () => {
  const { ConfigApp, Logger } = service;
  Logger.info(`Servidor listo, corre en el puerto: ${ConfigApp.PORT}`);
};

const startApp = (args: IStartApp) => async () => {
  const { appExpress, connectionDb, service } = args;
  // Manejo a la conexion a base de datos
  await connectionDb();
  // Manejo del servidor
  appExpress.listen(service.ConfigApp.PORT, listenCallback(service));
};

const startServer = startApp({
  appExpress: app,
  connectionDb: startDB,
  service: ServiceApp,
});

export {
  app, startServer, startApp, listenCallback,
};
