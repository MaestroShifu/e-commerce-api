import winston from 'winston';
import ConfigApp, { IStateEnv } from '../config/config';

const devPrint = (info: winston.Logform.TransformableInfo) => `\u001B[34m[${info.timestamp}]\u001b[39m ${info.level}: ${info.message}`;
const prodPrint = (info: winston.Logform.TransformableInfo) => `\u001b[39m ${info.level}: ${info.message}`;

const devTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.printf(devPrint),
  ),
});

const prodTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.printf(prodPrint),
  ),
});

const configLogger = (configApp: typeof ConfigApp) => (): winston.Logger => {
  const transports = configApp.ENV_NODE === IStateEnv.prod ? [prodTransport] : [devTransport];
  return winston.createLogger({
    exitOnError: false,
    transports,
  });
};

export default configLogger(ConfigApp);
