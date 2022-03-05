import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, getTypes, filterCreated, filterByTypes, orderByName, orderByAttack } from "../actions";
import { Link } from "react-router-dom";
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';


export default function Home(){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state)=> state.pokemons)
    const allTypes = useSelector((state)=> state.types)

    useEffect(()=>{
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
    }

    return(
        <div>
            <Link to= '/pokemon'>Crear Pokemon</Link>
            <h1>Mi página de pokemons</h1>
            <button onClick ={handleClick}>Volver a cargar todos los pokemons</button>
            <div>
                <select>
                    <option value = 'asc'>A-Z</option>
                    <option value= 'desc'>Z-A</option>
                </select>
                <select>
                    <option value= 'asc'>Ascendente</option>
                    <option value= 'desc'>Descendente</option>
                </select>
                <select>
                    <option value= 'All'>Todos</option>
                </select>
                <select>
                    <option value= 'All'>Todos</option>
                    <option value= 'created'>Creados</option>
                    <option value= 'api'>Existentes</option>
                </select>
                <Paginado/>
                <SearchBar/>
                {
                    allPokemons?.map(e=>{
                        return(
                            <Card id={e.id} image={e.image} name={e.name} types={e.types} key={e.id} />
                        )
                    })
                }
            </div>
        </div>
    )

}