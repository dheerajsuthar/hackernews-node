const db = require('../sequelize');
const Sequelize = require('sequelize');
const Link = require('./link')

const User = db.define('user', {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    }
});

User.hasMany(Link);
module.exports = User;