import { ICommentInstance } from "../../../models/CommentModel";
import { IDbConnection } from "../../../interfaces/DbConnectionInterface";
import { GraphQLResolveInfo } from "graphql";
import { Transaction } from "sequelize";
import { handleError } from "../../../utils/utils";

export const commentResolvers = {
    Comment: {
        user: (comment: ICommentInstance, args, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db
                .User
                .findById(comment.get('user'))
                .catch(handleError);
        },
        post: (comment: ICommentInstance, args, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db
                .Post
                .findById(comment.get('post'))
                .catch(handleError);
        }
    },
    Query: {
        commentsByPost: (parent, { post, first = 10, offset = 0 }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db
                .Comment
                .findAll({
                    where: { post: post },
                    limit: first,
                    offset: offset
                })
                .catch(handleError);
        }
    },
    Mutation: {
        createComment: (parent, { input }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            return db
                .sequelize
                .transaction((t: Transaction) => {
                    return db
                        .Comment
                        .create(input, { transaction: t });
                })
                .catch(handleError);
        },
        updateComment: (parent, { id, input }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db
                .sequelize
                .transaction((t: Transaction) => {
                    return db
                        .Comment
                        .findById(id)
                        .then((comment: ICommentInstance) => {
                            if (!comment) throw new Error(`id ${id} não existe`);
                            return comment
                                .update(input, { transaction: t });
                        })
                })
                .catch(handleError);
        },
        deleteComment: (parent, { id }, { db }: { db: IDbConnection }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db
                .sequelize
                .transaction((t: Transaction) => {
                    return db
                        .Comment
                        .findById(id)
                        .then((comment: ICommentInstance) => {
                            if (!comment) throw new Error(`id ${id} não existe`);
                            return comment
                                .destroy({ transaction: t })
                                .then(comment => !!comment);
                        });
                })
                .catch(handleError);
        }
    }
};