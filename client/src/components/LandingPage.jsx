import React from 'react';
import {Link} from 'react-router-dom';
import estilos from './LandingPage.module.css';

export default function LandingPage(){
    return (
        <div className={estilos.body}>
            <h1 className={estilos.letra}>¿Listo para comenzar tu aventura?</h1>
            <Link to= '/home'>
                <button className={estilos.btn}>Ingresar</button>
            </Link>
        </div>
    )
}