const tokenTypes = `
    type Token {
        token: String!
    }
`;

const tokenMutation = `
    createToken(email: String!, password: String!): Token
`;

export {
    tokenTypes,
    tokenMutation
};