const { GraphQLServer } = require('graphql-yoga');
const db = require('../database/sequelize');
const Link = require('../database/models/link');
const User = require('../database/models/user')
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken');
const JWT_KEY = 'coolkey';

const resolvers = {
    Query: {
        info: () => 'Test',
        feed: (root, args, context, info) => Link.findAll(),
        user: () => User.findAll()
    },

    Mutation: {
        createLink: async (root, args, context, info) => {
            return Link.create({
                url: args.url,
                description: args.description
            })
        },
        updateLink: async (root, args, context, info) => {
            let link = await Link.findOne({ where: { id: parseInt(args.id) } });
            link.url = args.url;
            link.description = args.description;
            return link.save();
        },
        deleteLink: (root, args, context, info) => (
            Link.findOne({ where: { id: parseInt(args.id) } }).then(link => link.destroy())
                .then(() => args.id)
        ),
        signup: async (root, args) => {
            ({ email, password, name } = args);
            let user = await User.findOne({ where: { email } });
            if (user) throw new Error(`User with email ${email} already exists!`);
            let hash = await bcrypt.hash(password, 10);
            user = await User.create({ name, email, password: hash });
            return {
                user,
                token: token.sign(user.id, JWT_KEY)
            };
        },
        login: async (root, args) => {
            ({ email, password } = args);
            let user = await User.findOne({ where: { email } });
            if (!user) throw new Error(`User with email ${email} doesn't exists!`);
            if (await bcrypt.compare(password, user.password)) {
                return {
                    user,
                    token: token.sign(user.id, JWT_KEY)
                }
            } else {
                throw new Error('Wrong user/password!');
            }
        }
    },

};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => {
        return {
            ...req,
            db
        }
    }
});

server.start(() => console.log('Server running on http://localhost:4000'));