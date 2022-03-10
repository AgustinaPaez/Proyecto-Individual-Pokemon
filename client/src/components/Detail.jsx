import React from "react";
import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";


export default function Detail(){
    const dispatch= useDispatch()
    const {id} =useParams()
    
    useEffect(()=>{
        dispatch(getDetail(id))
    }, [id,dispatch])

    const myPokemon = useSelector((state)=> state.detail)

    return(
        <div>
             <Link to= '/home'><button>Volver</button></Link>
            {myPokemon.length < 0 ? <p>Cargando...</p> :
            <div>
                <h1>¡Un {myPokemon.name} salvaje ha aparecido!</h1>
                <img src={myPokemon.image} alt={myPokemon.name} width='500px' height='500px' />
                <h3>Tipos:</h3>
                {myPokemon.types?.map((e)=>(
                    <p key={e}>{e}</p>
                ))}
                <h3>ID:</h3>
                <p>{myPokemon.id}</p>
                <h3>Vida:</h3>
                <p>{myPokemon.hp}</p>
                <h3>Fuerza:</h3>
                <p>{myPokemon.attack}</p>
                <h3>Defensa:</h3>
                <p>{myPokemon.defense}</p>
                <h3>Velocidad:</h3>
                <p>{myPokemon.speed}</p>
                <h3>Altura:</h3>
                <p>{myPokemon.height}</p>
                <h3>Peso:</h3>
                <p>{myPokemon.weight}</p>
            </div> 
            }
        </div>
    )
}