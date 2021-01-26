import express from 'express';
import startConnectDB from './infrastructure/orm/config-db';
import { configServer, ServiceDb } from './infrastructure/webserver/server-service';
import app from './infrastructure/webserver/server';

const startDB = startConnectDB(ServiceDb, configServer);

export const startApp = (appExpress: express.Express, connectionDb: () => Promise<void>) => async () => {
    // Manejo a la conexion a base de datos
    await connectionDb();

    // Manejo del servidor
    appExpress.listen(configServer.PORT, () => {
        // tslint:disable-next-line: no-console
        console.log(`Servidor listo, corre en el puerto: ${configServer.PORT}`);
    });
};

startApp(app, startDB)();