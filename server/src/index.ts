import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import express from 'express';
import cors from 'cors';
import sequelize from './db/dbSetup';
import router from './routers/indexRouter';

const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', '..', 'public')));
app.use(cors());
app.use('/', router);

const launchServer = async(): Promise<void> => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Server has just started on port ${port}.`));
    }
    catch (err) {
        console.log(err);
    }
};

launchServer();