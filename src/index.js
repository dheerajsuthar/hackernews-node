const { GraphQLServer } = require('graphql-yoga');
const db = require('../database/sequelize');
const Link = require('../database/models/link');

const resolvers = {
    Query: {
        info: () => 'Test',
        feed: (root, args, context, info) => Link.findAll()
    },

    Mutation: {
        createLink: (root, args, context, info) => {
            return Link.create({
                url: args.url,
                description: args.description
            })
        },
        updateLink: (root, args, context, info) => {
            return Link.findOne({ where: { id: parseInt(args.id) } }).then(link => {
                link.url = args.url;
                link.description = args.description;
                return link.save();
            });

        },
        deleteLink: (root, args, context, info) => (
            Link.findOne({ where: { id: parseInt(args.id) } }).then(link => link.destroy())
                .then(() => args.id)
        )
    },

};

const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers,
    context: req => {
        return {
            ...req,
            db
        }
    }
});

server.start(() => console.log('Server running on http://localhost:4000'));