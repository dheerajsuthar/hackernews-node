const db = require('./sequelize');

//check connection
db.authenticate().then(res => console.log('success')).catch(e => console.error('error'));
