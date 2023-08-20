import { Link, useLocation, useParams } from 'react-router-dom';
import Filtros from "./Filtros";
import BuscarPorNombre from "./BuscarPorNombre";
import styles from '../css/searchBar.module.css';
import Recargar from './Recargar';

const SearchBar = ({ setFiltros, setJuegos, juegos, filtros, pagina, setName, name }) => {

    const { pathname } = useLocation();


    return (
        <div className={styles.searchBar}>
            { pathname === '/crearJuego' || pathname.includes('/detail')  || pathname !== '/home' ? null :
                <>
                    <Filtros
                        setFiltros={setFiltros}
                        setJuegos={setJuegos}
                        juegos={juegos}
                        filtros={filtros}
                        name={name}
                        />

                    <Recargar />

                    <BuscarPorNombre
                        setJuegos={setJuegos}
                        pagina={pagina}
                        setFiltros={setFiltros}
                        filtros={filtros}
                        name={name}
                        setName={setName}
                        />

                </>
            }

        </div>
    );
};

export default SearchBar;
