"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
exports.postResolvers = {
    Post: {
        author: (post, args, { db }, info) => {
            return db
                .User
                .findById(post.get('author'))
                .catch(utils_1.handleError);
        },
        comments: (post, { first = 10, offset = 0 }, { db }, info) => {
            return db
                .Comment
                .findAll({
                where: { post: post.get('id') },
                limit: first,
                offset: offset
            })
                .catch(utils_1.handleError);
        }
    },
    Query: {
        posts: (parent, { first = 10, offset = 0 }, { db }, info) => {
            return db
                .Post
                .findAll({
                limit: first,
                offset: offset
            })
                .catch(utils_1.handleError);
        },
        post: (parent, { id }, { db }, info) => {
            id = parseInt(id);
            return db
                .Post
                .findById(id)
                .then((post) => {
                if (!post)
                    throw new Error(`Nenhum Post encontrado com id ${id}`);
                return post;
            })
                .catch(utils_1.handleError);
        }
    },
    Mutation: {
        createPost: (parent, { input }, { db }, info) => {
            return db
                .sequelize
                .transaction((t) => {
                return db
                    .Post
                    .create(input, { transaction: t });
            })
                .catch(utils_1.handleError);
        },
        updatePost: (parent, { id, input }, { db }, info) => {
            id = parseInt(id);
            return db
                .sequelize
                .transaction((t) => {
                return db
                    .Post
                    .findById(id)
                    .then((post) => {
                    if (!post)
                        throw new Error(`Nenhm Post Atualizado com esse id ${id}`);
                    return post
                        .update(input, { transaction: t });
                });
            })
                .catch(utils_1.handleError);
        },
        deletePost: (parent, { id }, { db }, info) => {
            id = parseInt(id);
            return db
                .sequelize
                .transaction((t) => {
                return db
                    .Post
                    .findById(id)
                    .then((post) => {
                    if (!post)
                        throw new Error(`Nenhum posto com esse id ${id}`);
                    return post
                        .destroy(id)
                        .then(post => !!post);
                });
            })
                .catch(utils_1.handleError);
        }
    }
};
