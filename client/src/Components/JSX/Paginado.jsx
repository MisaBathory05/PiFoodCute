import React from "react";
import styles from '../CSS/Pagina.module.css';

export default function Paginado ({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []

    for(let i=1; i <= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className={styles.ul}>
                {pageNumbers && pageNumbers.map(number =>(
                    <div className={styles.buttonpage}>
                    <li className={styles.li} key={number}>
                    <a className={styles.a} onClick={() => paginado(number)}> {number} </a>
                    </li>
                    </div>
                ))}
            </ul>
        </nav>
    )
}