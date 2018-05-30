import { IDbConnection } from "../../../interfaces/DbConnectionInterface";
import { IUserInstance } from "../../../models/UserModel";
import { JWT_SECRET } from "../../../utils/utils";

import * as jwt from 'jsonwebtoken';

export const tokenResolvers = {
    Mutation: {
        createToken: (parent, { email, password }, { db }: { db: IDbConnection }) => {
            return db
                .User
                .findOne({
                    where: { email: email },
                    attributes: ['id', 'password']
                })
                .then((user: IUserInstance) => {
                    if (!user || !user.isPassword(user.get('password'), password)) throw new Error('Unauthorized wrong email or password');
                    const payload = { sub: user.get('id') };

                    return {
                        token: jwt.sign(payload, JWT_SECRET)
                    }
                });
        }
    }
}