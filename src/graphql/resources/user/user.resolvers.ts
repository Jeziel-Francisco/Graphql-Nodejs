import { GraphQLResolveInfo } from "graphql";
import { IDbConnection } from "../../../interfaces/DbConnectionInterface";
import { IUserInstance } from "../../../models/UserModel";
import { Transaction } from "sequelize";
import { handleError } from "../../../utils/utils";

export const userResolvers = {

    User: {
        post: (user: IUserInstance, { first = 10, offset = 0 }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db
                .Post
                .findAll({
                    where: { author: user.get('id') },
                    limit: first,
                    offset: offset
                })
                .catch(handleError);
        }
    },

    Query: {
        users: (parent, { first = 10, offset = 0 }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db
                .User
                .findAll({
                    limit: first,
                    offset: offset
                })
                .catch(handleError);
        },
        user: (parent, { id }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db
                .User
                .findById(id)
                .then((user: IUserInstance) => {
                    if (!user) throw new Error(`Usuario ${id} não encontrado`);
                    return user;
                })
                .catch(handleError);
        }
    },
    Mutation: {
        createUser: (parent, { input }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db
                    .User
                    .create(input, {
                        transaction: t
                    });
            })
                .catch(handleError);
        },
        updateUser: (parent, { id, input }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db
                    .User
                    .findById(id)
                    .then((user: IUserInstance) => {
                        if (!user) throw new Error(`Usuario ${id} não encontrado`);
                        return user.update(input, {
                            transaction: t
                        });
                    })
            })
                .catch(handleError);
        },
        updateUserPassword: (parent, { id, input }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db
                    .User
                    .findById(id)
                    .then((user: IUserInstance) => {
                        if (!user) throw new Error(`Usuario ${id} não encontrado`);
                        return user
                            .update(input, {
                                transaction: t
                            })
                            .then((user: IUserInstance) => !!user);
                    });
            })
                .catch(handleError);
        },
        deleteUser: (parent, { id }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db
                    .User
                    .findById(id)
                    .then((user: IUserInstance) => {
                        if (!user) throw new Error(`Usuario ${id} não encontrado`);
                        return user
                            .destroy({
                                transaction: t
                            })
                            .then(user => !!user);
                    });
            })
                .catch(handleError);
        }
    }
}