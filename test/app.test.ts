import express from 'express';
import { IServiceApp } from '../src/infrastructure/webserver/server-service';
import { listenCallback, startApp } from '../src/infrastructure/webserver/server';
import startConnectDB from '../src/infrastructure/orm/config-db';
import { getConfigAppMock, getConfigLoggerMock } from './utils/service-mock';
import { IStateEnv } from '../src/infrastructure/config/config';

type IStartConnectDB = () => Promise<void>;

describe('Start web Server', () => {
  test('Start Server succesfull', async () => {
    const Logger = getConfigLoggerMock();
    const ConfigApp = getConfigAppMock({
      ENV_NODE: IStateEnv.test,
      DATABASE_DEBUG: true,
    });
    const listenMock = jest.fn();
    const appExpress = jest.fn().mockReturnThis as unknown as jest.MockedFunction<express.Express>;
    appExpress.listen = jest.fn((ConfigApp.PORT, listenMock));
    const connectionDb: jest.MockedFunction<IStartConnectDB> = jest.fn();
    const service = {
      ConfigApp,
      Logger,
    } as IServiceApp;
    const listenApp = listenCallback(service);
    listenApp();
    expect(Logger.info).toBeCalled();
    const start = startApp({
      appExpress,
      connectionDb,
      service,
    });
    await start();
    expect(connectionDb).toBeCalled();
    expect(appExpress.listen).toBeCalled();
    expect(listenMock).toBeCalled();
    expect(appExpress.listen).toHaveBeenCalledWith(ConfigApp.PORT, expect.anything());
  });

  test('Start connect db succesfull', async () => {
    const rawMock = jest.fn();
    const Knex = jest.fn().mockReturnValue({
      raw: rawMock,
    }) as unknown as jest.MockedFunction<IServiceApp['Knex']>;
    const Model = jest.fn() as unknown as jest.MockedClass<IServiceApp['Model']>;
    Model.knex = jest.fn();
    const Logger = getConfigLoggerMock();
    const ConfigApp = getConfigAppMock({
      ENV_NODE: IStateEnv.test,
      DATABASE_DEBUG: true,
    });
    const argsMocked = {
      Knex,
      Model,
      ConfigApp,
      Logger,
    } as IServiceApp;
    const connectDB = startConnectDB(argsMocked);
    await connectDB();
    expect(Knex).toBeCalled();
    expect(Knex).toHaveBeenCalledWith(expect.objectContaining({
      connection: ConfigApp.DATABASE_URL,
      debug: ConfigApp.DATABASE_DEBUG,
    }));
    expect(Knex).toHaveReturned();
    expect(rawMock).toHaveBeenCalledTimes(2);
    expect(rawMock).toHaveBeenNthCalledWith(1, 'SET timezone="UTC";');
    expect(rawMock).toHaveBeenNthCalledWith(2, 'select version();');
    expect(Model.knex).toBeCalled();
  });

  test('Start connect db error', async () => {
    const rawMock = jest.fn().mockImplementation(() => {
      throw new Error('ERROR_DB');
    });
    const Knex = jest.fn().mockReturnValue({
      raw: rawMock,
    }) as unknown as jest.MockedFunction<IServiceApp['Knex']>;
    const Model = jest.fn() as unknown as jest.MockedClass<IServiceApp['Model']>;
    Model.knex = jest.fn();
    const Logger = getConfigLoggerMock();
    const ConfigApp = getConfigAppMock({
      ENV_NODE: IStateEnv.test,
      DATABASE_DEBUG: true,
    });
    const argsMocked = {
      Knex,
      Model,
      ConfigApp,
      Logger,
    } as IServiceApp;
    const connectDB = startConnectDB(argsMocked);
    await connectDB();
    expect(Knex).toBeCalled();
    expect(Knex).toHaveBeenCalledWith(expect.objectContaining({
      connection: ConfigApp.DATABASE_URL,
      debug: ConfigApp.DATABASE_DEBUG,
    }));
    expect(Knex).toHaveReturned();
    expect(rawMock).toHaveBeenCalledWith('SET timezone="UTC";');
    expect(rawMock).toThrow();
    expect(Model.knex).toHaveBeenCalledTimes(0);
  });
});
