import { IStateEnv } from '../../src/infrastructure/config/config';
import { IServiceApp } from '../../src/infrastructure/webserver/server-service';

interface IGetConfigApp {
  ENV_NODE: IStateEnv;
  DATABASE_DEBUG: boolean;
}

export const getConfigAppMock = (args: IGetConfigApp): IServiceApp['ConfigApp'] => {
  const { ENV_NODE, DATABASE_DEBUG } = args;
  return {
    ENV_NODE,
    HOST: 'Localhost-test',
    PORT: '191919',
    DATABASE_URL: 'Database-test',
    DATABASE_DEBUG,
  };
};

export const getConfigLoggerMock = (): IServiceApp['Logger'] => {
  const Logger = jest.fn() as unknown as jest.MockedClass<IServiceApp['Logger']>;
  Logger.warn = jest.fn();
  Logger.error = jest.fn();
  Logger.info = jest.fn();
  Logger.debug = jest.fn();
  return Logger;
};
