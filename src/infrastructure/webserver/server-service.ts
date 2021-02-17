import Knex from 'knex';
import { Model } from 'objection';
import ConfigApp from '../config/config';

export interface IServiceApp {
  Knex: typeof Knex;
  Model: typeof Model;
  ConfigApp: typeof ConfigApp;
}

export const ServiceApp: IServiceApp = {
  Knex,
  Model,
  ConfigApp,
};
