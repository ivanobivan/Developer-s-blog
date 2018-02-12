const ENVIRONMENT = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = ENVIRONMENT === 'production';

module.exports = {
    ENVIRONMENT,
    IS_PRODUCTION
};
