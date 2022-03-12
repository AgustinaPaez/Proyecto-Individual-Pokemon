import React from "react";
import estilos from './Paginado.module.css'

export default function Paginado({pokemonsPerPage, allPokemons, paginado}){
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className = 'container'>
            <div className={estilos.ord}>
                {pageNumbers?.map(e=>(
                    <button key= {e} onClick={()=> paginado(e)} className={estilos.color}>{e}</button>
                ))}
            </div>
        </div>
    )
}