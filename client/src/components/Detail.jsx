import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../css/detail.module.css';

const Detail = () => {

    const [ videogame, setVideogame ] = useState({});

    const { id } = useParams();

    const videogamePlataformas = videogame?.plataformas?.join(',  ');
    const videogameGenero = videogame?.generos?.join(', ');


    const onClickButton = () => {
        window.location.replace('/home');
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/videogames/${id}`)
            .then(data => setVideogame(data.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className={styles.contenedor}>
            <div className={styles.contenedor2}>
                <div>
                    <img className={styles.imagen} src={videogame?.imagen} alt={videogame?.nombre} />
                </div>
                <div>
                    <h2 className={styles.nombre}>{videogame?.nombre}</h2>
                </div>
                <div>
                    <p className={styles.descripcion} >{videogame?.descripcion}</p>
                </div>
                <div>
                    <p className={styles.plataformasP} >Plataformas</p>
                    <p className={styles.plataformas}>{videogamePlataformas}</p>
                </div>
                <div>
                    <p className={styles.generosP}>Géneros</p>
                    <p className={styles.generos}>{videogameGenero}</p>
                </div>
                <div>
                    <p className={styles.publicacionP}>Fecha de publicación</p>
                    <p className={styles.publicacion}>{videogame?.publicado}</p>
                </div>
                <div>
                    <p className={styles.ratingP}>Rating</p>
                    <p className={styles.rating}>{videogame.rating + '🌟'}</p>
                </div>

                <button onClick={onClickButton} className={styles.button}>Volver</button>

            </div>
        </div>
    )
}

export default Detail
