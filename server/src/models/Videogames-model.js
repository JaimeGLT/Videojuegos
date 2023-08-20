const { DataTypes } = require('sequelize');

module.exports = database => {
    
    database.define('Videogame', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        fecha_lanzamiento: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        plataformas: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        descripcion: {
            type: DataTypes.STRING(1000),
            allowNull: false
        }

    }, {
        timestamps: false
    })

};