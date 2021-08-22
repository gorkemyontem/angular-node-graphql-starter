import 'reflect-metadata';
import { env } from './env';
import * as path from 'path';
import { banner } from './lib/env/banner';
import { Logger } from './lib/logger';
import { createExpressServer } from 'routing-controllers';

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
    cors: {
        // options from cors documentation
    },
    routePrefix: env.app.routePrefix,
    controllers: [path.join(__dirname + '/controllers/*/*')],
    middlewares: [path.join(__dirname + '/middlewares/*')],
    interceptors: [path.join(__dirname + '/interceptors/*/*')],
});

const port = env.app.port;
app.listen(port, () => {
    banner();
    Logger.debug(`The application is listening on port ${port}!`);
})
