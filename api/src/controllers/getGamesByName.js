const axios = require("axios");
const { Op } = require("sequelize");
const { Videogame } = require("../db");
require('dotenv').config();
const { API_KEY } = process.env;


const getGamesByName = async (req, res) => {
  const { name } = req.query;

  try {
    
    const gamesFromDatabase = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    
    const { data } = await axios.get(
      `https://api.rawg.io/api/games?key=${API_KEY}&search=name=${name}`
    );



    const gamesFromAPI = data.results.map((result) => {

      const genres = result.genres.map((genre) => genre.name);
      const platforms = result.platforms.map((platform) => platform.platform.name);

      const game = {
        id: result.id,
        name: result.name,
        description: result.description,
        platforms: platforms,
        image: result.background_image,
        released: result.released,
        rating: result.rating,
        genres: genres,
      };

      return game;
    });

    const filteredGamesFromAPI = gamesFromAPI.filter((game) => 
    game.name.toLowerCase().includes(name.toLowerCase())
    );

    const limitedGamesFromAPI = filteredGamesFromAPI.slice(0, (15, filteredGamesFromAPI.length));

    console.log(limitedGamesFromAPI);

    if (gamesFromDatabase.length === 0 && limitedGamesFromAPI.length === 0) {
      return res.status(404).json({ message: "No se encontraron juegos con ese nombre" });
    }

    return res.status(200).json([...gamesFromDatabase, ...limitedGamesFromAPI]);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getGamesByName,
};
