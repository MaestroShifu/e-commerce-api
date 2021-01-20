import dotenv from 'dotenv';
import path from 'path';

// Types state env app
export enum IStateEnv {
    'dev' = 'dev',
    'prod' = 'prod',
    'test' = 'test'
}

dotenv.config({
    path: path.join(path.dirname(__filename), '../../../.env')
});

// Export data Enviroment
export default {
    ENV_NODE: process.env.ENV_NODE,
    HOST: process.env.HOST,
    PORT: process.env.PORT
};