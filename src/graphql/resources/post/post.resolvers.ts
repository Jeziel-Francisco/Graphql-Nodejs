import { IDbConnection } from "../../../interfaces/DbConnectionInterface";
import { GraphQLResolveInfo } from "graphql";
import { IPostInstance } from "../../../models/PostModel";
import { Transaction } from "sequelize";
import { handleError } from "../../../utils/utils";

export const postResolvers = {
    Post: {
        author: (post: IPostInstance, args, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db
                .User
                .findById(post.get('author'))
                .catch(handleError);
        },
        comments: (post: IPostInstance, { first = 10, offset = 0 }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db
                .Comment
                .findAll({
                    where: { post: post.get('id') },
                    limit: first,
                    offset: offset
                })
                .catch(handleError);
        }
    },
    Query: {
        posts: (parent, { first = 10, offset = 0 }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db
                .Post
                .findAll({
                    limit: first,
                    offset: offset
                })
                .catch(handleError);
        },
        post: (parent, { id }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db
                .Post
                .findById(id)
                .then((post: IPostInstance) => {
                    if (!post) throw new Error(`Nenhum Post encontrado com id ${id}`);
                    return post;
                })
                .catch(handleError);
        }
    },
    Mutation: {
        createPost: (parent, { input }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db
                .sequelize
                .transaction((t: Transaction) => {
                    return db
                        .Post
                        .create(input, { transaction: t })
                })
                .catch(handleError);
        },
        updatePost: (parent, { id, input }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db
                .sequelize
                .transaction((t: Transaction) => {
                    return db
                        .Post
                        .findById(id)
                        .then((post: IPostInstance) => {
                            if (!post) throw new Error(`Nenhm Post Atualizado com esse id ${id}`);
                            return post
                                .update(input, { transaction: t });
                        });
                })
                .catch(handleError);
        },
        deletePost: (parent, { id }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db
                .sequelize
                .transaction((t: Transaction) => {
                    return db
                        .Post
                        .findById(id)
                        .then((post: IPostInstance) => {
                            if (!post) throw new Error(`Nenhum posto com esse id ${id}`);
                            return post
                                .destroy(id)
                                .then(post => !!post);
                        });
                })
                .catch(handleError);
        }
    }
}