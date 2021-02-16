import express, { Application } from 'express';
import { startApp } from '../src/infrastructure/webserver/server';
import startConnectDB from '../src/infrastructure/orm/config-db';
import { IServiceDb } from '../src/infrastructure/webserver/server-service';

type IStartConnectDB = () => Promise<void>;

describe('Start web Server', () => {
  test('Start Server succesfull', async () => {
    const config: any = {
      PORT: 3000,
    };
    const appExpress = {
      listen: jest.fn() as jest.MockedFunction<Application['listen']>,
    } as unknown as jest.MockedFunction<express.Express>;
    const connectionDb: jest.MockedFunction<IStartConnectDB> = jest.fn();
    const start = startApp({
      appExpress,
      connectionDb,
      config,
    });
    await start();
    expect((appExpress.listen as jest.Mock).mock.calls[0][0]).toEqual(3000);
    expect(connectionDb.mock.calls.length).toEqual(1);
  });

  test('Start connect db succesfull', async () => {
    const Knex = jest.fn().mockReturnValue({
      raw: jest.fn(),
    }) as unknown as jest.MockedFunction<IServiceDb['Knex']>;
    const Model = jest.fn() as unknown as jest.MockedClass<IServiceDb['Model']>;
    Model.knex = jest.fn() as jest.MockedFunction<typeof Model.knex>;
    const config: any = {
      DATABASE_URL: 'URL_DATABASE',
      DATABASE_DEBUG: true,
    };
    const connectDB = startConnectDB({ Knex, Model, config });
    await connectDB();
    expect(Knex.mock.calls.length).toEqual(1);
    expect((Knex.mock.calls[0][0] as any).connection).toEqual('URL_DATABASE');
    expect((Knex.mock.calls[0][0] as any).debug).toEqual(true);
    const { raw } = Knex.mock.results[0].value;
    expect((raw as jest.Mock).mock.calls[0][0]).toEqual('SET timezone="UTC";');
    expect((raw as jest.Mock).mock.calls[1][0]).toEqual('select version();');
    expect((Model.knex as jest.Mock).mock.calls.length).toEqual(1);
  });

  test('Start connect db error', async () => {
    const Knex = jest.fn().mockReturnValue({
      raw: jest.fn(() => {
        throw new Error('ERROR_DB');
      }),
    }) as unknown as jest.MockedFunction<IServiceDb['Knex']>;
    const Model = jest.fn() as unknown as jest.MockedClass<IServiceDb['Model']>;
    Model.knex = jest.fn() as jest.MockedFunction<typeof Model.knex>;
    const config: any = {
      DATABASE_URL: 'URL_DATABASE',
      DATABASE_DEBUG: true,
    };
    const connectDB = startConnectDB({ Knex, Model, config });
    try {
      await connectDB();
    } catch (error) {
      expect(error.message).toEqual('ERROR_DB');
    }
    expect(Knex.mock.calls.length).toEqual(1);
    expect((Knex.mock.calls[0][0] as any).connection).toEqual('URL_DATABASE');
    expect((Knex.mock.calls[0][0] as any).debug).toEqual(true);
    const { raw } = Knex.mock.results[0].value;
    expect((raw as jest.Mock).mock.results.length).toEqual(1);
    expect((Model.knex as jest.Mock).mock.calls.length).toEqual(0);
  });
});
