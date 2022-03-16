import React from "react";
import {useState} from 'react';
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../actions";
import estilos from './SearchBar.module.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value.toLowerCase())
       // console.log(name)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(name){
        dispatch(getNamePokemons(name))
        setName('')
        }
    }

    return(
        <div>
            <input 
            type= 'text'
            placeholder= "Nombre del Pokemon"
            value={name}
            onChange={handleInputChange}
            className={estilos.contenedor}
            />
            <button type="submit" onClick={handleSubmit} className={estilos.btn}>Buscar</button>
        </div>
    )
}