import React from "react";
import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import estilos from './Detail.module.css'


export default function Detail(){
    const dispatch= useDispatch()
    const {id} =useParams()
    
    useEffect(()=>{
        dispatch(getDetail(id))
        // return () => {
        //     dispatch(cleanDetail());
        //   };
    }, [id,dispatch])



    const myPokemon = useSelector((state)=> state.detail)

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
            </div>
            }
        </div>
    )
}