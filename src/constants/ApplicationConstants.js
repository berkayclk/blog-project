let ApplicationConstants = {
    PORT_KEY: "PORT",
    PORT: process.env.PORT || '8080',
    DEFAULT_PORT: "80",
    MORGAN_LOG_PATTERN: 'dev',
    LOCALE: process.env.LOCALE || 'tr-TR',
    HOST: process.env.HOST || "localhost",
    BASE_PATH: process.env.BASE_PATH || "/api",
    HEROKU_FLAG : process.env.HEROKU_FLAG || false
};

module.exports = Object.freeze(ApplicationConstants);