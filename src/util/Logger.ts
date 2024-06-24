/* eslint-disable @eslint-community/eslint-comments/disable-enable-pair */
/* eslint-disable n/prefer-global/process */
/* eslint-disable n/no-process-env */
import pino from 'pino';

const logger = pino({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transport: {
        targets: [
            {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                    translateTime: 'SYS:standard',
                },
                level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
            },
        ],
    },
});

export { logger };
