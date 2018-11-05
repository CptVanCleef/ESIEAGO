# ESIEAGO
Jeu online de Go


Pour lancer le jeu: 

1. Clone le repo

2. Lancer `npm install`

3. Lancer `npm start`

4.  http://localhost:5000/



Choix des technologies: 
socket.io pour le multigaming
JS natif pour le jeu
JS Scaledrone pour le tchat
UI appli web (html css)

Problèmes rencontrés: difficultés à utiliser socket.io pour coordonner les actions de chaque joueur, valider une vitoire etc
Le lobby tourne correctement, les joueurs match, le tchat est opérationnel, mais le jeu se déroule comme si il était en local sur chaque poste.

Problemes chargement des PNG: le probleme semble se situer lors du chargmement du serveur socket.io, puisque independemment le jeu s'affiche correctement; solution graphique par X et O pour pallier 
