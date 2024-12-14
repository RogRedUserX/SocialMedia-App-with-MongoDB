import winston from "winston";

const logger = winston.createLogger({
    level:"info",
    format:winston.format.json(),
    transports:[new winston.transports.File({filename:"combined.log"})]
});

const loggerMiddleware = (req,res,next) => {
    const dataLog = `req URL:${req.originalUrl} - reqBody:${JSON.stringify(req.body)}`;
    logger.info(dataLog);
    next();
};

export default loggerMiddleware;