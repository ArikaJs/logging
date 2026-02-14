
import { ServiceProvider } from '@arikajs/foundation';
import { LogManager } from './LogManager';
import { Log } from './index';

export class LoggingServiceProvider extends ServiceProvider {
    public async register() {
        this.app.singleton('log', () => {
            const config = this.app.config().get('logging');
            return new LogManager(config);
        });
    }

    public async boot() {
        const logManager = this.app.make<LogManager>('log');
        Log.setManager(logManager);
    }
}
