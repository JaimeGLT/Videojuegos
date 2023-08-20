import { useEffect, useState } from "react";
import axios from "axios";
import JuegoCard from "./JuegoCard";
import Paginado from "./Paginado";
import styles from '../css/juegos.module.css';
import { Link } from "react-router-dom";

const Juegos = ({ setFiltros, juegos, setJuegos, filtros, pagina, setPagina, name, setName }) => {
    useEffect(() => {
        axios
            .get(`http://localhost:3001/videogames?page=${pagina}`)
            .then((data) => setJuegos(data.data))
            .catch((error) => console.log(error));
    }, [pagina]);



    useEffect(() => {
        if (filtros === "todos") {
            axios
                .get(`http://localhost:3001/videogames?page=${pagina}`)
                .then((data) => setJuegos(data.data))
                .catch((error) => console.log(error));
        }
    }, [filtros]);


    const onClick = () => {
        setFiltros('todos');
        setName('')
    }

    return (
        <>
            <div className={styles.contenedor}>
                { typeof juegos !== 'string' ? juegos?.map((juego) => {
                    return (
                        <JuegoCard
                            key={juego.id}
                            id={juego.id}
                            imagen={juego.imagen}
                            nombre={juego.nombre}
                            generos={
                                juego.genres
                                    ? juego.genres
                                    : juego.Generos.map((genre) => genre.generos)
                            }
                            rating={juego.rating}
                        />
                    );
                }) : <div>
                    <h2 className={styles.noGame}>{`No se encontro un juego con ese nombre`}</h2>
                    <button onClick={onClick} className={styles.button}>Volver</button>
                </div>
            }

            </div>
                <Paginado pagina={pagina} setPagina={setPagina} filtros={filtros} name={name} />
        </>
    );
};

export default Juegos;
