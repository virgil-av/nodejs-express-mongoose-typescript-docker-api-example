import config from "config";
import express from "express";
// middleware

import morgan from "morgan";
// startup
import {initLogger} from "./app/utils/logger";
import {initRoutes} from "./app/routes";
import {connectDB} from "./app/utils/db-connect";
import {initConfig} from "./app/utils/config";
import {prodMiddleware} from "./app/utils/prod";


/**
 * Create Express instance
 */
const app = express();

/**
 * Enable logging
 */
initLogger();

/**
 * Initialise app Middleware
 */
prodMiddleware(app);
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


/**
 * Start Express server.
 */
const port = process.env.PORT || 3000;

export const server = app.listen(port, () => {
    console.log(
        `  App is running at http://localhost:${port} in %s mode`,
        app.get("env")
    );
    console.log("  Press CTRL-C to stop\n");
});


export default app;


