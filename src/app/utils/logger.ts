import { get } from 'config';
import winston from 'winston';
import 'winston-mongodb';
import 'express-async-errors'; // used to handle try catch errors

export function initLogger() {
    winston.handleExceptions(
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );

    process.on('unhandledRejection', (exception) => {
        throw exception;
    });

    winston.add(winston.transports.File, { filename: 'logfile.log' });
    winston.add(winston.transports.MongoDB, {
        db: get('mongodbUrl'),
        level: 'info'
    });
}
