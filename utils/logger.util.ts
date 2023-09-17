import pino from 'pino';

const logLevels = {
  http: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

const logger = pino({
  level: 'http',
  customLevels: logLevels,
  useOnlyCustomLevels: true,
  timestamp: () => `${pino.stdTimeFunctions.isoTime()}`,
  transport: {
    target: 'pino-pretty',
  },
});

export default logger;
