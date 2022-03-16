import React from "react";
import {Link, useParams, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deletePokemon } from "../actions";
import { useEffect } from "react";
import estilos from './Detail.module.css'


export default function Detail(){
    const dispatch= useDispatch()
    const {id} =useParams()
    const myPokemon = useSelector((state)=> state.detail)
    const navegacion = useNavigate()
    
    useEffect(()=>{
        dispatch(getDetail(id))
    }, [id,dispatch])

    function handleDelete(e){
        e.preventDefault()
        const confirmacion = window.confirm('¿Estas seguro de que quieres eliminar este pokemon?');
    if (confirmacion) {
      dispatch(deletePokemon(myPokemon.id));
      navegacion('/home');
    }
    }

    return(
        <div>
             <Link to= '/home'><button className={estilos.btn}>Volver</button></Link>
            {myPokemon.length < 0 ? <p>Cargando...</p> :
            <div className={estilos.detalle}>
                 <div className={estilos.titulo}><h1>¡Un {myPokemon.name} salvaje ha aparecido!</h1> </div>
            <div className={estilos.carta}>
                <img src={myPokemon.image} alt={myPokemon.name} width='500px' height='500px' />
                <div className={estilos.palabra}>
                <h3  className={estilos.tipos}>Tipos: {myPokemon.types?.map((e)=>(
                    <span key={e}>{e}{" "}</span>
                ))}</h3>
                <h3>ID: {myPokemon.id}</h3>
                <h3>Vida: {myPokemon.hp}</h3>
                <h3>Fuerza: {myPokemon.attack}</h3>
                <h3>Defensa: {myPokemon.defense}</h3>
                <h3>Velocidad: {myPokemon.speed}</h3>
                <h3>Altura: {myPokemon.height}</h3>
                <h3>Peso: {myPokemon.weight}</h3>
                </div>
            </div> 
                    {
                        myPokemon.createdInDb && (
                            <button onClick={handleDelete}>Eliminar</button>
                        )
                    }
            </div>
            }
        </div>
    )
}