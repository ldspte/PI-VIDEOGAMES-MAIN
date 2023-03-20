// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Router } = require('express');
const axios = require ('axios');
const {Videogame, Genre} = require ('../db');
const {getAllInf, getGenres} = require ('../controllers/index');
const {API_KEY} = process.env;
const router = Router();
const morgan = require('morgan');
const express = require('express');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(express.json());
router.use(morgan('dev'));



router.get('/videogames', async(req,res) =>{
    let name = req.query.name;
    const allGames = await getAllInf();
    if (name){
        const gameName = await allGames.filter(value => value.name.toLowerCase().includes(name.toLowerCase()));
        if (gameName){
            return res.status(202).json(gameName);  
        }else{
            return (
                res.status(404).send('Game Not Found')
            )
        };

        }
    return (
        res.status(200).json(allGames));
});

router.get('/videogame/:idVideogame', async (req,res) => {
    const {idGame} = req.params;
    if (idGame.includes("-")){
        try{
            const dbInfo = await Videogame.findByPk(idGame, {includes: Genre})
            let gameGenre = {
                id: dbInfo.id,
                name: dbInfo.name,
                description: dbInfo.description,
                date: dbInfo.date,
                platform: dbInfo.platform,
                image: dbInfo.image,
                rating: dbInfo.rating,
                genres: dbInfo.genres.map(value => value.name)
            }
            if(gameGenre) res.status(200).json(gameGenre)
        }catch (error){
            res.status(404).json({error: "Game not found in database"});
        }
    }else{
        try{
            const dbInfo = await axios.get(`https://api.rawg.io/api/games/${idGame}?key=${API_KEY}`);
            let gameApi = {
                id: dbInfo.data.id,
                name: dbInfo.data.name,
                description: dbInfo.data.description,
                date: dbInfo.data.date,
                platform: dbInfo.data.platform,
                image: dbInfo.data.image,
                rating: dbInfo.data.rating,
                genres: dbInfo.data.genres.map(value => value.name)
            }
            if (gameApi) res.status(200).json(gameApi);
        }catch (error) {
            res.status(404).json({error: "Game not found in API"});
        }
    }
});

router.get("/genres", async (req,res) =>{
    const genres = await getGenres();
    res.status(200).json(genres);
});

router.post("/videogame", async (req, res, next) =>{
    let {name, description, date, rating, platform, image, genres} = req.body;
    try{
        let newGame = await Videogame.create({
            name,
            description,
            date,
            rating,
            platform,
            image,
            genres
        })
        genres.forEach(async value => {
            let genreDb = await Genre.findAll({
                where: {name: value},
            });
            await newGame.addGenre(Object.value(genreDb));
        });
        res.status(200).send(newGame);
    }
    catch(error) {next(error)};
});


router.get('/platforms', async (req, res) => {
    const url = await getAllInf();
    const platforms = await url.map(value => value.platforms)
    res.status(200).json(platforms);
});






module.exports = router;
