# HaGymont

Pour build:

```bash
./mvnw clean package
```

Ensuite copier le war dans le dossier webapps de votre installation Tomcat.

## Plan de développement

Le projet peut se découper en deux parties principales:

1. **base de données** et **API REST**
2. "**front-end**"

Il faut en premier dspécifier l'interface entre ces deux parties. Qu'on puisse ensuite bosser en parallèle sur un modèle commun.

### Base de données et API REST

Pour cette partie, il faudra concevoir la base de données et les classes Java (JPA) pour l'abstractiser. Ensuite, il faudra créer les contrôleurs REST pour relier tout ça au front-end.

### Front-end

Dans cette partie, ya du backend aussi en fait, les appels à l'API REST se feront ici. il faudra aussi gérer les formulaires et les pages (css si on a le temps).

## API IA

Pour montrer au prof qu'on sait faire usage d'une API et surtout parce que **ça fait cool**, on va utiliser l'API IA de Google pour générer des phrases de motivation sur la page d'accueil.

### Fichier `.env`

Pour communiquer avec l'API IA, il faut une clef d'API. **Cette clef doit rester secrète** pour éviter de se faire bloquer à causes des abus de randoms d'internet qui nous l'auraient piquée. Pour ce faire, nous auront chacun un fichier `.env` dans le dossier `src/main/resources` qui contiendra la clef d'API. Ce fichier est ignoré dans le `.gitignore` pour éviter de partager la clef sur GitHub.

J'ai eu ma clef **gratuitement**, je sais pas si elle est limitée en nombre de requêtes. Si c'est le cas, il faudra peut-être en créer une autre.

### Requête

Pour communiquer avec l'API, il faut écrire une requête POST de la forme:

```json
{
    "contents": [{
        "parts": [{
            "text": "combien font 23 - 22 ?"
        }]
    }]
}
```

à l'adresse

```http
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY
```

en remplaçant `GEMINI_API_KEY` par la clef d'API spécifiée dans le fichier `.env` dans le dossier `src/main/resources`.

### Réponse

Les réponses de l'API ressemblent à ça:

```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "23 - 22 = 1\n"
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP",
      "avgLogprobs": -0.00040897452272474765
    }
  ],
  "usageMetadata": {
    "promptTokenCount": 9,
    "candidatesTokenCount": 10,
    "totalTokenCount": 19,
    "promptTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 9
      }
    ],
    "candidatesTokensDetails": [
      {
        "modality": "TEXT",
        "tokenCount": 10
      }
    ]
  },
  "modelVersion": "gemini-2.0-flash"
}
```