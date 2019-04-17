import {get} from "config";
import {connect} from "mongoose";
import winston from 'winston';


export function connectDB(){
    const db: string = get('mongodbUrl');

    connect(db, {useNewUrlParser: true})
        .then(() => {
            winston.info(`Connected to ${get('mongodbUrl')}...`);
        })
}
