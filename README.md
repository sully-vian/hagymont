# HaGymont

Pour rebuild et lancer le projet:

```bash
./mvnw clean spring-boot:run
```

Les logs sont accesibles sur la console et dans le fichier [`target/hagymont.log`](target/hagymont.log).

## Plan de développement

Le projet peut se découper en deux parties principales:

1. **base de données** et **API REST**
2. "**front-end**"

Il faut en premier dspécifier l'interface entre ces deux parties. Qu'on puisse ensuite bosser en parallèle sur un modèle commun.

## Architecture

Les sources java sont séparées en plusieurs packages:

- `api`: les classes liées à l'API REST de la base de données (`controller`, `model`, `repository`)
- `controller`: les classses de contrôle des requêtes
- `security`: les classes liées à la sécurité et l'authentification
- `service`: les autres classes propres à une fonctionnalité (comme l'API Gemini par ex)

## Dépendances

1. **Dotenv** (`dotenv-java`) pour charger les variables d'environnement (la clef API notamment) depuis le fichier `.env`.
2. **Spring Boot Starter Web** (`spring-boot-starter-web`) pour créer une API REST.
3. **Spring Boot DevTools** (`spring-boot-devtools`) pour le rechargement automatique des classes lors du développement.
4. **Spring Boot Starter Data JPA** (`spring-boot-starter-data-jpa`) pour la gestion de la base de données.
5. **MySQL Connector/J** (`mysql-connector-j`) pour la connexion à MySQL.
6. **Spring Boot Starter Test** (`spring-boot-starter-test`) pour les tests unitaires et d'intégration.

## Authentification

Les pages en `/Serv` sont protégées par une authentification. Vous êtes automatiquement redirigés vers la page de connexion si vous essayez d'accéder à une page protégée sans être authentifié. Là, il faut rentrer un pseudo et mdp (voir la base de données).

En fait, le controlleur de Sécurité fait une requête GET à `http://localhost:<port>/api/auth/<username>`. Cette requête renvoie le pseudo et le mdp. On copare ensuite le mdp donné par l'utilisateur avec celui de la base de données.

C'est pas sécurisé du tout parce que n'importe qui peut faie une requête get syr l'api derrière.

Super [vidéo](https://youtu.be/_GSHvvken2k?si=SRKGmpoO03O13oRm) sur Spring Security pour comprendre l'authentification.

### Fichier `.env`

Pour communiquer avec l'API IA, il faut une clef d'API. **Cette clef doit rester secrète** pour éviter de se faire bloquer à causes des abus de randoms d'internet qui nous l'auraient piquée. Pour ce faire, nous auront chacun un fichier `.env` qui contiendra la clef d'API. Ce fichier est ignoré dans le `.gitignore` pour éviter de partager la clef sur GitHub.

J'ai eu ma clef **gratuitement**, je sais pas si elle est limitée en nombre de requêtes. Si c'est le cas, il faudra peut-être en créer une autre.

La doc complète de l'API Gemini est [ici](https://aistudio.google.com/apikey)

## mysql

commande:

mysql -u root -p

(password:123456)

SHOW DATABASES;

USE hagymont;

SHOW TABLES;

CHECK TABLE xxx;

### Clean up occupied port

#### Linux/macOS

sudo lsof -i :8081        #Finding PID （8081:The port we are using which we can set in application.properties)
sudo kill -9 <PID><PID>                # Replace with the actual PID

#### Windows

netstat -ano | findstr :8081  # Finding PID
taskkill /F /PID <PID>        # Replace with the actual PID
