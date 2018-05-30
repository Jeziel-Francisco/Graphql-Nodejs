"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_schema_1 = require("./resources/comment/comment.schema");
const post_schema_1 = require("./resources/post/post.schema");
const token_schema_1 = require("./resources/token/token.schema");
const user_schema_1 = require("./resources/user/user.schema");
const Mutation = `
    type Mutation {
        ${comment_schema_1.commentMutation}
        ${post_schema_1.postMutations}
        ${token_schema_1.tokenMutation}
        ${user_schema_1.userMutation}        
    }
`;
exports.Mutation = Mutation;
