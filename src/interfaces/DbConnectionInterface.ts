import { IModelsInterface } from './ModelsInterface';

import * as Sequelize from 'sequelize';

export interface IDbConnection extends IModelsInterface {
    sequelize: Sequelize.Sequelize
}