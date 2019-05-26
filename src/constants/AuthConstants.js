let AuthConstants = {
    AUTHORIZED_DURATION: process.env.AUTHORIZED_DURATION || 7,
    AUTHORIZED_DURATION_TYPE: process.env.AUTHORIZED_DURATION_TYPE || "DAY",
    JWT_SECRET: process.env.JWT_SECRET || "secret"
};

module.exports = Object.freeze(AuthConstants);