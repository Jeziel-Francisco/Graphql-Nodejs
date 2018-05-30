import { IBaseModelInterface } from '../interfaces/BaseModelInterface';
import { IModelsInterface } from '../interfaces/ModelsInterface';

import * as Sequelize from 'sequelize';

export interface IPostAtribbutes {
    id?: number;
    title?: string;
    content?: string;
    photo?: string;
    author?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface IPostInstance extends Sequelize.Instance<IPostAtribbutes> { }

export interface IPostModel extends IBaseModelInterface, Sequelize.Model<IPostInstance, IPostAtribbutes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): IPostModel => {
    const Post: IPostModel = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        photo: {
            type: DataTypes.BLOB({
                length: 'long'
            }),
            allowNull: false
        }
    }, {
            tableName: 'posts'
        });

    Post.associate = (models: IModelsInterface): void => {
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'author',
                name: 'author'
            }
        });
    }

    return Post;
}