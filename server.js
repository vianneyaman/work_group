console.log("🚨 Le fichier server.js s'exécute !");
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');  
const Reponse = require('./models/Reponse');

const app = express();
app.use(cors());
app.use(express.json());

// Rendre tout les fichiers html,css et js publics qui sont placés dans le file public 
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connexion à MongoDB réussie"))
  .catch(err => console.error("❌ Erreur MongoDB:", err));

/* envoyer le fichier HTML , ça explique la ligne 13 genre j'ai mis home.html parce que c'est le main file
 à partir duquel je lance l'appli. c'est le public qui est dans la ligne 14 qui permet de faire ça . on pouvait se dire que pour 
 relier des pages on peut juste mettre des liens oui c'est exact mais c'est avec public là que c'est possible*/
app.get('/', (req, res) => {
  console.log('Route / appelée');
  res.sendFile(path.join(__dirname, 'public', 'Home.html'));
  
});



// Route POST pour enregistrer une réponse
app.post('/api/reponses', async (req, res) => {
  try {
    const nouvelleReponse = new Reponse(req.body);
    await nouvelleReponse.save();
    res.status(201).json({ message: "Réponse enregistrée avec succès." });
  } catch (error) {
    console.error("Erreur d’enregistrement :", error);
    res.status(500).json({ error: "Une erreur est survenue." });
  }
});

// Lancement du serveur , 3000 là on peut mettre ce qu'on veut
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});

// Route  pour récupérer toutes les réponses
app.get('/api/reponses', async (req, res) => {
  try {
    const reponses = await Reponse.find().sort({ date_visite: -1 });
    res.json(reponses);
  } catch (error) {
    console.error("Erreur de récupération :", error);
    res.status(500).json({ error: "Une erreur est survenue lors de la récupération." });
  }
});

// Bon allez vous faire foutre y'a chapgpt dedans l'essentiel est de comprendre .Ma go a fesse