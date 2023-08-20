import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';


const CrearJuego = () => {

    const [ platforms, setPlatforms ] = useState([]);

    const [ form, setForm ] =useState({
        imagen: '',
        nombre: '',
        descripcion: '',
        plataformas: [],
        fecha_publicacion: '',
        rating: '',
        generos: []
    });

    const [ errors, setErrors ] = useState({
        imagen: '',
        nombre: '',
        descripcion: '',
        plataformas: '',
        fecha_publicacion: '',
        rating: '',
        generos: ''
    });

    const validate = () => {

        const newErrors = {...errors};

        if(/^[a-zA-Z0-9\s'\-:()]{3,50}$/.test(form.nombre)) {
            newErrors.nombre = ''
        } else {
            newErrors.nombre = "El nombre de videojuego no cumple con el formato requerido. Debe contener entre 3 y 50 caracteres alfanuméricos, espacios y los siguientes signos: ' - : ()"
            
        }


        if(/\.(jpg|jpeg|png|gif)$/i.test(form.imagen)) {
            newErrors.imagen = ''
        } else {

            newErrors.imagen = 'La extension de la imagen debe terminar en (jpg|jpeg|png|gif)'
            
        }

        if(form.descripcion.length < 3 || form.descripcion.length > 1000) {

            newErrors.descripcion = 'La descripcion tiene que tener un mínimo de 3 carácteres y un maximo de 1000 carácteres'

        } else {
            newErrors.descripcion = ''
        };

        if(form.plataformas.length) {

            newErrors.plataformas= ''
            
        } else {

            newErrors.plataformas= 'Debe seleccionar como mínimo una plataforma'
            
        }


        if(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(form.fecha_publicacion)) {

            newErrors.fecha_publicacion= ''
            
        } else {

            newErrors.fecha_publicacion= 'La fecha debe cumplir el siguiente formato "dd/mm/aaaa"'
            
        }


        if(/^[1-5](\.\d{1,2})?$/.test(form.rating)) {

            newErrors.rating= ''
            
        } else {

            newErrors.rating = 'El rating es incorrecto, puede ser solo un numero entero o tener 1 o 2 decimales'
            
        }

        if(form.generos.length) {

            newErrors.generos = ''
            
        } else {

            newErrors.generos = 'Debes seleccionar almenos un género'
            
        }


        setErrors(newErrors)
    };

    const onChangeForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        validate()
    };


    useEffect(() => {
        
        axios.get('https://api.rawg.io/api/platforms?key=a90fa9c4efe54fb9915147e043b76fec')
        .then(data => setPlatforms(data.data))
        .catch(error => console.log(error))
    }, [])
    

    const selectPlatforms = (e) => {
        console.log(e.target.value)
    };

    return (
        <form>

            <h2>Crear un Videojuego</h2>

            <label htmlFor="imagen">Imagen </label>
            <input type="text" id='imagen' name='imagen' onChange={onChangeForm} value={form.imagen} required/>
            {errors.imagen !== '' ? <p>{errors.imagen}</p> : ''}
            <br />

            <label htmlFor="nombre">Nombre </label>
            <input id='nombre' type="text" name='nombre' onChange={onChangeForm} value={form.nombre} required />
            {errors.nombre !== '' ? <p>{errors.nombre}</p> : ''}
            <br />

            <label htmlFor="descripcion">Descripción </label>
            <input type="text" id='decripcion' name='descripcion'onChange={onChangeForm}  value={form.descripcion} required/>
            {errors.descripcion !== '' ? <p>{errors.descripcion}</p> : ''}
            <br />

            <label htmlFor="plataformas">Plataformas </label>
            <select onChange={selectPlatforms} name="" id="">
                {
                    platforms?.results?.map(plat => {
                        return <option key={plat.name} value={plat.name}>{plat.name}</option>
                    })
                }
            </select>
            {errors.plataformas !== '' ? <p>{errors.plataformas}</p> : ''}
            <br />

            <label htmlFor="publicacion">Fecha de Publicacion </label>
            <input type="date" id='publicacion' name='publicacion' onChange={onChangeForm} value={form.fecha_publicacion} required />
            {errors.fecha_publicacion !== '' ? <p>{errors.fecha_publicacion}</p> : ''}
            <br />

            <label htmlFor="generos">Géneros </label>
            <input type="text" id='generos' name='generos' onChange={onChangeForm} value={form.generos} required/>
            {errors.generos !== '' ? <p>{errors.generos}</p> : ''}
            <br />

            <label htmlFor="rating">Rating</label>
            <input type="text" id='rating' name='rating' onChange={onChangeForm} value={form.rating} required />
            {errors.rating !== '' ? <p>{errors.rating}</p> : ''}

            <Link to=''>
                <button>Crear</button>
            </Link>
        </form>
    )
}

export default CrearJuego
