import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getPokemons, getTypes, filterCreated, filterByTypes, orderByName, orderByAttack, cleanDetail } from "../actions";
import { Link } from "react-router-dom";
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import estilos from './Home.module.css';
import Loader from '../img/pokegif.gif';
import NotFound from'../img/snorlax.gif'


export default function Home(){
    const dispatch = useDispatch()
    const allPokemons = useSelector((state)=> state.pokemons)
    const allTypes = useSelector((state)=> state.types)
    const loading = useSelector((state)=> state.Loading)
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
         dispatch(cleanDetail())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons())
        setCurrentPage(1)
    }

    function handleFilterTypes(e){
        e.preventDefault()
        dispatch(filterByTypes(e.target.value))
        setCurrentPage(1)
    }
    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
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
        <div className={estilos.body}>
            <h1 className={estilos.titulo}>Pokepágina: ¡Atrapalos a todos!</h1>
            <div className={estilos.separar}>
            <button className= {estilos.btn} onClick ={handleClick}>Volver a cargar todos los pokemons</button>
            <Link to= '/pokemon'><button className= {estilos.btn}>Crear Pokemon</button></Link>
            </div>
            <div>
                <div className={estilos.separacion}>
                <select onChange={handleSort} className= {estilos.btn}>
                    <option value= "All">Ordenar por Nombre</option>
                    <option value = "asc">A-Z</option>
                    <option value= 'desc'>Z-A</option>
                </select>
                <select onChange={handleSortAttack} className= {estilos.btn}> 
                    <option value= "All">Ordenar por Fuerza</option>
                    <option value= "max">Ascendente</option>
                    <option value= 'min'>Descendente</option>
                </select>
                <select onChange={(e)=>handleFilterTypes(e)} className= {estilos.btn}>
                    <option value= 'All'>Tipos</option>
                    {allTypes?.map((e)=>(
                        <option key={e} value={e}>{e}</option>
                    ))}
                </select>
                <select onChange = {(e)=>handleFilterCreated(e)} className= {estilos.btn}>
                    <option value= 'All'>Origen</option>
                    <option value= 'createdInDb'>Creados</option>
                    <option value= 'api'>Existentes</option>
                </select>
                <SearchBar />
                </div>
                <Paginado
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginado = {paginado}/>
                <div className={estilos.acomodar}>
                {   loading ? ( 
                    <div>
                <div className={estilos.loader}>
                    <img 
                    src={Loader}
                    alt="Cargando..."
                    width="400px"
                    height="400px"
                  />
                  </div>
                  </div>
                ) :
                
                allPokemons.length ?
                currentPokemons?.map(e=>{
                    return(
                        <Card id={e.id} image={e.image} name={e.name} types={e.types} key={e.id} />
                    )
                }) : 
                // !allPokemons.length ?
                 ( <div className={estilos.card}>
                     <h1 className={estilos.letra}>Este pokemon no fue encontrado</h1>
                     <h1 className={estilos.letra2}>Shhh!!</h1>
                    <img
                    src={NotFound}
                    alt="notFound"
                    width="400px"
                    height="400px"
                  />  
                  <button onClick={handleClick} className={estilos.btn2}>Entendido</button>
                  
                  </div>
                )
                
                    //  : <div><h1 className={estilos.letra}>Lo siento, este pokemon no ha sido encontrado</h1></div>
                }
                </div>
            </div>
        </div>
    )

}

//preguntarle a alba lo del loader o ver un video