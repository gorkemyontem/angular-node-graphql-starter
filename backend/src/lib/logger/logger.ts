import * as fs from 'fs';
import * as winston from 'winston';

const PATHS = {
    LOG: `${process.cwd()}/logs`,
    LOG_ERROR: `${process.cwd()}/logs/_error.log`,
    LOG_INFO: `${process.cwd()}/logs/_info.log`,
};
// ensure log directory exists
(() => fs.existsSync(PATHS.LOG) || fs.mkdirSync(PATHS.LOG))();


// Define your severity levels. 
// With them, You can create log files, 
// see or hide levels based on the running ENV.
const winstonLevels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

// This method set the current severity based on 
// the current NODE_ENV: show all the log levels 
// if the server was run in development mode; otherwise, 
// if it was run in production, show only warn and error messages.
const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

// Define different colors for each level. 
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    http: 'magenta',
    debug: 'white',
}

// Tell winston that you want to link the colors 
// defined above to the severity levels.
winston.addColors(colors)

// Chose the aspect of your log customizing the log format.
const winstonFormat = winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    // Tell Winston that the logs must be colored
    winston.format.colorize({ all: true }),
    // Define the format of the message showing the timestamp, the level and the message
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

// Define which transports the logger must use to print out messages. 
// In this example, we are using three different transports 
const winstonTransports = [
    new winston.transports.File({
        filename: PATHS.LOG_INFO,
        handleExceptions: true,
        level: 'info',
        maxFiles: 2,
        maxsize: 5242880, // 5MB
    }),
    new winston.transports.File({
        filename: PATHS.LOG_ERROR,
        handleExceptions: true,
        level: 'error',
        maxFiles: 2,
        maxsize: 5242880, // 5MB
    }),
    new winston.transports.Console({
        handleExceptions: true,
        level: 'debug',
    }),
];


// Create the logger instance that has to be exported 
// and used to log messages.
export const Logger = winston.createLogger({
    level: level(),
    levels: winstonLevels,
    format: winstonFormat,
    transports: winstonTransports,
})
