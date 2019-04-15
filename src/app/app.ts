import config from "config";
import express from "express";
import mongoose from "mongoose";
import debug from "debug"
// monkeypatch to reduce the try catch blocks
import 'express-async-errors';

// logging
const winston = require('winston');
import {logger} from "./utils/logger";
logger();

// middleware
import helmet from "helmet";
import morgan from "morgan";
import {errorHandler} from "./middleware/error-handler";

// routers and controllers
import indexRouter from "./routes/index.router";
import coursesRouter from "./routes/courses.router";
import authorRouter from "./routes/author.router";
import userRouter from "./routes/users.router";
import authRouter from "./routes/auth.router";


/**
 * Set debugger with namespace "app"
 */
const appDebug = debug('app:ts');
const dbDebug = debug('app:db');

/**
 * Create Express server
 */
const app = express();

/**
 * Check if jwt private key is set
 */
if(!config.get('jwtPrivateKey')){
    appDebug('FATAL ERROR jwtPrivateKey is not defined');
    process.exit(1);
}


/**
 * Connect to database
 */
mongoose.connect(config.get('mongodbUrl'), {useNewUrlParser: true})
    .then(() => {
        dbDebug('Connected to mongoDB')
    })
    .catch(err => {
        dbDebug('Could not connect to mongodb...', err)
    });

/**
 * Testing debugger and environment config
 */
appDebug(`App is started in: ${config.get('env')} mode`);

/**
 * Set render engine and views path
 */
app.set('view engine', 'pug');
app.set('views', config.get('viewsPath'));

/**
 * Middleware
 */
app.use(express.json()); // req.body
app.use(helmet());
app.use(morgan('tiny'));

/**
 * App routes.
 */
app.use('/', indexRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/authors', authorRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

/**
 * Handle error after routes.
 */
app.use(errorHandler);

export default app;
