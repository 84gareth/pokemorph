POKÉMATHS & POKÉMORPH — GITHUB PAGES DEPLOYMENT KIT
====================================================

Each game is a self-contained folder of 5 files. Keep each game in its OWN
folder on your site — the service worker's scope is its folder, so they must
not share one.

WHICH FILES BELONG TO WHICH GAME
--------------------------------
pokemaths/            → the maths battle game (Ultra Ball icon)
    index.html        → the game itself (v20)
    sw.js             → service worker: makes the game fully playable offline
    manifest.json     → app name "PokéMaths", icon, standalone display
    icon.png          → 512px Ultra Ball app icon
    icon-192.png      → 192px version of the same icon

pokemorph/            → the word-building game (Poké Ball icon)
    index.html        → the game itself (v19)
    sw.js             → service worker for offline play
    manifest.json     → app name "PokéMorph", icon, standalone display
    icon.png          → 512px Poké Ball app icon
    icon-192.png      → 192px version of the same icon

HOW TO PUBLISH
--------------
1. In your GitHub Pages repo, create two folders: /pokemaths and /pokemorph.
2. Upload each game's 5 files into its folder (all filenames must stay as-is).
3. The games live at:
       https://84gareth.github.io/pokemaths/
       https://84gareth.github.io/pokemorph/
4. On the iPhone: open the URL in Safari, wait for it to load fully once,
   then Share → Add to Home Screen. You'll get the proper name (with the é)
   and the ball icon. After that first visit, both games work completely
   offline — sprites fill the cache as they're seen.

HOW TO UPDATE A GAME
--------------------
1. Replace that game's index.html with the new build.
2. Bump the version in TWO places:
   - index.html: the GAME_VERSION number near the bottom of the script
   - sw.js: the CACHE name at the top ('pokemaths-v1' → 'pokemaths-v2')
3. The little "v" number on the game's title screen (bottom-right) tells you
   which build a device is actually running — if it hasn't changed after an
   update, close the app fully and reopen it (the page itself is fetched
   network-first, so updates normally arrive on the next launch).

NOTES
-----
- Delete and re-add the Home Screen icon once after this deployment, so iOS
  picks up the new name and ball icon.
- The service worker only runs over https (GitHub Pages is fine) — opening
  the file directly from disk still works, just without offline support.
- For the nicest British female voice on iPhone: Settings → Accessibility →
  Spoken Content → Voices → English → English (UK) → download Kate or
  Serena. Both games find it automatically.
