const axios = require ('axios');
const apiGames = require('./apiInfo');
const {gamesDb, genresDb } = require('./dbInfo');


const getAllInf = async() => {
    const gamesInfo = await apiGames();
    const dbInfo = await gamesDb();
    const allGames = gamesInfo.concat(dbInfo);
    return allGames; 
}

const postGame = () => {
    const newGame = {
        id,
        name,
        description,
        date,
        platform,
        image,
        rating
    }
    .push
}

const getGenres = async() => {
    const apiInfo = await genresDb();
    return apiInfo;
}

const getGameById = () =>{

}


module.exports = {
    getAllInf,
    postGame,
    getGameById,
    getGenres
}