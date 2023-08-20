const { getVideogames, postVideogame, updateGames, deleteGame, getById } = require('../controllers/videogames-controller');

const videogamesRouter = require('express').Router();

videogamesRouter.get('/', async (req, res) => {

    try {
        
        const { name, page } = req.query;

        const videogames = await getVideogames(name, page);

        if(videogames.error) throw Error(videogames.error);

        return res.status(200).json(videogames);

    } catch (error) {
        
        return res.status(200).send(error.message + ' "getVideogames"')

    }

});


videogamesRouter.get('/:id', async (req, res) => {

    try {
        
        const { id } = req.params;

        const game = await getById(id);

        if(game.error) throw Error(game.error);

        return res.status(200).json(game);

    } catch (error) {
        
        return res.status(404).send(error.message + ' idGet')

    }

});

videogamesRouter.post('/', async (req, res) => {

    try {
        
        const { nombre, fecha_lanzamiento, imagen, descripcion, rating, plataformas, generos  }  = req.body;

        const newVideogame = await postVideogame(nombre, fecha_lanzamiento, imagen, descripcion, rating, plataformas, generos);

        if(newVideogame.error) throw Error(newVideogame.error);

        return res.status(200).json(newVideogame);

    } catch (error) {

        return res.status(400).send(error.message + ' "postVideogames"');

    }

});


videogamesRouter.put('/:id', async (req, res) => {

    try {
        
        const { id } = req.params;
        const { nombre, fecha_lanzamiento, imagen, descripcion, rating, plataformas, generos  } = req.body;

        const juegoActualizado = await updateGames(id, nombre, fecha_lanzamiento, imagen, descripcion, rating, plataformas, generos);

        if(juegoActualizado.error) throw Error(juegoActualizado.error);

        return res.status(200).json(juegoActualizado);

    } catch (error) {
        
        return res.status(404).send(error.message + ' updateGame');

    }

});


videogamesRouter.delete('/:id', async (req, res) => {

    try {
        
        const { id } = req.params;

        const game = await deleteGame(id);

        if(game.error) throw Error(game.error);

        return res.status(200).json(game);

    } catch (error) {
        
        return res.status(404).send(error.message);

    }

});

module.exports = videogamesRouter;