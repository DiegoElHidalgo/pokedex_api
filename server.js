require('dotenv').config();
const express = require('express'); 
const app = express(); 
const PORT = process.env.PORT || 3000; 


app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la Pokédex API!');
});

const pokemonRoutes = require('./routes/pokemonRoutes');
app.use('/pokemon', pokemonRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
