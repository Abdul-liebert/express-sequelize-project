const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updateAt', // Sesuaikan nama kolom jika perlu
        tableName: 'users',
    });
    return users;
}