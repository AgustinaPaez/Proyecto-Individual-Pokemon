import React from "react";
import { Link } from "react-router-dom";
import estilos from './Card.module.css'

export default function Card({id, image, name, types}){
    return(
        <div className={estilos.carta}>
            <img src= {image} alt= 'img not found' width= '200px' height='250px'/>
            <Link to={'/home/' + id} className={estilos.nombre}>
                <h3 >{name}</h3>
            </Link>
            {types?.map((t) => (
          <span className={estilos.tipos} key={t}>
            {" "}
            {t}
          </span>
        ))}
        </div>
    )
}