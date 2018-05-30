import { commentMutation } from './resources/comment/comment.schema';
import { postMutations } from './resources/post/post.schema';
import { tokenMutation } from './resources/token/token.schema';
import { userMutation } from './resources/user/user.schema';

const Mutation = `
    type Mutation {
        ${commentMutation}
        ${postMutations}
        ${tokenMutation}
        ${userMutation}        
    }
`;

export {
    Mutation
};