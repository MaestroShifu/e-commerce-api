import Knex from 'knex';
import { Model } from 'objection';
import config from '../config/config';

// Export libreria del orm
export interface IServiceDb {
    Knex: typeof Knex;
    Model: typeof Model;
}

export const ServiceDb: IServiceDb = {
    Knex,
    Model
}

// Export configuracion del servidor
export const configServer: ConfigServer = config;
export type ConfigServer = typeof config;