const express = require('express');
const router = express.Router();
const { getAllPokemons, getPokemonById, createPokemon, updatePokemon, deletePokemon, getMyPokemons } = require('../controllers/pokemonController');
const { authenticate } = require('../middleware/authMiddleware');


router.get('/', getAllPokemons);

router.get('/:id', getPokemonById);

router.get('/trainer/mypokemons', authenticate, getMyPokemons);

router.post('/', authenticate, createPokemon);

router.put('/:id', authenticate, updatePokemon);

router.delete('/:id', authenticate, deletePokemon);

module.exports = router;
