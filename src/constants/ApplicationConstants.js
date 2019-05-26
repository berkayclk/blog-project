let ApplicationConstants = {
    PORT_KEY: "PORT",
    DEFAULT_PORT: process.env.PORT || '8080',
    MORGAN_LOG_PATTERN: 'dev',
    LOCALE: process.env.LOCALE || 'tr-TR'
};

module.exports = Object.freeze(ApplicationConstants);