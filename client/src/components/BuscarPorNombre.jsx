import axios from 'axios';
import { useEffect, useState } from 'react'
import styles from '../css/buscar.module.css';

const BuscarPorNombre = ({ setJuegos, pagina, filtros, setFiltros, name, setName }) => {

    const [ input, setInput ] = useState('');

    const onChangeInput = (event) => {
        setInput(event.target.value);
    };

    const onClickBuscar = () => {

        setName(input);

        if(!input) {  
            setFiltros('todos');
        };
    };

    useEffect(() => {
        if(!name && filtros === 'todos') {
            axios.get(`http://localhost:3001/videogames?page=${pagina}`)
                .then(data => setJuegos(data.data))
                .catch(error => console.log(error))
            return
        }
        axios.get(`http://localhost:3001/videogames?name=${name}`)
            .then(data => setJuegos(data.data))
            .catch(error => console.log(error))
    }, [name]);

    return (
        <div className={styles.containerBuscador}>
            <input className={styles.buscador} onChange={onChangeInput} value={input} type="text" placeholder='Buscar por nombre'/>
            <button className={styles.button} onClick={onClickBuscar} ></button>        
        </div>
    )
}

export default BuscarPorNombre
