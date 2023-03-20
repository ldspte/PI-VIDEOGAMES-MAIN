const { DataTypes, Sequelize} = require('sequelize');


module.exports = (Sequelize) => {
    Sequelize.define('genre', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {Sequelize, timestamps: false});
};