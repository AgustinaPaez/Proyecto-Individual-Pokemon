import React from "react";
import { Link } from "react-router-dom";

export default function Card({id, image, name, types}){
    return(
        <div>
            <Link to={'/home/' + id} >
                <img src= {image} alt= 'img not found' width= '200px' height='250px' />
                <h3>{name}</h3>
            </Link>
            <h5>{types}</h5>
        </div>
    )
}