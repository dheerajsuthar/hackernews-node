const Sequelize = require('sequelize');
//TODO: shift to config.
const sequelize = new Sequelize('graphqlapp', 'graphqlapp', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequelize;