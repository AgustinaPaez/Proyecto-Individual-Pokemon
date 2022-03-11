import React from "react";
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPokemon } from "../actions";
import { Link } from "react-router-dom";


export default function CreateForm(){
    const dispatch = useDispatch();
    const myTypes = useSelector((state)=> state.types)

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

    function handleSubmit(e){
        e.preventDefault();
        if(!objeto.name) return alert('El nombre es obligatorio')
        if(objeto.hp < 0 || objeto.hp > 200) return alert('La vida del pokemon debe ser mayor a 0 y menor a 200')
        if(objeto.attack < 0 || objeto.attack > 200) return alert('La fuerza del pokemon debe ser mayor a 0 y menor a 200')
        if(objeto.defense < 0 || objeto.defense > 200) return alert('La defensa del pokemon debe ser mayor a 0 y menor a 200')
        if(objeto.speed < 0 || objeto.speed > 300) return alert('La velocidad del pokemon debe ser mayor a 0 y menor a 300')
        if(objeto.height < 0 || objeto.height > 100) return alert('La altura del pokemon debe ser mayor a 0 y menor a 100')
        if(objeto.weight < 0 || objeto.weight > 1000) return alert('El peso del pokemon debe ser mayor a 0 y menor a 1000')
        
        dispatch(postPokemon(objeto));
        alert('¡Pokemon agregado exitosamente!')
    }

    return (
        <div>
            <Link to= '/home'><button>Volver</button></Link>
            <h1>¡Crea tu Pokemon!</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type= 'text'
                    onChange={(e)=>setObjeto({...objeto, name: e.target.value.toLowerCase()})}
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input type='url' id='url' name='url'
                    placeholder="Url opcional..."
                    onChange={(e)=>setObjeto({...objeto, image: e.target.value})}
                    />
                </div>
                <div>
                    <label>Vida:</label>
                    <input type='number'
                    placeholder="0-200"
                    onChange={(e)=>setObjeto({...objeto, hp: e.target.value})}
                    />
                </div>
                <div>
                    <label>Ataque:</label>
                    <input type='number'
                    placeholder="0-200"
                    onChange={(e)=>setObjeto({...objeto, attack: e.target.value})}
                    />
                </div>
                <div>
                    <label>Defensa:</label>
                    <input type='number'
                    placeholder="0-200"
                    onChange={(e)=>setObjeto({...objeto, defense: e.target.value})}
                    />
                </div>
                <div>
                    <label>Velocidad:</label>
                    <input type='number'
                    placeholder="0-300"
                    onChange={(e)=>setObjeto({...objeto, speed: e.target.value})}
                    />
                </div>
                <div>
                    <label>Altura:</label>
                    <input type='number'
                    placeholder="0-100"
                    onChange={(e)=>setObjeto({...objeto, height: e.target.value})}
                    />
                </div>
                <div>
                    <label>Peso:</label>
                    <input type='number'
                    placeholder="0-1000"
                    onChange={(e)=>setObjeto({...objeto, weight: e.target.value})}
                    />
                </div>
                <div>
                    <label>Tipos:</label>
                    {myTypes?.map((e)=>(
                        <label key={e}>
                            <input 
                            type='checkbox'
                            name={e}
                            value={e}
                            onChange={handleTypes}
                            />
                    {e}
                        </label>
                    ))}
                </div>
                <div>
                    <button type= 'submit'>¡Agregar Pokemon!</button>
                </div>
            </form>
        </div>
    )

}