import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { getRecipesNames } from "../../actions/index";
import {Link} from 'react-router-dom';
import styles from '../CSS/SearchBar.module.css'

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getRecipesNames(name))
        setName('')
    }

    return (

        <div className={styles.header}>
             <ul className={styles.ul}>
             <Link className={styles.Link} to= '/home'> <li className={styles.li}> HOME </li> </Link>
             <Link className={styles.Link} to= '/create'> <li className={styles.li}> CREATE</li> </Link>  
             <input className={styles.input}
                type='text'
                placeholder='Search recipe(s)...'
                onChange={(e) => handleInputChange(e)}
                />
             <p className={styles.buttoninput} type= 'submit' onClick={(e)=> handleSubmit(e)}> Search </p>
             </ul>
        </div>

    )    
}