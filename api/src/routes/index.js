const { Router } = require('express');
const {API_KEY} = process.env;
require("dotenv").config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Diets, Recipe } = require('../db')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getinfoApi = async () => { 
    const urlApi = await axios.get('https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=77b5b8b644c9434c9903f5671d8d5881')
        const infoApi = urlApi.data.results.map( (c) => {
        return {
            id: c.id,
            name: c.title,
            resume: c.summary,
            healthyscore: c.healthScore,
            steps: c.analyzedInstructions.map((el) => el),
            img: c.image,
            diets: c.diets.map((c) => c),
        }
    })
    return infoApi; 
}

const getinfoDb = async () => {
    return await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const allInfo = async () => {
    const infoApi = await getinfoApi();
    const infoDb = await getinfoDb();
    const infoComplete = infoApi.concat(infoDb);
    return infoComplete;
}



router.get('/recipes', async (req,res) => {
    const name = req.query.name
    const allinf = await allInfo();
        if(name){        
        let reciname = await allinf.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        reciname.length ?
        res.status(200).send(reciname) :
        res.status(404).send('No se encontro una receta con estos parametros')
        } else { res.status(200).send(allinf) }
});

router.get('/recipes/:idRecipe', async (req,res) => {
    const { idRecipe } = req.params
    const inforall = await allInfo();
    // res.send(inforall)
    if(idRecipe.length > 0){
        const traeid = inforall.filter(e => idRecipe == e.id)
        if (traeid) { res.status(200).send(traeid) } 
        else {res.status(400).send('No se encontraron resultados con el ID suministrado')}
    } else { res.send('chupelo')}
})

router.get('/types', async (req,res) => {
    const takeInf = await getinfoApi();
    const bank = [];
    const dietscom = takeInf.map(e => e.diets).flat()
        dietscom.forEach(e => {
        if(!bank.includes(e)){
            bank.push(e);
        }
    })
    
        bank.forEach(e => {
            Diets.findOrCreate({
            where: {name: e}
         })
        })
    const allDiets = await Diets.findAll()
    res.status(200).send(allDiets)
})

router.post('/types', async(req,res) => {
    const { name, resume, healthyscore, steps, img, diets, createdInDb } = req.body;

        let creaRecipe = await Recipe.create({
            name, 
            resume,  
            healthyscore, 
            steps,
            img, 
            createdInDb
        })

        let dietsDb = await Diets.findAll({
            where: {name: diets}
        })
        creaRecipe.addDiets(dietsDb);
        res.status(200).send('Receta creada correctamente')
    }
)





module.exports = router;