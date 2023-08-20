const { DataTypes } = require('sequelize');

module.exports = (database) => {

    database.define('Genero', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        generos: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })

};