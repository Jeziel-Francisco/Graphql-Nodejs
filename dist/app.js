"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const schema_1 = require("./graphql/schema");
const express = require("express");
const morgan = require("morgan");
const graphqlHttp = require("express-graphql");
class App {
    constructor() {
        this.express = express();
        this.middleware();
    }
    middleware() {
        this.express.use(morgan('dev'));
        this.express.use('/graphql', (req, res, next) => {
            req['context'] = {};
            req['context'].db = models_1.default;
            next();
        }, graphqlHttp((req) => ({
            schema: schema_1.default,
            graphiql: process.env.NODE_ENV === 'development',
            context: req['context']
        })));
    }
}
exports.default = new App().express;
