
import { Logger } from '../Contracts/Logger';

export class ConsoleDriver implements Logger {
    constructor(config: any = {}) { }

    log(level: string, message: string, context?: any): void {
        const timestamp = new Date().toISOString();
        const contextStr = context ? JSON.stringify(context) : '';
        const output = `[${timestamp}] ${level.toUpperCase()}: ${message} ${contextStr}`;

        switch (level) {
            case 'emergency':
            case 'alert':
            case 'critical':
            case 'error':
                console.error(output);
                break;
            case 'warning':
                console.warn(output);
                break;
            case 'info':
            case 'notice':
                console.info(output);
                break;
            case 'debug':
                console.debug(output);
                break;
            default:
                console.log(output);
        }
    }

    emergency(message: string, context?: any): void { this.log('emergency', message, context); }
    alert(message: string, context?: any): void { this.log('alert', message, context); }
    critical(message: string, context?: any): void { this.log('critical', message, context); }
    error(message: string, context?: any): void { this.log('error', message, context); }
    warning(message: string, context?: any): void { this.log('warning', message, context); }
    notice(message: string, context?: any): void { this.log('notice', message, context); }
    info(message: string, context?: any): void { this.log('info', message, context); }
    debug(message: string, context?: any): void { this.log('debug', message, context); }
}
