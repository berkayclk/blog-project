let ApplicationConstants = {
    PORT_KEY: "PORT",
    PORT: process.env.PORT || '8080',
    DEFAULT_PORT: "80",
    MORGAN_LOG_PATTERN: 'dev',
    LOCALE: process.env.LOCALE || 'tr-TR'
};

module.exports = Object.freeze(ApplicationConstants);