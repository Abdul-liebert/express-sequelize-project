const Users = require("./users")

module.exports = (sequelize, DataTypes) => {
    const tasks = sequelize.define('tasks', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        desciption: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updateAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        tableName: 'tasks'
    });
    tasks.associate = (models) => {
        tasks.belongsTo(models.users, {
            foreignKey: 'userId'
        });
    }
    return tasks;
}