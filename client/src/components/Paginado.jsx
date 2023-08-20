import { useEffect, useState } from "react";
import axios from 'axios';
import styles from '../css/paginado.module.css';

const Paginado = ({ pagina, setPagina, filtros, name }) => {

    const [ juegosTamaño, setJuegosTamaño ] = useState(null);
    
    const juegosPorPagina = Math.ceil(juegosTamaño / 12);


    const paginaSiguiente = () => {
        setPagina(++pagina);
    };

    const paginaAnterior = () => {
        setPagina(--pagina);
    }

    useEffect(() => {
        axios.get('http://localhost:3001/videogames')
            .then(data => setJuegosTamaño(data.data.length))
            .catch(error => console.log(error))
    }), [];

    return (
        <div className={styles.container}>
            {
                (pagina > 1 && filtros === 'todos') && !name ? <button className={styles.button}onClick={paginaAnterior}>Anterior</button> : null
            }

            {
                filtros === 'todos' && !name ? <p>{pagina} de {juegosPorPagina} páginas</p> : null
            }

            {
                (pagina < juegosPorPagina && filtros === 'todos') && !name ? <button className={styles.button} onClick={paginaSiguiente}>Siguiente</button> : null
            }
        </div>
    )
}

export default Paginado
