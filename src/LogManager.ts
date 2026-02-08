
import { Logger } from './Logger';
import { ConsoleDriver } from './Drivers/ConsoleDriver';
import { FileDriver } from './Drivers/FileDriver';
import { Logger as LoggerContract } from './Contracts/Logger';

export class LogManager {
    protected channels: Map<string, Logger> = new Map();
    protected customCreators: Map<string, (config: any) => LoggerContract> = new Map();

    constructor(protected config: any) { }

    public channel(name?: string): Logger {
        const channelName = name || this.config.default;

        if (!this.channels.has(channelName)) {
            this.channels.set(channelName, this.resolve(channelName));
        }

        return this.channels.get(channelName)!;
    }

    protected resolve(name: string): Logger {
        const config = this.config.channels[name];

        if (!config) {
            throw new Error(`Log channel [${name}] is not defined.`);
        }

        if (this.customCreators.has(config.driver)) {
            return new Logger(this.customCreators.get(config.driver)!(config));
        }

        const driverMethod = `create${config.driver.charAt(0).toUpperCase() + config.driver.slice(1)}Driver`;

        if (typeof (this as any)[driverMethod] === 'function') {
            return new Logger((this as any)[driverMethod](config));
        }

        throw new Error(`Driver [${config.driver}] is not supported.`);
    }

    protected createConsoleDriver(config: any): LoggerContract {
        return new ConsoleDriver(config);
    }

    protected createFileDriver(config: any): LoggerContract {
        return new FileDriver(config);
    }

    protected createStackDriver(config: any): LoggerContract {
        const channels = config.channels.map((channel: string) => this.channel(channel));

        return new class implements LoggerContract {
            log(level: string, message: string, context?: any): void {
                channels.forEach((channel: Logger) => channel.log(level, message, context));
            }
            emergency(message: string, context?: any): void { this.log('emergency', message, context); }
            alert(message: string, context?: any): void { this.log('alert', message, context); }
            critical(message: string, context?: any): void { this.log('critical', message, context); }
            error(message: string, context?: any): void { this.log('error', message, context); }
            warning(message: string, context?: any): void { this.log('warning', message, context); }
            notice(message: string, context?: any): void { this.log('notice', message, context); }
            info(message: string, context?: any): void { this.log('info', message, context); }
            debug(message: string, context?: any): void { this.log('debug', message, context); }
        };
    }

    public extend(driver: string, callback: (config: any) => LoggerContract): this {
        this.customCreators.set(driver, callback);
        return this;
    }

    // Proxy standard levels to the default channel
    public emergency(message: string, context?: any): void { this.channel().emergency(message, context); }
    public alert(message: string, context?: any): void { this.channel().alert(message, context); }
    public critical(message: string, context?: any): void { this.channel().critical(message, context); }
    public error(message: string, context?: any): void { this.channel().error(message, context); }
    public warning(message: string, context?: any): void { this.channel().warning(message, context); }
    public notice(message: string, context?: any): void { this.channel().notice(message, context); }
    public info(message: string, context?: any): void { this.channel().info(message, context); }
    public debug(message: string, context?: any): void { this.channel().debug(message, context); }
    public log(level: string, message: string, context?: any): void { this.channel().log(level, message, context); }
}
