# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Utilisation strictement personnelle (confirmé) : l'app est un outil solo installé sur le téléphone de l'utilisateur, pas destiné à être partagé ou installé par d'autres personnes.

## Product Purpose

CountAddict permet de compter en un tap le nombre de cigarettes et de cafés consommés dans la journée, avec un historique des jours précédents.

*Inféré (non confirmé explicitement) :* le suivi est neutre — un simple relevé d'observation, sans objectif de réduction, sans streaks ni feedback encourageant. Cette hypothèse s'appuie sur le comportement actuel de l'app (tally neutre, aucune notion d'objectif ou de tendance). À corriger si l'intention est en réalité d'aider à réduire la consommation.

## Positioning

Un compteur minimaliste zero-friction : un tap = un événement enregistré, sans compte, sans backend, fonctionne hors-ligne (PWA installable), toutes les données restent en local (localStorage).

## Operating Context

- Utilisé de façon répétée tout au long de la journée (tap immédiat au moment de la consommation).
- Installé sur l'écran d'accueil du téléphone (PWA, `display: standalone`).
- Interface entièrement en français.
- Hébergé en statique, probablement aux côtés du site Hugo de l'utilisateur (cf. README).

## Capabilities and Constraints

- Aucune addiction n'est active par défaut : au premier lancement, la page d'accueil est vide et seul le lien « + Ajouter une addiction » est visible. Huit addictions basiques (cigarette, café, thé, alcool, sucrerie, énergisant, vapotage, soda) sont proposées en catalogue (`CATALOG` dans `app.js`), réordonnables par glissé-déposé. Une croix discrète sur chaque bulle propose d'Archiver (retire le widget de l'accueil, données conservées) ; les addictions archivées se gèrent depuis Réglages → Archives, avec un choix Réafficher (remet le widget) ou Supprimer (efface définitivement les données) — pas de catégories personnalisées libres.
- Persistance exclusivement locale via `localStorage` (clé `countaddict.history`) — pas de compte, pas de sync, pas de backend, pas de sauvegarde serveur.
- Stack zero-build, zero dépendance : HTML/CSS/JS vanilla, aucun framework, aucun bundler — contrainte durable à préserver pendant la refonte visuelle.
- Interface en français uniquement — pas de scaffolding i18n à ajouter.

## Brand Commitments

- Nom du produit : « CountAddict » (fixe).
- Icônes PWA existantes : `icons/icon-192.png`, `icons/icon-512.png` — à revoir ou remplacer selon la direction visuelle choisie en new-work, mais le nom et la fonction restent identiques.
- Préférence standing (confirmée 2026-08-24) : lors d'une refonte, exécuter l'univers visuel actuel (crème/terracotta, pastilles rondes, emoji 🚬/☕) en canon affiné plutôt que de le remplacer par un nouvel univers. Barre de qualité de référence pour cette exécution : Apple Health / Fitness (finition système, typographie soignée, micro-interactions discrètes).

## Evidence on Hand

Aucun asset de contenu (pas de témoignages, pas de captures, pas de données de démonstration) au-delà des deux icônes PWA listées ci-dessus. Ne pas inventer de contenu de preuve/marketing pour cet outil personnel.

## Product Principles

1. Le tap unique et immédiat pour enregistrer un événement est le cœur de l'app — toute refonte ne doit pas ajouter de friction (étapes, confirmations) à cette action principale.
2. Toutes les données restent locales (localStorage uniquement) — pas de compte, pas de cloud, par choix durable et non par simple absence de fonctionnalité.
3. Stack zero-build / zero dépendance — la refonte visuelle ne doit pas introduire d'outillage de build.
4. Outil mono-utilisateur, usage personnel — ne pas ajouter de fonctionnalités multi-utilisateur, partage ou compte.
5. Interface français uniquement.
