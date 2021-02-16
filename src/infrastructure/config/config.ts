import dotenv from 'dotenv';
import path from 'path';

// Types state env app
export enum IStateEnv {
  dev = 'dev',
  prod = 'prod',
  test = 'test',
}

dotenv.config({
  path: path.join(path.dirname(__filename), '../../../.env'),
});

const { ENV_NODE } = process.env;
const DATABASE_URL: string = ENV_NODE === IStateEnv.test
  ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL;
const DATABASE_DEBUG: boolean = ENV_NODE !== IStateEnv.prod;

// Export data Enviroment
export default {
  ENV_NODE,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  DATABASE_URL,
  DATABASE_DEBUG,
};
