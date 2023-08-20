require('dotenv').config();
const server = require('./src/app');
const { database } = require('./src/db');


database.sync({ force: true }).then(
    console.log('Base de datos conectada correctamente'),
    server.listen(3001, () => {
        console.log('Servidor en el puerto 3001');
    })
)
.catch(error => console.log(error))