import React from "react";
import Juegos from "./Juegos";

const Home = ({ setName, setFiltros, juegos, setJuegos, filtros, pagina, setPagina, name }) => {
    return (
        <div>
            <Juegos
                juegos={juegos}
                setJuegos={setJuegos}
                filtros={filtros}
                pagina={pagina}
                setPagina={setPagina}
                name={name}
                setFiltros={setFiltros}
                setName={setName}
            />
        </div>
    );
};

export default Home;
