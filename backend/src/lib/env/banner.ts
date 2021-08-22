import { env } from '../../env';
import { Logger } from '../logger';

export function banner(): void {
    if (env.app.banner) {
        const route = () => `${env.app.schema}://${env.app.host}:${env.app.port}`;
        Logger.info(``);
        Logger.info(`Aloha, your app is ready on ${route()}${env.app.routePrefix}`);
        Logger.info(`To shut it down, press <CTRL> + C at any time.`);
        Logger.info(``);
        Logger.info('-------------------------------------------------------');
        Logger.info(`Environment  : ${env.node}`);
        Logger.info(`Version      : ${env.app.version}`);
        Logger.info(``);
        Logger.info(`API Info     : ${route()}${env.app.routePrefix}`);
        if (env.graphql.enabled) {
            // log.info(`GraphQL      : ${route()}${env.graphql.route}`);
        }
        if (env.swagger.enabled) {
            // log.info(`Swagger      : ${route()}${env.swagger.route}`);
        }
        if (env.monitor.enabled) {
            // log.info(`Monitor      : ${route()}${env.monitor.route}`);
        }
        Logger.info('-------------------------------------------------------');
        Logger.info('');
    } else {
        Logger.info(`Application is up and running.`);
    }
}
