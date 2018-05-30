import { Request, Response } from 'express';

import db from './models';
import schema from './graphql/schema';

import * as express from 'express';
import * as morgan from 'morgan';
import * as graphqlHttp from 'express-graphql';
import { extractJwtMiddleware } from './middlewares/extract-jwt.middleware';


class App {
    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
    }

    private middleware(): void {
        this.express.use(morgan('dev'));
        this.express.use('/graphql',

            extractJwtMiddleware(),

            (req: Request, res: Response, next) => {
                req['context'].db = db;
                next();
            },
            graphqlHttp((req) => ({
                schema: schema,
                graphiql: process.env.NODE_ENV === 'development',
                context: req['context']
            }))
        );
    }
}

export default new App().express;
