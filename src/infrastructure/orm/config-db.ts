import { IServiceApp } from '../webserver/server-service';

const loggerDB = () => {
  const warn = (msg: string) => {
    console.warn(msg);
  };
  const error = (msg: string) => {
    console.error(msg);
  };
  const deprecate = (msg: string) => {
    console.info(msg);
  };
  const debug = (msg: string) => {
    console.debug(msg);
  };
  return {
    warn,
    error,
    deprecate,
    debug,
  };
};

const startConnectDB = (args: IServiceApp) => async () => {
  const { Knex, Model, ConfigApp } = args;
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
    log: loggerDB(),
  });
  try {
    await knex.raw('SET timezone="UTC";');
    await knex.raw('select version();');
    Model.knex(knex);
    console.log(`Se logro coneccion con la BD: ${ConfigApp.DATABASE_URL}`);
  } catch (error) {
    console.error(error);
  }
};

export default startConnectDB;
