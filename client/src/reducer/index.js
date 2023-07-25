const initialState = {
    recipes : [],
    allRecipes: [],
    diets : [],
    detail: [],
}

function rootReducer(state=initialState, action){
    switch(action.type){
        //TRAE LAS RECETAS DE LA API
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        
        //FILTRADO DE DIETAS
        case 'FILTER_BY_DIET':
                const recipesdos = state.allRecipes
                const recipesfiltered = action.payload === 'All'? recipesdos : recipesdos.filter((e) => e.diets.includes(action.payload))
                return{
                ...state,
                recipes: recipesfiltered      
                }
        
        // BUSCA UNA RECETA POR SU NOMBRE
        case 'GET_NAME_RECIPES':
                return {
                    ...state,
                    recipes: action.payload
                }
        
        // CREA UNA NUEVA RECETA
        case 'POST_RECIPE':
                return{
                    ...state
                }
        
        //TRAE LAS DIETAS EXISTENTES
        case 'GET_DIETS':
                return{
                    ...state,
                    diets: action.payload
                }
        
        // ORDENA ALFABETICAMENTE LAS RECETAS
        case 'ORDER_BY_NAME':
                const recipestres = state.allRecipes
                const ordername = action.payload === 'asc'? 
                recipestres.sort(function(a,b) {
                    if(a.name > b.name){
                        return 1;
                    } 
                    if (b.name > a.name){
                        return -1;
                    }
                    return 0;
                }) : recipestres.sort(function(a,b){
                    if(a.name > b.name){
                        return -1;
                    } 
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
                return{
                ...state,
                recipes: ordername
                }

        case 'ORDER_BY_SCORE':
            let scoredRecipes = action.payload === 'highest score' ?
                state.recipes.sort(function (a, b) {
                    if (a.healthyscore < b.healthyscore) {
                        return 1;
                    }
                    if (b.healthyscore < a.healthyscore) {
                        return -1;
                    }
                    return 0;
                }) :
                state.recipes.sort(function (a, b) {
                    if (a.healthyscore < b.healthyscore) {
                        return -1;
                    }
                    if (b.healthyscore < a.healthyscore) {
                        return 1;
                    }
                    return 0
                })
            return {
                ...state,
                recipes: scoredRecipes
            }
        
        // TRAE LOS DETAILS PARA RUTA DINAMICA
        case 'GET_DETAILS':
            return{
                ...state,
                detail: action.payload
            }

            default: 
                return state;
    }
}

export default rootReducer;