import React, { Fragment } from 'react';
import {useState , useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { filterDiet, getReceipes, orderbyName, orderByScore } from '../../actions/index';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import styles from '../CSS/Home.module.css';

export default function Home (){

const dispatch = useDispatch()
const allRecipes = useSelector((state) => state.recipes)

// HOOKS PARA MANEJO DE ESTADO GLOBAL Y EJECUCIÓN DEL ACTION PARA RECETAS
const [orden, setOrden] = useState('')
const[scored, setScored] = useState('')
useEffect (()=> {
    dispatch(getReceipes());
},[dispatch])

function handleClick(e){
    e.preventDefault();
    dispatch(getReceipes());
}

function handleFilterDiets(e){
    dispatch(filterDiet(e.target.value))
}

function handleOrderName(e){
    e.preventDefault();
    dispatch(orderbyName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

function handleScoreOrder(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordered ${e.target.value}`)
}

// PAGINADO
const[currentPage, setCurrentPage] = useState(1)
const[recipesPerPage, setrecipesPerPage] = useState(9)
const lastRecipeIndex = currentPage * recipesPerPage
const firstRecipeIndex = lastRecipeIndex - recipesPerPage
const currentRecipes = allRecipes.slice(firstRecipeIndex, lastRecipeIndex)

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

return (
    <div>
        <SearchBar />
        <Paginado
        recipesPerPage = {recipesPerPage}
        allRecipes = {allRecipes.length}
        paginado = {paginado}
        />

        <div className={styles.filters}>
            <h2>Our Filters:</h2>
        <button className={styles.button} onClick={ e => {handleClick(e)}}>
            Refresh
        </button>

            <select onChange={e => handleScoreOrder(e)} className={styles.select}>
                <option value='highest score'>Puntaje mayor</option>
                <option value='lowest score'>Puntaje menor</option>
            </select>
            <select className={styles.select} onChange={(e) => handleOrderName(e)}>
                <option value='asc'> (A-Z) </option>
                <option value='dsc'> (Z-A) </option>
            </select>
            <select className={styles.select} onChange={(e) => handleFilterDiets(e)}>
                <option value='All'> All </option>
                <option value='gluten free'> Gluten Free </option>
                <option value='dairy free'> Dairy Free </option>
                <option value='whole 30'> Whole 30 </option>
                <option value='lacto ovo vegetarian'> Lacto Ovo Vegetarian </option>
                <option value='paleolithic'> Paleolithic </option>
                <option value='vegan'> Vegan </option>
                <option value='pescatarian'> Pescatarian </option>
                <option value='primal'> Primal </option>
                <option value='ketogenic'> Ketogenic </option>
                <option value='fodmap friendly'> Fodmap Friendly </option>
            </select>

        </div>

        <div className={styles.mainCard}>



           { currentRecipes?.map((c) => {
               return (
                   <div key={c.id}>
                 <Link className={styles.Link} to={'/detail/'+ c.id } key={c.id}>
                   <Card name={c.name} img={c.img} diets={c.diets.map((c) => c.name ? c.name +'/': c+ '/')} />
                 </Link>
                </div>
               )
            })}

        </div>

    </div>
)
}