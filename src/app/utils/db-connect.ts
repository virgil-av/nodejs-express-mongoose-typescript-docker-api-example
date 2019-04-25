import { get } from 'config';
import { connect } from 'mongoose';
import winston from 'winston';


export function connectDB() {
    const db: string = get('mongodbUrl');
    connect(db, {useNewUrlParser: true})
        .then(() => {
            winston.info(`Connected to database...`);
        })
        .catch(error => {
            winston.error('failed to connect', error);
        });
}
