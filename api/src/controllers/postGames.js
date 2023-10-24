const axios = require("axios");
const { Videogame, Genres } = require("../db");

const postGames = async (req, res) => {
  try {
    const { name, description, platforms, image, date, rating, genres } = req.body;

    if (!name || !description || !platforms || !image || !date || !rating || !genres) {
      return res.status(400).send("faltan datos");
    } else {
      const game = await Videogame.create({
          name,
          description,
          platforms,
          image,
          date,
          rating,
      });

      console.log("genres",genres);

      genres.map(async(gen)=>{
        
        const foundGenre = await Genres.findOne({where: {genres: gen}});
        await game.addGenres(foundGenre)

      })

      if (!game) {
        return res.status(200).send("El juego ya se encuentra creado, por favor cree otro juego");
      }

      return res.status(200).json({...game.dataValues, genres: genres}); // Enviamos el juego creado como respuesta
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  postGames,
};
