import * as Sequelize from 'sequelize';
import { IBaseModelInterface } from '../interfaces/BaseModelInterface';
import { IModelsInterface } from '../interfaces/ModelsInterface';

export interface ICommentAttibutes {
    id?: number;
    comment?: string;
    post?: number;
    user?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ICommentInstance extends Sequelize.Instance<ICommentAttibutes> { }

export interface ICommentModel extends IBaseModelInterface, Sequelize.Model<ICommentInstance, ICommentAttibutes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): ICommentModel => {
    const Comment: ICommentModel = sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
            tableName: 'comments'
        });

    Comment.associate = (models: IModelsInterface): void => {
        Comment.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false,
                field: 'post',
                name: 'post'
            }
        });

        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'user',
                name: 'user'
            }
        });
    }

    return Comment;
}