import React from 'react'
import styles from '../css/error.module.css';

const Error = () => {

    const onClick = () => {
        window.location.replace('/home');
    };


    return (
        <div className={styles.contenedor}>
            <h2 className={styles.mensaje}>La ruta no fue encontrada</h2>
            <button className={styles.button} onClick={onClick}>Ir a Inicio</button>
        </div>
    )
}

export default Error
