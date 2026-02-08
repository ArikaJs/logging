
import { Logger as LoggerContract } from './Contracts/Logger';

export class Logger implements LoggerContract {
    constructor(protected driver: LoggerContract) { }

    emergency(message: string, context?: any): void { this.driver.emergency(message, context); }
    alert(message: string, context?: any): void { this.driver.alert(message, context); }
    critical(message: string, context?: any): void { this.driver.critical(message, context); }
    error(message: string, context?: any): void { this.driver.error(message, context); }
    warning(message: string, context?: any): void { this.driver.warning(message, context); }
    notice(message: string, context?: any): void { this.driver.notice(message, context); }
    info(message: string, context?: any): void { this.driver.info(message, context); }
    debug(message: string, context?: any): void { this.driver.debug(message, context); }
    log(level: string, message: string, context?: any): void { this.driver.log(level, message, context); }
}
