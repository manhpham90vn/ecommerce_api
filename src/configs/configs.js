const configs = {
    APP_PORT: process.env.APP_PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://mongo:27017/db',
}

module.exports = configs;