const { addToLikedMovies, getLikedMovies, removeFromLikedMovies } = require("../controllers/userControl");

const router = require("express").Router();

router.post("/add", addToLikedMovies);
router.get("/liked/:email", getLikedMovies);
router.put("/delete", removeFromLikedMovies);

module.exports = router;