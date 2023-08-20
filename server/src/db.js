const { Sequelize } = require('sequelize');

const { DB_NAME, DB_USER, DB_HOST, DB_PASSWORD } = process.env;

const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, { logging: false });

const videogames = require('./models/Videogames-model');
const generos = require('./models/Generos-model');

videogames(database);
generos(database);

const { Videogame, Genero } = database.models;

Videogame.belongsToMany(Genero, { through: 'VideogameGenero', timestamps: false });
Genero.belongsToMany(Videogame, { through: 'VideogameGenero', timestamps: false });

module.exports = {
    database,
    ...database.models
}