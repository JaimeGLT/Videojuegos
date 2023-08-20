const { createGenero } = require('../controllers/generos-controller');

const generosRouter = require('express').Router();

generosRouter.get('/', async (req, res) => {

    try {
        
        const generos = await createGenero();

        if(generos.error) throw Error(generos.error);

        return res.status(200).json(generos);

    } catch (error) {
        
        return res.status(400).send(error.message + ' postGeneros');

    }

});



module.exports = generosRouter;