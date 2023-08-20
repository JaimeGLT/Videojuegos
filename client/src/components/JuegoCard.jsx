import { Link } from "react-router-dom"
import styles from '../css/juegoCard.module.css';

const JuegoCard = ({ id, imagen, nombre, generos, rating }) => {

    const formattedGenres = generos.join(', ');


    return (
        <div className={styles.contenedor}>
            <img className={styles.imagen} src={imagen} alt={nombre} />
            <div className={styles.cardBody}>
                <h2 className={styles.nombre} >{nombre}</h2>
                <p className={styles.generosP}>Géneros</p>
                <p className={styles.generos}>{formattedGenres}</p>
                <p className={styles.ratingP}>Rating</p>
                <p className={styles.rating}>{rating}</p>
                <Link to={`/detail/${id}`}>
                    <button className={styles.button}>Ver mas</button>
                </Link>
            </div>
        </div>
    )
}

export default JuegoCard
