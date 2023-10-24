const { Router } = require('express');
const { getGames } = require("../controllers/getGames")
const { getGamesById } = require("../controllers/getGamesById")
const { getGamesByName } = require("../controllers/getGamesByName")
const { postGames } = require("../controllers/postGames")
const { getGenres } = require("../controllers/getGenres")

const router = Router();

router.get("/videogames", getGames)
router.get("/videogames/name", getGamesByName)
router.get("/videogames/:idVideogame", getGamesById)
router.post("/videogames", postGames)
router.get("/genres", getGenres)

module.exports = router;
