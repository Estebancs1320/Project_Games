const axios = require("axios");
const { Videogame, Genres } = require("../db");
require('dotenv').config();
const { API_KEY } = process.env;

const getGames = async (req, res) => {
  try {
    let games = [];
    let page = 1;

    while (games.length < 100) {
      const { data } = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`);
      const results = data.results;

      if (results.length === 0) {
        break;
      }

      for (let i = 0; i < results.length; i++) {
        const genres = results[i].genres.map((genre) => genre.name);
        const platforms = results[i].platforms.map((platform) => platform.platform.name);
        
        const game = {
          id: results[i].id,
          name: results[i].name,
          description: results[i].description,
          platforms: platforms,
          image: results[i].background_image,
          released: results[i].released,
          rating: results[i].rating,
          genres: genres,
        };

        if (!game.image.length) {
          game.image =
            "https://static.wikia.nocookie.net/playstation/images/6/6f/PS2_RSOD_original.png/revision/latest?cb=20191004185619";
          game.image.imageby = "by Game";
        }

        games.push(game);
      }
      
      page++;
    }

    if (games.length > 100) {
      games = games.slice(0, 100);
    }

    const gameDataBase = await Videogame.findAll({include: {model: Genres}});
    const combinedGames = [...games, ...gameDataBase];

    return res.status(200).json(combinedGames);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getGames,
};
