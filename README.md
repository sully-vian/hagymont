# HaGymont

Pour build et lancer le projet:

```bash
./mvnw clean spring-boot:run
```

On accède ensuite à la racine [http://localhost:8080](http://localhost:8080).

Un petit usage de l'API de Google à [http://localhost:8080/Serv](http://localhost:8080/Serv).

Vous pouvez accéder à la page d'erreur en écrivant une URL qui n'existe pas [http://localhost:8080/rferj](http://localhost:8080/rferj) ou en écrivant des guillemets dans la zone de texte de la page d'IA (errur interne, affichage de la pile d'erreurs).

## Plan de développement

Le projet peut se découper en deux parties principales:

1. **base de données** et **API REST**
2. "**front-end**"

Il faut en premier dspécifier l'interface entre ces deux parties. Qu'on puisse ensuite bosser en parallèle sur un modèle commun.

### Base de données et API REST

Pour cette partie, il faudra concevoir la base de données et les classes Java (JPA) pour l'abstractiser. Ensuite, il faudra créer les contrôleurs REST pour relier tout ça au front-end.

### Front-end

Dans cette partie, ya du backend aussi en fait, les appels à l'API REST se feront ici. il faudra aussi gérer les formulaires et les pages (css si on a le temps).

## Dépendances

1. **Dotenv** (`dotenv-java`) pour charger les variables d'environnement (la clef API notamment) depuis le fichier `.env`.
2. **Spring Boot Starter Web** (`spring-boot-starter-web`) pour créer une API REST.
3. **Tomcat Embed Jasper** (`tomcat-embed-jasper`) pour le moteur de template JSP.
4. **Spring Boot Starter Data JPA** (`spring-boot-starter-data-jpa`) pour la gestion de la base de données.
5. **HSQLDB** (`hsqldb`) pour la base de données en mémoire
6. **Spring Boot Starter Test** (`spring-boot-starter-test`) pour les tests unitaires et d'intégration.

## API IA

Pour montrer au prof qu'on sait faire usage d'une API et surtout parce que **ça fait cool**, on va utiliser l'API IA de Google pour générer des phrases de motivation sur la page d'accueil.

### Fichier `.env`

Pour communiquer avec l'API IA, il faut une clef d'API. **Cette clef doit rester secrète** pour éviter de se faire bloquer à causes des abus de randoms d'internet qui nous l'auraient piquée. Pour ce faire, nous auront chacun un fichier `.env` qui contiendra la clef d'API. Ce fichier est ignoré dans le `.gitignore` pour éviter de partager la clef sur GitHub.

J'ai eu ma clef **gratuitement**, je sais pas si elle est limitée en nombre de requêtes. Si c'est le cas, il faudra peut-être en créer une autre.

La doc complète de l'API Gemini est [ici](https://aistudio.google.com/apikey)

### mysql

commande:

mysql -u root -p

(password:123456)

SHOW DATABASES;

USE hagymont;

SHOW TABLES;

CHECK TABLE xxx;
