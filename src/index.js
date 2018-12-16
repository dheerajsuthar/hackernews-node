const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding')

const resolvers = {
    Query: {
        info: () => 'Test',
        feed: (root, args, context, info) => context.db.query.links({}, info)
    },

    Mutation: {
        createLink: (root, args, context, info) => {
            return context.db.mutation.createLink({
                data: {
                    url: args.url,
                    description: args.description
                }
            }, info);
        },
        updateLink: (root, args, context, info) => {
            return context.db.mutation.updateLink({
                data: {
                    id: args.id,
                    url: args.url,
                    description: args.description
                }
            }, info);
        },
        deleteLink: (root, args, context, info) => {
            return context.db.mutation.deleteLink({
                data: {
                    id: args.id
                }
            }, info);
        }
    }

};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => {
        return {
            ...req,
            db: new Prisma({
                typeDefs: 'src/generated/prisma.graphql',
                endpoint: 'https://eu1.prisma.sh/dheeraj-suthar-1ff38a/database/dev',
                secret: 'mysecret123',
                debug: true
            })
        }
    }
});

server.start(() => console.log('Server running on http://localhost:4000'));