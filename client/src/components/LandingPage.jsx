import React from 'react';
import {Link} from 'react-router-dom';
import estilos from './LandingPage.module.css';

export default function LandingPage(){
    return (
        <div>
            <h1>¿Listo para comenzar tu aventura?</h1>
            <Link to= '/home'>
                <button className={estilos.btn}>Ingresar</button>
            </Link>
        </div>
    )
}