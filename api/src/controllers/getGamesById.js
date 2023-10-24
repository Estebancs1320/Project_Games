const axios = require("axios");
const { Videogame } = require("../db");
require('dotenv').config();
const { API_KEY } = process.env;

const getGamesById = async (req, res) => {
  const { idVideogame } = req.params;

  try {
    function contieneLetras(cadena) {
      const expresionRegular = /[a-zA-Z]/;
      return expresionRegular.test(cadena);
    }
    console.log(typeof idVideogame);
    if (contieneLetras(idVideogame)) {
      
    const gameFromDatabase = await Videogame.findOne({
      where: { id: idVideogame },
    })
    if (gameFromDatabase) {
      return res.status(200).json(gameFromDatabase);
    }
  }

    const { data } = await axios.get(
      `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
    );

    if (!data) {
      return res.status(404).json({ message: "Juego no encontrado" });
    }

    const genres = data.genres.map((genre) => genre.name);
    const platforms = data.platforms.map((platform) => platform.platform.name);

    const game = {
      id: data.id,
      name: data.name,
      description: data.description,
      platforms: platforms,
      image: data.background_image,
      released: data.released,
      rating: data.rating,
      genres: genres,
    };

    if (!game.image.length) {
      game.image =
        "https://static.wikia.nocookie.net/playstation/images/6/6f/PS2_RSOD_original.png/revision/latest?cb=20191004185619";
      game.image.imageby = "by Game";
    }

    return res.status(200).json(game);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getGamesById,
};
