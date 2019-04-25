import helmet from 'helmet';
import compression from 'compression';


export function prodMiddleware(app: any) {
    app.use(helmet());
    app.use(compression());
}
