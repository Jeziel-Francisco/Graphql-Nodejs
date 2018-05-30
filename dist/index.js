"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils/utils");
const app_1 = require("./app");
const models_1 = require("./models");
const http = require("http");
const server = http.createServer(app_1.default);
const port = utils_1.normalizePort(process.env.port || 3000);
models_1.default.sequelize.sync()
    .then(() => {
    server.listen(port);
    server.on('error', utils_1.onError(server));
    server.on('listening', utils_1.onListening(server));
})
    .catch((error) => console.log('Ocorreu 1 Erro ao subir o sequelize', error));
