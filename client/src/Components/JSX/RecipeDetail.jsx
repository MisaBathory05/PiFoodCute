import React from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail } from '../../actions/index';
import { useEffect } from 'react';
import SearchBar from './SearchBar';
import styles from '../CSS/RecipeDetail.module.css'

export default function RecipeDetail(){
    const { id } = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch])
    
    const myRecipe = useSelector((state) => state.detail)

    return(
        <div className={styles.divcontainer}>
            <SearchBar/>
            {
                myRecipe.length>0 ?
                <div  className={styles.divmenor}>
                    <img  className={styles.img} src={myRecipe[0].img} alt='No hay imagen'/>
                    <h1 className={styles.h1}>{ myRecipe[0].name }</h1>
                    <h2 >Healthy Level {myRecipe[0].healthyscore}</h2>
                    <h3 className={styles.h3}> Diets: {myRecipe[0].diets}</h3>
                    <p className={styles.p}> 
                        {myRecipe[0]
                            ? myRecipe[0].resume.replace(/<[^>]*>?/g)
                            : "Resumen no disponible"}
                    </p>

                </div> : <h1 className={styles.h1}> Cargando... </h1>
            } 
        </div>
    )
}