const link = require('./models/link');
const user = require('./models/user');

link.sync({ force: true }).then(link => {
    link.create({
        url: 'https://google.com',
        description: 'Evil search engine!'
    }).then(() => console.log('saved link 1')
    );
    link.create({
        url: 'https://unprogrammer.com',
        description: 'Blog of everN00b'
    }).then(() => console.log('saved link 2')
    );
});

user.sync({force: true}).then(()=>console.log('user table created!'));
