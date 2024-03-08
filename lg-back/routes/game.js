var express = require('express');
var router = express.Router();


let joueurs = 0;

app.get('/game', (req, res) => {
    if (joueurs < 10) {
        joueurs++;
        res.send(`Vous avez rejoint la partie. Il y a ${joueurs} joueur(s) dans la partie.`);
    } else {
        res.send('La partie est complète. Veuillez réessayer plus tard.');
    }
});

// Définition de la route pour quitter la partie
app.get('/quitter', (req, res) => {
    if (joueurs > 0) {
        joueurs--;
        res.send(`Vous avez quitté la partie. Il reste ${joueurs} joueur(s) dans la partie.`);
    } else {
        res.send('Il n\'y a aucun joueur dans la partie.');
    }
});

//gestion des joueurs avec un nombre 8




module.exports = router;
