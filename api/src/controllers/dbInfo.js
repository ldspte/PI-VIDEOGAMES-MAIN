const { Videogame, Genres } = require('../db');


const gamesDb = async() => {
    return await Videogame.findAll({
        include:{
            model: Genres,
            attributes: ['name'],
            through: { attributes: []}
        }
    });
}
const genresDb = async() => {
    return await Genres.findAll();
}


module.exports = {gamesDb, genresDb};