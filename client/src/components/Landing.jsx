import { Link } from "react-router-dom"
import styles from '../css/landing.module.css';

const Landing = () => {
    return (
        <div className={styles.landing}>
            <div className={styles.overlay} >
                <h1 className={styles.titulo}>Videojuegos</h1>

                <Link to='/home'>
                        <button className={styles.button}>Entrar</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing
