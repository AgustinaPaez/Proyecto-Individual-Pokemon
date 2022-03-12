import React from "react";
import {useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNamePokemons } from "../actions";
import estilos from './SearchBar.module.css';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const pokemons = useSelector((state)=> state.pokemons)

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value.toLowerCase())
        console.log(name)
    }
    const buscarPoke = pokemons.find((e)=> e.name === name)

    function handleSubmit(e){
        e.preventDefault()
        if(buscarPoke){
        dispatch(getNamePokemons(name))
        }else{
            alert('Pokemon no encontrado')
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