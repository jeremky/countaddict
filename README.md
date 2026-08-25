# CountAddict

Webapp minimaliste pour compter en un tap tes habitudes du quotidien (cigarette, café, thé, alcool, sucrerie, énergisant, vapotage, soda, achat, voyage, grignotage, CBD...), avec un historique des jours précédents.

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

## Fonctionnalités

- Compteurs personnalisables : ajoute/retire des addictions depuis le catalogue, réordonne-les par glissé-déposé.
- Historique quotidien avec statistiques (moyenne, total, max, pause la plus longue par addiction), filtrable par période (Cette semaine, Ce mois-ci, 6 mois, 1 an, Tout).
- Archivage réversible : retire une addiction de l'accueil sans perdre ses données (elle disparaît aussi de l'historique tant qu'elle reste archivée), avec la date d'archivage visible dans Réglages → Archives. Le menu d'une bulle propose Archiver dès qu'elle a été utilisée au moins une fois, et toujours Supprimer (suppression définitive, confirmation demandée uniquement si des données existent).
- Export/import des données au format JSON depuis les réglages.
- Interface disponible en français (par défaut) et en anglais, à changer depuis Réglages → Langue.

## Langue

L'interface est en français par défaut. Elle peut être basculée en anglais depuis Réglages → Langue ; le choix est mémorisé sur l'appareil (`localStorage`).

## Données

Stockées en clair dans `localStorage` sous la clé `countaddict.history`, au format :

```json
{ "2026-08-24": { "cigarette": 3, "coffee": 2 } }
```

Vider le cache du navigateur ou les données du site efface l'historique — pas de sauvegarde côté serveur.
