module.exports = {
    development: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        host: process.env.POSTGRES_HOST || '127.0.0.1',
        dialect: 'postgres',
        // logging: process.env.LOGGING || true
        logging: false
    }
};
