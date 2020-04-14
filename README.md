# Projet d'Agence de Voyage - Techniques et Langages Web

  

## Bienvenue à bord moussaillon !

  

Bienvenue sur notre site d'agence de voyage ! De Osaka à Rome, en passant par San Francisco, notre agence vous propose de partir à lé découverte des meilleures destinations du globe !

  

Notre site internet est exclusivement développé côté client avec HTML5, CSS3 et JavaScript.

Vous pourrez ainis découvrir nos meilleures destinations dès vote accueil sur notre plateforme, vous pourrez également rajouter vos destinations préférées à votre panier.

  

Alors n'attendez plus et lancer vous sur <i>Sogni de Scapari</i> !

  

## Objectifs du projet

  

Les objectifs de ce projet ont été exprimé clairement dans un cahier des charges indiquant les instructions de ce projet.

On retrouve notamment les objectifs suivants :

1. Le site doit comporter au minimum les pages suivantes :

• une page principale qui présente les différentes destinations en photo

• une page de Réservation

• une page de Récapitulatif

• une page A propos & Contact

  

2. Le choix d’une destination sur la page principale doit amener à la page de réservation. Celle-ci reprend

l’intitulé du voyage sélectionné, et contient un formulaire de réservation. Lorsque le formulaire a été

correctement rempli, un bouton de validation conduit à la page de récapitulatif. Cette page reprend

les éléments du voyage tels qu’ils ont été paramétrés par l’utilisateur via le formulaire, avec un

numéro de réservation généré aléatoirement.

  

3. Le formulaire de réservation doit comporter les éléments suivants :

- nom*

- prénom*

- adresse mail*

- date de départ*

- date de retour*

- nombre d’adultes*

- nombre d’enfants (-12 ans)*

- une case à cocher ̈Petit-déjeuner ? ̈

- une zone de texte pour laisser une demande de renseignement

- une zone affichant le prix calculé

- un bouton de soumission et un bouton de remise à zéro

  

4. De base, le modèle de données des séjours est très simple : chaque séjour est caractérisé par un titre et

un prix par adulte et par jour mais ce dernier est à enrichir librement.

  

5. Le prix doit être calculé automatiquement dès modification du formulaire (durée du séjour, nombre d’adultes, nombres d’enfants etc...).

  

6. La page de contact doit comporter les éléments suivants :

• adresse (postale) de l’agence de voyage

• numéro de téléphone ; un clic sur ce numéro doit ouvrir automatiquement l’application associée à

la composition d’appels téléphoniques si l’utilisateur en dispose (par exemple Skype sur PC, ou

le téléphone sur smartphone)

• bouton d’envoi d’un mail ; l’objet du mail doit être pré-rempli avec « Demande de renseignements »et le corps du message doit commencer par « Bonjour, je souhaiterais obtenir des renseignements sur ».

  

7. Sur chaque photo de destination figurant sur la page principale, la température actuelle de ladite destination doit être affichée. Pour cela l’API proposée par le site web OpenWeatherMap sera utilisée.

  

8. Sur chaque page on doit retrouver :

• un menu de navigation

• un pied de page

• un bouton de retour au sommet de la page

Pour ce faire, l'utilisation de templates sera utilisée

  

9. Sur la page de votre site proposant les différents voyages, l’utilisateur doit disposer de filtres

(prix min / max ; disponibilité en fonction de la date ; animaux acceptés ou non ; petit déjeuner proposé,

etc...). Les destinations ne correspondant pas aux filtres doivent être automatiquement

masquées, sans clic sur un bouton de validation des filtres.

  

10. En dehors des éléments précédents, qui sont imposés, l’agence de voyage vous laisse le champ libre pour

le style.

  

Afin de répondre à tous ces points, nous allons vous présenter notre architecture logicielle et la logique de conception derrière cette dernière.

  

## Architecture logicielle

  

### Fichiers html

  

Afin de répondre à la présentation du site sur plusieurs pages, les pages html suivantes ont été créées :

• index.html

• destination.html

• cart.html

• profile.html

• about.html

  

#### index.html

  

Cette première page html, qui est également la page d'accueil de notre site, a pour objectif de présenter le catalogue de destinations sous forme de grille à l'utilisateur. Chaque destination comporte une photo, le nom de la ville, la température actuelle de ladite ville, une brève description de la destination, le prix de départ pour une personne adulte pour une journée, une liste de tags relatifs à la destination et enfin un bouton qui permet de rediriger l'utilisateur sur la page de réservation de la destination.

  

#### destination.html

  

Cette page de destination est donc la page vers laquelle l'utilisateur est redirigé après avoir cliquer sur le bouton "Voir en détails" de la destination. Une fois sur cette page, les mêmes informations sont présentées à l'utilisateur ainsi qu'en plus, le pays et le continent de la destination, une description plus détaillée et un bouton pour accéder au formulaire. Ce bouton intitulé "Réserver ce voyage" va donc afficher un formulaire que l'utilisateur va pouvoir remplir à son gré.

  

Ce formulaire est composé de :

• un champ de sélection de date d'arrivée sur place

• un champ de sélection de date de départ du lieu

• une checkbox afin d'indiquer si l'on souhaite inclure le petit-déjeuner au tarif

• un champ texte afin de rentrer le nombre d'adultes

• un champ texte afin de rentrer le nombre d'enfants (-12 ans)

• un champ texte afin de rentrer le nombre de chambres souhaités

• une zone de texte afin de laisser à l'utilisateur l'opportunité d'indiquer ou de demander une informations

• un bouton de remise à zéro des différents champs du formulaire

• un bouton afin de pouvoir ajouter cette destination à son panier

  

Tous ces champs de formulaire respecte des règles afin d'assurer une certaine cohérence au site. On peut notamment citer le fait que les dates sélectionnées doivent être supérieures à la date du jour et que la date de départ du lieu doit être supérieur à la date d'arrivée sur place.

  

#### cart.html

  

Une fois ces destinations ajoutées au panier, la liste de ces destinations reprend les informations de la destination et permet à l'utilisateur de supprimer cette destination ou de la modifier.

De plus, le prix total des destinations est affiché et l'utilisateur peut passer commande. Lorsque ce dernier souhaite passer sa commande, il devra être identifié et connecté.

  

#### profile.html

  

Afin d'identifier un utilisateur, ce dernier va d'abord devoir se créer un compte ou se connecter et pourra ainsi remplir les informations relatives à son compte dans la page profil. Cette page comporte les éléments suivants :

• un formulaire permettant à l'utilisateur de renseigner nom, prénom, changer de mot de passe, adresse postale, informations bancaires

• un bouton afin d'enregistrer toutes ces informations

• une photo d'utilisateur

• un bouton afin d'afficher les paramètres du compte de l'utilisateur

  

#### about.html

  

Enfin, une page d'informations à destination de l'utilisateur est disponible afin de présenter le nom, adresse, numéro de téléphone de l'agence ainsi que la possibilité d'envoyer un mail directement à la boite de messagerie de l'agence de voyage.

  

### Fichiers javascript

### Fichiers css

### Fichier json

### Assets

#### Images

#### favicon

  

## Idées d'améliorations

### Conceptuellement

  

Conceptuellement on peut citer de nombreux points d'améliorations qui n'ont pas pu être réalisés par manque de temps dont notamment:

  

• ajouter plus de champs pour le formulaire de réservation de destination (visites, prix du vol, taxi, animaux de compagnies, etc.)

• créer un carrousel d'images pour l'affichage en détail de la destination afin d'avoir plus d'images par destination

• créer des options de filtrages complètes afin de rendre la recherche de destination très spécifique

• ajouter un système de note ou d'avis des utilisateurs pour les destinations

• ajouter des modales avant la suppression d'un élément (carte bancaire ou destination du panier)

• ajouter des paramètres pour l'utilisateur

• la sauvegarde de l'image de profil pour l'utilisateur

  

### Techniquement

  

Au niveau technique, de nombreuses technologies étaient nouvelles au binôme créant ainsi une véritable curiosité intellectuelle afin d'exploiter au mieux les outils présentés en cours. Bien qu'ils soient tous très intéressant, certains ont cependant été mis de côté par manque de temps ou d'organisation. On regrette par exemple l'utilisation inexistante de la bibliothèque javascript jQuery ou de l’architecture AJAX.

  

### Humainement

  

Le projet n'a pas toujours su se montrer productif au cours de son développement. En effet, un manque de communication entre les membres de l'équipe s'est initié dès les premières semaines, empêchant ainsi le projet d'atteindre son plein potentiel. Ce retard, partiellement rattrapé, est toutefois regrettable au vu des bons échanges qui ont été aperçu sur les dernières semaines.

  

#### Réalisé par Brice Folléas et Thierry Spanu