const Sequelize = require('sequelize');
const config = require('../config/config').development;
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Document = require('./document')(sequelize, Sequelize.DataTypes);

db.sequelize
    .authenticate()
    .then(() => console.log('Successfully connected to the database!'))
    .catch((error) => console.log('Failed to connect the database:', error))

// Dev code: sync
db.sequelize.sync().then(() => {
    console.log('Database synchronized');
}).catch(err => {
    console.error('Failed to synchronize database:', err);
});

module.exports = db;

