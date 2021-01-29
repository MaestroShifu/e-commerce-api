import { IServiceDb, ConfigServer } from "../webserver/server-service";

type IStartConnectDB = IServiceDb & { config: ConfigServer };

const loggerDB = () => {
    const warn = (msg: string) => {
        // tslint:disable-next-line: no-console
        console.warn(msg);
    };
    const error = (msg: string) => {
        // tslint:disable-next-line: no-console
        console.error(msg);
    };
    const deprecate = (msg: string) => {
        // tslint:disable-next-line: no-console
        console.info(msg);
    };
    const debug = (msg: string) => {
        // tslint:disable-next-line: no-console
        console.debug(msg);
    };
    return {
        warn,
        error,
        deprecate,
        debug
    };
}

export const startConnectDB = (args: IStartConnectDB) => async () => {
    const { Knex, Model, config } = args;
    const knex = Knex({
        client: 'pg',
        connection: config.DATABASE_URL, // Url de coneccion para la base de datos
        debug: config.DATABASE_DEBUG, // Imprimir las sentencias SQL en consola
        pool: { // Sirve para determinar una cantidad maxima de conecciones a la base de datos
            min: 2,
            max: 10
        },
        acquireConnectionTimeout: 10000, // Cuanto se debe esperar para generar un error al no conectarse a la db
        log: loggerDB()
    });
    try {
        await knex.raw('SET timezone="UTC";');
        await knex.raw('select version();');
        Model.knex(knex);
        // tslint:disable-next-line: no-console
        console.log(`Se logro coneccion con la BD: ${config.DATABASE_URL}`);
    } catch (error) {
        // tslint:disable-next-line: no-console
        console.error(error);
    }
};