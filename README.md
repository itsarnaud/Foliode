# Foliode

Le projet **Foliode** a pour mission de concevoir et développer une solution technologique appliquée au domaine de l’éducation numérique, spécialement orientée vers les étudiants et enseignants de formations BUT. Foliode permet aux utilisateurs de générer et personnaliser un portfolio web, mettant en valeur les compétences, projets, et apprentissages critiques associés à leur parcours.

## Sommaire

1. [Description du Projet](#description-du-projet)
1. [Technologies et Stack](#technologies-et-stack)
1. [Phase de Cadrage](#phase-de-cadrage)

## Description du Projet

**Foliode** est un générateur de portfolios pédagogiques conçu pour simplifier la création de portfolios en ligne professionnels et accessibles. Cet outil vise à :
- Offrir aux étudiants une plateforme de présentation de leurs compétences et projets dans un format visuel et accessible.
- Faciliter le suivi pédagogique pour les enseignants via des portfolios standardisés et clairs, alignés avec les objectifs d'apprentissage des formations BUT.

Les utilisateurs sont guidés étape par étape à travers un formulaire intuitif, peuvent choisir parmi différents templates de présentation, et génèrent un portfolio final hébergé sous un sous-domaine unique (ex. : `prenom.nom.foliode.com`).

### Critères Pédagogiques

- **Développement Front-end** : Création d’interfaces utilisateurs (UI/UX) et conception de pages web interactives.
- **Développement Back-end** : Infrastructure sécurisée pour la gestion des données et les interactions avec la base de données.
- **Création numérique et dispositifs interactifs** : Modélisation 3D, production d'images, et intégration de dispositifs visuels.
- **Développement d’une application mobile** : Adaptabilité et accessibilité multi-supports.
- **Déploiement, sécurité et hébergement** : Mise en production et gestion sécurisée des sous-domaines utilisateurs.

## Technologies et Stack

- **Frontend** : React (TypeScript), SCSS, Docker.
- **Backend** : Symfony, PostgreSQL, Docker.
- **Dispositifs Interactifs** : Blender, Three.js pour la modélisation et l’affichage 3D.
- **Design** : Suite Adobe, Figma pour la création visuelle et les maquettes.

## Phase de Cadrage

### Membres de l'Équipe

- **Arnaud ROYER**
- **Timothé HEGE**
- **Rémi FAUPIN**
- **Raphaël BOUCHERON**
- **Sacha MERLETTI**

Chef de projet : **Arnaud ROYER** <br>
Nom de l'équipe : **Foliode**

### Répartition des Rôles

- **Frontend** : Arnaud, Timothé, Raphaël, Sacha, Rémi
- **Backend** : Arnaud, Raphaël, Timothé (support), Rémi (support)
- **Dispositifs Interactifs** : Sacha, Timothé, Rémi (support)
- **Design** : Rémi, Timothé, Arnaud (support)
- **Documentation** : Arnaud, Timothé, Raphaël, Sacha, Rémi

Vous pouvez accéder à notre Jira en cliquant **[ici](https://foliode.atlassian.net/jira/software/projects/DEV/boards/1)**


### Architecture du site

#### Modèle MVC
---

L'architecture de **Foliode** suit le modèle **MVC (Modèle-Vue-Contrôleur)**, organisé en trois couches :

1. **Modèles** :

    - Utilisateurs : Nom, email, mot de passe, rôles...
    - Portfolio : Titre, sous-titre, configuration...
    - Projets : Titre, description, image, date...
    - AC : Nom et code
    - Semestre : Nom
    - Formation : Nom, type et durée
    - Ressources : Nom, sujet et code

Voici le diagramme de classe, une repésentation plus visuelle des données et de leurs relations : <br>
*Insérer le diagramme ici*

2. **Vues** :

    - Page de présentation : Description du projet, call to action, contacte, exemples
    - Page d'authentification : Inscription, Connexion, Réinitialisation du mot de passe
    - Dashboards : Page spécifique pour les administrateurs, professeurs et étudiants
    - Formulaire de création de portfolio : Vue intéractives permettant de saisir les informations nécessaires au portfolio
    - Liste des templates
    - Prévisualisation et publication
    - Page de gestions des projets et des compétences
    - Page de configuration du portfolio : couleurs, typographies...
    - Page de gestion de l'utilisateurs : modification des informations personnels
    - Page d'aide et de support

3. **Contrôleurs** : 

    - Auth : Gère l'inscription, la connexion et la déconnexion des utilisateurs
    - User : Gère les données des utilisateurs (modification, suppression)
    - Portfolio : Gère la création, l'édition, la suppression et la publication des portfolios
    - Template : Lister les templates
    - Projets : Gère les projets ajouté au portfolio (ajout, modification, suppression)
    - Skill : Gère l'ajout, la suppression et la modification des compétences

#### Structures d'URL
---
Foliode utilisera un système de sous-domaine dynamique :

1. `www.foliode.com` : Les pages de présentations.

2. `app.foliode.com` : Tout ce qui va toucher à l'application de création du portfolio.
    - Connexion / Inscription
    - Formulaire guidé
    - Dashboards
    - Liste des templates
    - Configuration portfolio
    - Gestion du compte utilisateur

3. `prénom.nom.foliode.com` : Hébergement du portfolio de l'utilisateur.

#### Menus de navigation
---

1. `www.foliode.com` : 

2. `app.foliode.com` :

#### UI/UX
---
Vous pouvez suivre la partie design UI/UX à partir de **[ce lien.](https://www.figma.com/design/ROWwLlIORy6RhrFvcYBhvL/Foliode?node-id=0-1&node-type=canvas&t=nkLLfDURPWkMKEpb-0)**