import React from "react";

export default function Paginado({pokemonsPerPage, allPokemons, paginado}){
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className = 'container'>
            <div className="paginado">
                {pageNumbers?.map(e=>(
                    <a key= {e} onClick={()=> paginado(e)}>{e}</a>
                ))}
            </div>
        </div>
    )
}