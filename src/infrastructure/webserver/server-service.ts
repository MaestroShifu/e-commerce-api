import Knex from 'knex';
import { Model } from 'objection';
import ConfigApp from '../config/config';
import configLogger from '../logger/logger';

const Logger = configLogger();

export interface IServiceApp {
  Knex: typeof Knex;
  ConfigApp: typeof ConfigApp;
  Model: typeof Model;
  Logger: typeof Logger;
}

export const ServiceApp: IServiceApp = {
  Knex,
  Model,
  ConfigApp,
  Logger,
};
