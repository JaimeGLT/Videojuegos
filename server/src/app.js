const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const videogamesRouter = require('./routes/videogames-router');
const generosRouter = require('./routes/generos-router');

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.use('/videogames', videogamesRouter);
server.use('/generos', generosRouter);

module.exports = server;