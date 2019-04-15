import config from "config";
import mongoose from "mongoose";
import winston from 'winston';


export function connectDB(){
    mongoose.connect(config.get('mongodbUrl'), {useNewUrlParser: true})
        .then(() => {
            winston.info('Connected to MongoDB...');
        })
        .catch(err => {
            winston.error('Could not connect to MongoDB');
        });
}
