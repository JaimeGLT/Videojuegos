const axios = require('axios');
const { Genero } = require('../db');
const { getVideogames } = require('./videogames-controller');


const createGenero = async () => {

    try {
        
        const buscarGeneros = await Genero.findAll();

        if(buscarGeneros.length) return buscarGeneros;

        const videogames = await getVideogames();

        if(videogames.error) return { error: videogames.error };

        const generos = videogames.map(game => game.genres);

        let generosUnidos = [];

        for (let i = 0 ; i < generos.length ; i++) {

            generosUnidos = [ ...generosUnidos, ...generos[i] ];

        };

        const generosSinRepetir = generosUnidos.filter((genero, indice) => generosUnidos.indexOf(genero) === indice); 

        for(let generos of generosSinRepetir) {
            const genero = await Genero.create({ generos });
        }

        return generosSinRepetir;

    } catch (error) {
        
        return { error: error.message };

    }

};


module.exports = {
    createGenero 
};