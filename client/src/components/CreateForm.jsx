import React from "react";
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPokemon } from "../actions";
import { Link } from "react-router-dom";
import estilos from './CreateForm.module.css'


export default function CreateForm(){
    const dispatch = useDispatch();
    const myTypes = useSelector((state)=> state.types)
    const pokemons =useSelector((state)=> state.pokemons)

    const [objeto, setObjeto] =useState({
        name: '',
    image:'',
    hp:'',
    attack:'',
    defense:'',
    speed: '',
    height: '',
    weight: '',
    types: [],
    })

    useEffect(()=>{
        dispatch(getTypes())
    }, [dispatch])

    function handleTypes(e){
        if(e.target.checked){
            setObjeto({
                ...objeto,
                types: [...objeto.types, e.target.value]
            })
        }
        if(!e.target.checked){
            setObjeto({
                ...objeto,
                types: objeto.types.filter((el)=> e.target.value !== el)
            })
        }
    }

    const nombreValido= /^[a-zA-ZñÑ]+$/i;
    //const nombreRepetido = pokemons.includes(objeto.name)  || nombreRepetido === true
    //tambien podria usar el metodo find si la variable q defino tiene length que ahi me tire el alert

    function handleSubmit(e){
        e.preventDefault();
        if(!objeto.name || objeto.name.length > 20 || !nombreValido.test(objeto.name) ) return alert('El nombre es obligatorio, solo puede llevar letras y su largo debe ser menor a 20')
        if(!objeto.hp || objeto.hp <= 0 || objeto.hp > 200) return alert('El campo vida es obligatorio y debe ser mayor a 0 y menor a 200')
        if(!objeto.attack || objeto.attack <= 0 || objeto.attack > 200) return alert('El campo fuerza es obligatorio y debe ser mayor a 0 y menor a 200')
        if(!objeto.defense || objeto.defense <= 0 || objeto.defense > 200) return alert('El campo defensa es obligatorio y debe ser mayor a 0 y menor a 200')
        if(!objeto.speed || objeto.speed <= 0 || objeto.speed > 300) return alert('El campo velocidad es obligatorio y debe ser mayor a 0 y menor a 300')
        if(!objeto.height ||objeto.height <= 0 || objeto.height > 100) return alert('El campo altura es obligatorio y debe ser mayor a 0 y menor a 100')
        if(!objeto.weight || objeto.weight <= 0 || objeto.weight > 1000) return alert('El campo peso es obligatorio y debe ser mayor a 0 y menor a 1000')
        if(objeto.types.length === 0 || objeto.types.length > 2) return alert('El campo tipos es obligatorio y solo pueden seleccionarse máximo 2 tipos')
        dispatch(postPokemon(objeto));
        alert('¡Pokemon agregado exitosamente!')
    }

    return (
        <div>
            <Link to= '/home'><button className={estilos.btn}>Volver</button></Link>
            <h1>¡Crea tu Pokemon!</h1>
            <form onSubmit={handleSubmit} className={estilos.todo}>
                <div className={estilos.cuadro}>
                    <label className={estilos.palabra}>Nombre:</label>
                    <input type= 'text'
                    onChange={(e)=>setObjeto({...objeto, name: e.target.value.toLowerCase()})}
                    className={estilos.contenedor}
                    />
                </div>
                <div className={estilos.cuadro}>
                    <label className={estilos.palabra}>Imagen:</label>
                    <input type='url' id='url' name='url'
                    placeholder="Url opcional..."
                    onChange={(e)=>setObjeto({...objeto, image: e.target.value})}
                    className={estilos.contenedor}
                    />
                </div>
                <div className={estilos.cuadro}>
                    <label className={estilos.palabra}>Vida:</label>
                    <input type='number'
                    placeholder="0-200"
                    onChange={(e)=>setObjeto({...objeto, hp: e.target.value})}
                    className={estilos.contenedor}
                    />
                </div>
                <div className={estilos.cuadro}>
                    <label className={estilos.palabra}>Ataque:</label>
                    <input type='number'
                    placeholder="0-200"
                    onChange={(e)=>setObjeto({...objeto, attack: e.target.value})}
                    className={estilos.contenedor}
                    />
                </div>
                <div className={estilos.cuadro}>
                    <label className={estilos.palabra}>Defensa:</label>
                    <input type='number'
                    placeholder="0-200"
                    onChange={(e)=>setObjeto({...objeto, defense: e.target.value})}
                    className={estilos.contenedor}
                    />
                </div>
                <div className={estilos.cuadro}>
                    <label className={estilos.palabra}>Velocidad:</label>
                    <input type='number'
                    placeholder="0-300"
                    onChange={(e)=>setObjeto({...objeto, speed: e.target.value})}
                    className={estilos.contenedor}
                    />
                </div>
                <div className={estilos.cuadro}>
                    <label className={estilos.palabra}>Altura:</label>
                    <input type='number'
                    placeholder="0-100"
                    onChange={(e)=>setObjeto({...objeto, height: e.target.value})}
                    className={estilos.contenedor}
                    />
                </div>
                <div className={estilos.cuadro}>
                    <label className={estilos.palabra}>Peso:</label>
                    <input type='number'
                    placeholder="0-1000"
                    onChange={(e)=>setObjeto({...objeto, weight: e.target.value})}
                    className={estilos.contenedor}
                    />
                </div>
                <div className={estilos.cuadro}>
                    <label className={estilos.palabra}>Tipos:</label>
                    {myTypes?.map((e)=>(
                        <label key={e} className={estilos.palabra}>
                            <input 
                            type='checkbox'
                            name={e}
                            value={e}
                            onChange={handleTypes}
                            
                            />
                    {e}{" "}
                        </label>
                    ))}
                </div>
                <div>
                    <button type= 'submit' className={estilos.otro}>¡Agregar Pokemon!</button>
                </div>
            </form>
        </div>
    )

}