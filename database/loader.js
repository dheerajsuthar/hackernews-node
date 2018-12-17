const link = require('./models/link');

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
