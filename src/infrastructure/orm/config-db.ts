import { IServiceApp } from '../webserver/server-service';

const setLogDb = (Logger: IServiceApp['Logger']) => {
  const warn = (msg: string) => { Logger.warn(msg); };
  const error = (msg: string) => { Logger.error(msg); };
  const deprecate = (msg: string) => { Logger.info(msg); };
  const debug = (msg: string) => { Logger.debug(msg); };
  return {
    warn,
    error,
    deprecate,
    debug,
  };
};

const startConnectDB = (args: IServiceApp) => async () => {
  const {
    Knex, Model, ConfigApp, Logger,
  } = args;
  const knex = Knex({
    client: 'pg',
    connection: ConfigApp.DATABASE_URL, // Url de coneccion para la base de datos
    debug: ConfigApp.DATABASE_DEBUG, // Imprimir las sentencias SQL en consola
    pool: { // Sirve para determinar una cantidad maxima de conecciones a la base de datos
      min: 2,
      max: 10,
    },
    // Cuanto se debe esperar para generar un error al no conectarse a la db
    acquireConnectionTimeout: 10000,
    log: setLogDb(Logger),
  });
  try {
    await knex.raw('SET timezone="UTC";');
    await knex.raw('select version();');
    Model.knex(knex);
    Logger.info(`Se logro coneccion con la BD: ${ConfigApp.DATABASE_URL}`);
  } catch (error) {
    Logger.error(error);
  }
};

export default startConnectDB;
