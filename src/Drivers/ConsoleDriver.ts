import { Logger } from '../Contracts/Logger';

export class ConsoleDriver implements Logger {
    private colors: Record<string, string> = {
        emergency: '\x1b[41m\x1b[37m', // White on Red
        alert: '\x1b[41m\x1b[37m',     // White on Red
        critical: '\x1b[41m\x1b[37m',  // White on Red
        error: '\x1b[31m',             // Red
        warning: '\x1b[33m',           // Yellow
        notice: '\x1b[34m',            // Blue
        info: '\x1b[32m',              // Green
        debug: '\x1b[90m',             // Gray
    };

    private levels: Record<string, number> = {
        emergency: 0,
        alert: 1,
        critical: 2,
        error: 3,
        warning: 4,
        notice: 5,
        info: 6,
        debug: 7,
    };

    constructor(private config: any = {}) { }

    log(level: string, message: string, context?: any): void {
        const configLevel = this.config.level || 'debug';
        if (this.levels[level] > this.levels[configLevel]) {
            return;
        }

        const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
        const color = this.colors[level] || '';
        const reset = '\x1b[0m';
        const contextStr = context ? ' ' + JSON.stringify(context) : '';

        const output = `[${timestamp}] ${color}${level.toUpperCase()}${reset}: ${message}${contextStr}`;

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
