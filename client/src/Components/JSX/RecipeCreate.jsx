import React, { useState, useEffect } from "react";
import { Link, Navigate, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getDiets, postRecipe} from "../../actions/index";  
import SearchBar from "./SearchBar";
import styles from '../CSS/RecipeCreate.module.css'

function validate (input){
    let error = {};
    if(!input.name){
        error.name = 'El nombre es obligatorio'
    } else if(!input.resume){
        error.resume = 'El resumen es obligatorio'
    } else if(input.healthyscore < 0 || input.healthyscore > 100){
        error.healthyscore = 'El puntaje saludable debe ser un número entre 0 y 100'
    } else if(!input.healthyscore){
        error.healthyscore = 'El puntaje saludable es obligatorio'
    } else if(!input.img.includes('https://')){
        error.img = 'La imagen debe ser un link'
    } else if(!input.img){
        error.img = 'El link de la imagen es obligatorio'
    }
    return error;

}
export function RecipeCreate(){
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)
    const[error, setError]= useState({});
    const[input, setInput] = useState({
        name: '',
        resume: '',
        healthyscore: '',
        steps: '',
        img: '',
        diets:[]
    })

    useEffect(()=> {
        dispatch(getDiets())
    },[dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input)
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                diets: [...input.diets,e.target.value]
            })
            console.log(input)
        } else {
            setInput({
                ...input,
                diets: input.diets.filter((d) => d !== e.target.value)
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        if(!error.name && !error.resume && !error.healthyscore && !error.image){
        dispatch(postRecipe(input))
        alert('Recipe created')
        setInput({
            name: '',
            resume: '',
            score: '',
            healthyscore: '',
            steps: '',
            img: '',
            diets:[]
        });
        } else {
            return alert('No es posible crear la receta')
        } 
    }


    return (
        <div>

            <SearchBar/>

        <div className={styles.containerform}>
            <h2> ¡Get to create a great Recipe!</h2>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div> <label className={styles.label}>Name:</label>
                    <input
                    className={styles.input}
                    type='text'
                    value= {input.name}
                    name= 'name'
                    onChange={handleChange}
                    />
                    {error.name && (
                        <p>{error.name}</p>
                    )}
                </div>
                <div><label className={styles.label}>Resume:</label>
                    <input
                    className={styles.input}
                    type='text'
                    value={input.resume}
                    name='resume'
                    onChange={handleChange}
                    />
                                        {error.resume && (
                        <p>{error.resume}</p>
                    )}
                </div>
                <div><label className={styles.label}>Healthy Score:</label>
                    <input
                    className={styles.input}
                    type='number'
                    value={input.healthyscore}
                    name= 'healthyscore'
                    onChange={handleChange}
                    />
                    {error.healthyscore && (
                        <p>{error.healthyscore}</p>
                    )}
                </div>
                <div><label className={styles.label}>Steps:</label>
                    <input
                    className={styles.input}
                    type='text'
                    value={input.steps}
                    name='steps'
                    onChange={handleChange}
                    />
                </div>
                <div><label className={styles.label}>Link Image:</label>
                    <input
                    className={styles.input}
                    type='text'
                    value={input.img}
                    name='img'
                    onChange={handleChange}
                    />
                    {error.img && (
                        <p>{error.img}</p>
                    )}
                </div>
                <div><h3>Select diets recipe</h3>
                    {diets.map((e) => (
                        <div>
                        <label className={styles.label}> {e.name}</label>
                        <input 
                        className={styles.input}
                        type='checkbox'
                        name={`${e.name}`}
                        value={`${e.name}`}
                        onChange={(e)=> handleCheck(e)}
                        />
                        </div>

                    ))}
                </div>
                <button className={styles.buttonsub} type='submit'>Create</button>
            </form>
            
            </div>
        </div>
    )
}