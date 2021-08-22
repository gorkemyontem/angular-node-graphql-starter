import * as express from 'express';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import morgan, { StreamOptions }  from 'morgan';
import { env } from '../env';
import { Logger } from '../lib/logger';

const stream: StreamOptions = {
    write: (message) => Logger.http(message),
  };

@Middleware({ type: 'before' })
export class LoggingMiddleware implements ExpressMiddlewareInterface {
    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return morgan(env.log.output, { stream })(req, res, next);
    }
}

// For GraphQL https://levelup.gitconnected.com/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-1c31c1ab9342