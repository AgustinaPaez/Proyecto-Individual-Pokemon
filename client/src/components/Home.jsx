import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, getTypes, filterCreated, filterByTypes, orderByName, orderByAttack } from "../actions";
import { Link } from "react-router-dom";
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import estilos from './Home.module.css';


export default function Home(){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state)=> state.pokemons)
    const allTypes = useSelector((state)=> state.types)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonsPerPage, setPokemonsPerPage]= useState(12)
    const indexOfLastPokemon = currentPage * pokemonsPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getPokemons())
        dispatch(getTypes())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
    }

    function handleFilterTypes(e){
        e.preventDefault()
        dispatch(filterByTypes(e.target.value))
        setCurrentPage(1)
        // setOrden(`Ordenado ${e.target.value}`)
    }
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
        // setOrden(`Ordenado ${e.target.value}`)
    }
    function handleSort(e){
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleSortAttack(e){
        dispatch(orderByAttack(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    return(
        <div>
            <Link to= '/pokemon'>Crear Pokemon</Link>
            <h1>Pokepágina: ¡Atrapalos a todos!</h1>
            <button className= {estilos.btn} onClick ={handleClick}>Volver a cargar todos los pokemons</button>
            <div>
                <select onChange={handleSort}>
                    <option value= "All">Ordenar por Nombre</option>
                    <option value = "asc">A-Z</option>
                    <option value= 'desc'>Z-A</option>
                </select>
                <select onChange={handleSortAttack}> 
                    <option value= "All">Ordenar por Fuerza</option>
                    <option value= "asc">Ascendente</option>
                    <option value= 'desc'>Descendente</option>
                </select>
                <select onChange={(e)=>handleFilterTypes(e)}>
                    <option value= 'All'>Todos</option>
                    {allTypes?.map((e)=>(
                        <option key={e} value={e}>{e}</option>
                    ))}
                </select>
                <select onChange = {(e)=>handleFilterCreated(e)}>
                    <option value= 'All'>Todos</option>
                    <option value= 'createdInDb'>Creados</option>
                    <option value= 'api'>Existentes</option>
                </select>
                <Paginado
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginado = {paginado}/>
                <SearchBar/>
                {
                    currentPokemons?.map(e=>{
                        return(
                            <Card id={e.id} image={e.image} name={e.name} types={e.types} key={e.id} />
                        )
                    })
                }
            </div>
        </div>
    )

}