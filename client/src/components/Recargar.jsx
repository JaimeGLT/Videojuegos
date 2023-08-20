import styles from '../css/recargar.module.css'

const Recargar = () => {

    const onClick = () => {

        window.location.reload()

    };

    return (
        <div className={styles.contenedor}>
            <button onClick={onClick} className={styles.button} >Recargar</button>
        </div>
    )
}

export default Recargar
