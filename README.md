# CountAddict

Webapp minimaliste pour compter les cigarettes et les cafés consommés dans la journée, avec un historique des jours précédents.

## Stack

HTML/CSS/JS vanilla, aucune dépendance, aucun build. Les données sont stockées dans `localStorage` (donc sur un seul appareil/navigateur).

## Lancer en local

```sh
python3 -m http.server -d /Users/jeremky/Documents/Applications/sources/countaddict
```

Puis ouvrir [http://localhost:8000](http://localhost:8000).

## Déployer

App 100% statique : il suffit de héberger le contenu du dossier tel quel (GitHub Pages, Netlify). Aucune configuration serveur particulière n'est nécessaire.

## PWA

L'app est installable sur mobile ("Ajouter à l'écran d'accueil") et fonctionne hors-ligne grâce à `sw.js`.

## Données

Stockées en clair dans `localStorage` sous la clé `countaddict.history`, au format :

```json
{ "2026-08-24": { "cigarettes": 3, "coffees": 2 } }
```

Vider le cache du navigateur ou les données du site efface l'historique — pas de sauvegarde côté serveur.
