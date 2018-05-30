"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokenTypes = `
    type Token {
        token: String!
    }
`;
exports.tokenTypes = tokenTypes;
const tokenMutation = `
    createToken(email: String!, password: String!): Token
`;
exports.tokenMutation = tokenMutation;
