import path from 'path';
import { configServer } from '../webserver/server-service';

// File para el cli de knex
module.exports = {
  client: 'pg',
  connection: configServer.DATABASE_URL,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory:  path.join(path.dirname(__filename), './migrations'),
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: path.join(path.dirname(__filename), './seeds'),
  }
};
