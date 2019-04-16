import config from "config";
import mongoose from "mongoose";
import winston from 'winston';


export function connectDB(){
    mongoose.connect(config.get('mongodbUrl'), {useNewUrlParser: true})
        .then(() => {
            winston.info('Connected to MongoDB...');
        })
}
