"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
exports.userResolvers = {
    User: {
        post: (user, { first = 10, offset = 0 }, { db }, info) => {
            return db
                .Post
                .findAll({
                where: { author: user.get('id') },
                limit: first,
                offset: offset
            })
                .catch(utils_1.handleError);
        }
    },
    Query: {
        users: (parent, { first = 10, offset = 0 }, { db }, info) => {
            return db
                .User
                .findAll({
                limit: first,
                offset: offset
            })
                .catch(utils_1.handleError);
        },
        user: (parent, { id }, { db }, info) => {
            id = parseInt(id);
            return db
                .User
                .findById(id)
                .then((user) => {
                if (!user)
                    throw new Error(`Usuario ${id} não encontrado`);
                return user;
            })
                .catch(utils_1.handleError);
        }
    },
    Mutation: {
        createUser: (parent, { input }, { db }, info) => {
            return db.sequelize.transaction((t) => {
                return db
                    .User
                    .create(input, {
                    transaction: t
                });
            })
                .catch(utils_1.handleError);
        },
        updateUser: (parent, { id, input }, { db }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db
                    .User
                    .findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`Usuario ${id} não encontrado`);
                    return user.update(input, {
                        transaction: t
                    });
                });
            })
                .catch(utils_1.handleError);
        },
        updateUserPassword: (parent, { id, input }, { db }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db
                    .User
                    .findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`Usuario ${id} não encontrado`);
                    return user
                        .update(input, {
                        transaction: t
                    })
                        .then((user) => !!user);
                });
            })
                .catch(utils_1.handleError);
        },
        deleteUser: (parent, { id }, { db }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db
                    .User
                    .findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`Usuario ${id} não encontrado`);
                    return user
                        .destroy({
                        transaction: t
                    })
                        .then(user => !!user);
                });
            })
                .catch(utils_1.handleError);
        }
    }
};
