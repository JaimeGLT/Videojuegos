import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Detail from "./components/Detail";
import CrearJuego from "./components/CrearJuego";
import styles from './css/app.module.css'
import Error from "./components/Error";

function App() {
    const [juegos, setJuegos] = useState([]);
    const [filtros, setFiltros] = useState("todos");
    const [pagina, setPagina] = useState(1);
    const [name, setName] = useState("");

    const { pathname } = useLocation();

    return (
        <div className={styles.app}>
                {pathname === "/" ? null : (
                    <SearchBar
                        setFiltros={setFiltros}
                        setJuegos={setJuegos}
                        juegos={juegos}
                        filtros={filtros}
                        pagina={pagina}
                        name={name}
                        setName={setName}
                    />
                )}

                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                        path="/home"
                        element={
                            <Home
                                setJuegos={setJuegos}
                                juegos={juegos}
                                filtros={filtros}
                                pagina={pagina}
                                setPagina={setPagina}
                                name={name}
                                setFiltros={setFiltros}
                                setName={setName}
                            />
                        }
                    />
                    <Route path="/detail/:id" element={<Detail />} />
                    <Route path="/crearJuego" element={<CrearJuego />} />
                    <Route path='*' element={<Error />} />
                </Routes>
        </div>
    );
}

export default App;
