const axios = require ('axios');
const {API_KEY} = process.env;

const apiGames = async() => {
    const url = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const games = await url.data.results.map(value => {
        return{
            id: value.id,
            name: value.name,
            description: value.description,
            date: value.released,
            platforms: value.platforms.map(value2 => value2.platform.name),
            image: value.background_image,
            rating: value.rating
    }

})
return games;
};







module.exports = { 
    apiGames
    
}