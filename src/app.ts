import config from "config";
import express from "express";
import 'express-async-errors';
// middleware
import helmet from "helmet";
import morgan from "morgan";
// startup
import {logger} from "./app/utils/logger";
import {initRoutes} from "./app/routes";
import {connectDB} from "./app/utils/db-connect";
import {initConfig} from "./app/utils/config";


/**
 * Create Express instance
 */
const app = express();

/**
 * Enable logging
 */
logger();

/**
 * Initialise app Middleware
 */
app.use(helmet());
app.use(morgan('tiny'));

/**
 * Initialise app routes
 */
initRoutes(app);

/**
 * Connect to database
 */
connectDB();

/**
 * Initialise configs
 */
initConfig();

/**
 * Set render engine and views path
 */
app.set('view engine', 'pug');
app.set('views', config.get('viewsPath'));

export default app;
