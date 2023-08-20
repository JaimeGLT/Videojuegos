const axios = require('axios');
const { Videogame, Genero } = require('../db');
const { API_KEY } = process.env;

const getVideogames = async (name, page) => {

    try {


        let i = 1;
        
        let videogames = [];

        while(i < 6) {

            const videogamesAPI = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);

            if(Object.keys(videogamesAPI).length === 0) return { error: 'Error al hacer la peticion get a la API' };

            videogames = [...videogames, ...videogamesAPI.data.results];

            i++;
        }

        let videogamesAPI = videogames.map(game => ({
            id: game.id,
            nombre : game.name,
            imagen: game.background_image,
            genres: game.genres.map(genero => genero.name),
            rating: game.rating,

        }));

        const videogamesDB = await Videogame.findAll({
            include: [{
              model: Genero,
              attributes: ['generos'],
              through: { attributes: [] }
            }]

        });
        
        videogamesAPI = [...videogamesAPI, ...videogamesDB];

        // SI HAY NOMBRE;

        if(name) {

            let juegosPorNombre = videogamesAPI.filter(game => game.nombre.toLowerCase().includes(name.toLowerCase()));
            
            if(!juegosPorNombre.length) return { error: 'No se encontraron juegos con ese nombre' };

            juegosPorNombre = juegosPorNombre.slice(0, 12);

            return juegosPorNombre;
        };

        // SI HAY PAGINA

        if(page) {

            let juegosPorPagina = 12;

            const juegosSlice = videogamesAPI.slice((page -1) * juegosPorPagina, juegosPorPagina * page);

            if(!juegosSlice.length) return { error: 'Haz excedido el número de paginas' };

            return juegosSlice;
        }

        return videogamesAPI;

    } catch (error) {
        
        return { error: error.message }

    }

};


const getById = async (id) => {

    try {

        const { data } = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)

        if(Object.keys(data) === 0) return { error: 'No existe un juego con ese id' }

        const gameById = {
            id: data.id,
            imagen: data.background_image,
            nombre: data.name,
            descripcion: data.description,
            publicado: data.released,
            rating: data.rating,
            plataformas: data.platforms.map(plat => plat.platform.name),
            generos: data.genres.map(genr => genr.name)
        }

        return gameById;

    } catch (error) {
        
        return { error: error.message };

    }

};


const postVideogame = async (nombre, fecha_lanzamiento, imagen, descripcion, rating, plataformas = [], generos = []) => {

    try {

        
        const buscarGeneros = await Genero.findAll({ where: { generos } });
        
        if(!buscarGeneros.length) return { error: 'Primero inserta los generos en la base de datos' }; 
        
        const videogames = await getVideogames();

        if(videogames.error) return { error: videogames.error };

        const nombreRepetido = videogames.find(game => game.nombre === nombre);

        if(nombreRepetido) return { error: 'Ya existe un juego con ese nombre' };

        const regexNombre = /^[a-zA-Z0-9\s'\-:()]{3,50}$/;
        const regexFecha_lanzamiento = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        const regexImagen = /\.(jpg|jpeg|png|gif)$/i;
        const regexRating = /^[1-5](\.\d{1,2})?$/;
        // NOMBRE
        if(!nombre) return { error: 'El nombre es obligatorio' };
        if(!regexNombre.test(nombre)) return { error: "El nombre de videojuego no cumple con el formato requerido. Debe contener entre 3 y 50 caracteres alfanuméricos, espacios y los siguientes signos: ' - : ()" };
        // FECHA DE LANZAMIENTO
        if(!fecha_lanzamiento) return { error: 'La fecha es obligatoria' };
        if(!regexFecha_lanzamiento.test(fecha_lanzamiento)) return { error: 'La fecha debe cumplir el siguiente formato "dd/mm/aaaa"' }
        // IMAGEN
        if(!imagen) return { error: 'La imagen es obligatoria' };
        if(!regexImagen.test(imagen)) return { error: 'La extesion de la imagen debe terminar en (jpg|jpeg|png|gif)' }; 
        // DESCRIPCION
        if(!descripcion) return { error: 'La descripcion es obligatoria' };
        if(descripcion.length < 3 || descripcion.length > 1000) return { error: 'La descripcion tiene que tener un mínimo de 3 carácteres y un maximo de 1000 carácteres' };
        // RATING
        if(!rating) return { error: 'El rating es obligatorio' };
        if(!regexRating.test(rating)) return { error: 'El rating es incorrecto, puede ser solo un numero entero o tener 1 o 2 decimales' };
        // PLATAFORMAS
        if(!plataformas.length) return { error: 'Debes seleccionar almenos una plataforma' };
        // GENEROS 
        if(!generos.length) return { error: 'Debes seleccionar almenos un genero' };


        const newGame = await Videogame.create({
            nombre,
            fecha_lanzamiento,
            rating,
            imagen,
            descripcion,
            plataformas
        });

        await newGame.addGeneros(buscarGeneros);

        return {
            nombre,
            fecha_lanzamiento,
            rating,
            imagen,
            descripcion,
            plataformas,
            generos
        };

    } catch (error) {
        
        return { error: error.message };

    }

};


const updateGames = async ( id, nombre, fecha_lanzamiento, imagen, descripcion, rating, plataformas = [], generos = [] ) => {

    try {
        
        const game = await Videogame.findByPk(id);

        if(!game) return { error: 'El juego no fue encontrado' };
        
        const videogames = await getVideogames();

        if(videogames.error) return { error: videogames.error };

        // const nombreRepetido = videogames.find(game => game.nombre === nombre);

        // if(nombreRepetido) return { error: 'Ya existe un juego con ese nombre' };

        const genero = await Genero.findAll({ where: { generos } })

        game.nombre = nombre || game.nombre;
        game.fecha_lanzamiento = fecha_lanzamiento;
        game.imagen = imagen || game.image;
        game.descripcion = descripcion || game.decripcion;
        game.rating = rating || game.rating;
        game.plataformas = plataformas.length ? plataformas : game.plataformas;

        if(generos.length) {
            await game.setGeneros([]);
            await game.addGeneros(genero);
        };

        await game.save();

        return game;

    } catch (error) {
        
        return { error: error.message };

    }

};


const deleteGame = async (id) => {

    try {
        
        const videogame = await Videogame.findByPk(id);

        if(!videogame) return { error: 'No se econtro ese juego' };

        await videogame.destroy();

        return videogame;

    } catch (error) {
        
        return { error: error.message };

    }

};

module.exports = {
    getVideogames,
    postVideogame,
    updateGames,
    deleteGame,
    getById
}