import { IBaseModelInterface } from '../interfaces/BaseModelInterface';
import { findValuesRemovedFromEnums } from 'graphql/utilities/findBreakingChanges';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import * as Sequelize from 'sequelize';

export interface IUserAttributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IUserInstance extends Sequelize.Instance<IUserAttributes>, IUserAttributes {
    isPassword(encodedPassword: string, password: string): boolean;
}

export interface IUserModel extends IBaseModelInterface, Sequelize.Model<IUserInstance, IUserAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): IUserModel => {
    const User: IUserModel = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        photo: {
            type: DataTypes.BLOB({
                length: 'long'
            }),
            allowNull: true,
            defaultValue: null
        }
    }, {
            tableName: 'users',
            hooks: {
                beforeCreate: (user: IUserInstance, options: Sequelize.CreateOptions): void => {
                    const salt = genSaltSync();
                    user.password = hashSync(user.password, salt);
                },
                
                beforeUpdate: (user: IUserInstance, options: Sequelize.CreateOptions): void => {
                    if (user.changed('password')) {
                        const salt = genSaltSync();
                        user.password = hashSync(user.password, salt);
                    }
                }
            }
        });

    User.prototype.isPassword = (encodedPassword: string, password: string): boolean => {
        return compareSync(password, encodedPassword);
    }


    return User;
}