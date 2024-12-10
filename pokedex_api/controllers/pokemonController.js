const { Pokemons, Users } = require('../models');


const getAllPokemons = (req, res) => {
  res.json(Pokemons);
};


const getPokemonById = (req, res) => {
  const pokemon = Pokemons.find(p => p.id === parseInt(req.params.id));
  if (!pokemon) return res.status(404).json({ message: 'Pokémon no encontrado' });
  res.json(pokemon);
};


const getMyPokemons = (req, res) => {
  const myPokemons = Pokemons.filter(p => p.trainerId === req.user.id);
  res.json(myPokemons);
};

const createPokemon = (req, res) => {
  const { name, type, level } = req.body;
  const newPokemon = {
    id: Pokemons.length + 1,
    name,
    type,
    level,
    trainerId: req.user.id,
    createdAt: new Date()
  };
  Pokemons.push(newPokemon);
  res.status(201).json(newPokemon);
};

const updatePokemon = (req, res) => {
  const { name, type, level } = req.body;
  const pokemon = Pokemons.find(p => p.id === parseInt(req.params.id));

  if (!pokemon) return res.status(404).json({ message: 'Pokémon no encontrado' });

  if (pokemon.trainerId !== req.user.id) {
    return res.status(403).json({ message: 'No puedes actualizar este Pokémon' });
  }

  pokemon.name = name || pokemon.name;
  pokemon.type = type || pokemon.type;
  pokemon.level = level || pokemon.level;

  res.json(pokemon);
};


const deletePokemon = (req, res) => {
  const pokemonIndex = Pokemons.findIndex(p => p.id === parseInt(req.params.id));
  if (pokemonIndex === -1) return res.status(404).json({ message: 'Pokémon no encontrado' });

  const pokemon = Pokemons[pokemonIndex];

  if (pokemon.trainerId !== req.user.id) {
    return res.status(403).json({ message: 'No puedes eliminar este Pokémon' });
  }

  Pokemons.splice(pokemonIndex, 1);
  res.status(204).send();
};

module.exports = { getAllPokemons, getPokemonById, createPokemon, updatePokemon, deletePokemon, getMyPokemons };
