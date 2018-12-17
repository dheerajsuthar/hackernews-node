const Sequelize = require('sequelize');
const db = require('../sequelize');

const Link = db.define('link', {
    url: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    }
});


module.exports = Link;