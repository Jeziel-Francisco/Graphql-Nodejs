import { JWT_SECRET } from "../utils/utils";
import { NextFunction, Request, Response } from "express";

import db from './../models';

import * as jwt from 'jsonwebtoken';
import { IUserInstance } from "../models/UserModel";

export const extractJwtMiddleware = () => {
    return (req: Request, res: Response, next: NextFunction): void => {
        let authorization: string = req.get('authorization');

        let token: string = authorization ? authorization.split(' ')[1] : undefined;

        req['context'] = {};
        req['context']['authorization'] = authorization;

        if (!token) return next();
        jwt.verify(token, JWT_SECRET, (error, decoded: any) => {
            if (error) return next();

            db.User.findById(decoded.sub, {
                attributes: ['id', 'email']
            }).then((user: IUserInstance) => {
                if (user) {
                    req['context']['user'] = {
                        id: user.get('id'),
                        email: user.get('email')
                    };
                }
                next();
            }).catch(() => next());

        });

    };
}