const {DataTypes, Sequelize} = require("sequelize");

module.exports = (Sequelize) => {
    Sequelize.define(
        "Genres",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            genres:{
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { freezeTableName: true, timestamps: false }
    )
}