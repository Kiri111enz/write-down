import { Sequelize } from 'sequelize-typescript';
import { User } from './models';

export default new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        models: [ User ]
    }
);