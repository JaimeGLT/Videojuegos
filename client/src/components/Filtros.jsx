import { useState, useEffect } from "react";
import axios from "axios";
import styles from '../css/filtros.module.css';

const Filtros = ({ setFiltros, setJuegos, juegos, filtros, name }) => {
    const [juegosParaFiltrar, setJuegosParaFiltrar] = useState([]);

    const [generos, setGeneros] = useState([]);

    const selectOnClick = (e) => {
        setFiltros(e.target.value);


        const juegosFiltered = juegosParaFiltrar.filter((juego) =>
            juego.genres
                ? juego.genres.map((genre) => genre).includes(e.target.value)
                : juego.Generos.map((genero) => genero.genero).includes(e.target.value)
        );
    
        const juegosSlice = juegosFiltered.slice(0, 12);
    
        setJuegos(juegosSlice);
    
        
    };

    useEffect(() => {
        axios
            .get("http://localhost:3001/videogames")
            .then((data) => setJuegosParaFiltrar(data.data))
            .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:3001/generos")
            .then((data) =>
                setGeneros(data.data.map((genre) => genre.generos))
            );
    }, [name]);

    return (
        <div className={styles.filtros}>
            {name ? null : (
                <select className={styles.select} onChange={selectOnClick} name="genero" id="genero">
                    <option className={styles.opt} value="todos">Todos</option>
                    
                    {generos.map((genero) => (
                    <option className={styles.opt} key={genero} value={genero}>
                        {genero}
                    </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default Filtros;
