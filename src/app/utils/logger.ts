import config from "config";
import winston from 'winston';
import 'winston-mongodb';
import 'express-async-errors';

export function logger() {
    winston.handleExceptions(
        new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

    process.on('unhandledRejection', (ex) => {
        throw ex;
    });

    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, {
        db: config.get('mongodbUrl'),
        level: 'info'
    });
}
