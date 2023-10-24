const axios = require("axios");
const { Genres } = require("../db");
require('dotenv').config();
const { API_KEY } = process.env;


const getGenres = async (req, res) => {
  try {
    const genresFromDB = await Genres.findAll();

    if(genresFromDB>0){
      return res.status(200).json(genresFromDB)
    }

    const { data } = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    if( !data.results || data.results.length===0){
      return res.status(404).json({massage: "The genders were no found"});
    }

    //se crea una const que iterara sobre data.results(resultado de la consulta hecha con axios anteriormente)
    //por cada iteracion se crea un nuevo registro en la tabla de base de datos representada por el modelo Genres
    // se crea la propiedad genres creada en el modelo
    for (const x of data.results) {
      await Genres.findOrCreate({where: {
        genres: x.name,
      }});
    }

    // Vuelve a consultar los géneros de la base de datos después de guardarlos
    const updatedGenres = await Genres.findAll();

    return res.status(200).json(updatedGenres);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getGenres,
};
