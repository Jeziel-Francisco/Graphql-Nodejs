"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const lodash_1 = require("lodash");
const mutation_1 = require("./mutation");
const query_1 = require("./query");
const comment_schema_1 = require("./resources/comment/comment.schema");
const post_schema_1 = require("./resources/post/post.schema");
const token_schema_1 = require("./resources/token/token.schema");
const user_schema_1 = require("./resources/user/user.schema");
const comment_resolvers_1 = require("./resources/comment/comment.resolvers");
const post_resolvers_1 = require("./resources/post/post.resolvers");
const token_resolvers_1 = require("./resources/token/token.resolvers");
const user_resolvers_1 = require("./resources/user/user.resolvers");
const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }
`;
const resolvers = lodash_1.merge(comment_resolvers_1.commentResolvers, post_resolvers_1.postResolvers, token_resolvers_1.tokenResolvers, user_resolvers_1.userResolvers);
exports.default = graphql_tools_1.makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        query_1.Query,
        mutation_1.Mutation,
        comment_schema_1.commentTypes,
        post_schema_1.postTypes,
        token_schema_1.tokenTypes,
        user_schema_1.userTypes
    ],
    resolvers: resolvers
});
