import Knex from 'knex';
import { Model } from 'objection';
import config from '../config/config';

export type ConfigServer = typeof config;

export interface IServiceDb {
    Knex: typeof Knex;
    Model: typeof Model;
}

export const configServer: ConfigServer = config;

export const ServiceDb: IServiceDb = {
    Knex,
    Model
}