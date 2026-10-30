# Serena · Prenatal Pilates

Plain HTML, CSS and JavaScript. No build step, no backend, no accounts.
Upload the whole folder to Vercel (or any static host) as it is.
The icon and manifest use root paths (`/icon-180.png`), so host it at the
root of its own domain, as Vercel does by default.

## Files

| File | What it does |
|---|---|
| `index.html` | App shell, PWA and Apple home-screen tags |
| `styles.css` | All styling (brand colours are the variables at the top) |
| `data.js` | **All content**: exercises, variations, workouts, tips, warning signs, interface text (EN + ES) |
| `app.js` | Navigation, player, voice guidance, music, saved preferences |
| `sw.js` | Offline support |
| `manifest.webmanifest`, `icon-180.png`, `icons/` | Installable app and iPhone home-screen icon |

## Before you sell it: content review

Every exercise, variation, spoken cue and tip in `data.js` is a draft.
Have a qualified prenatal Pilates instructor (ideally with a women's health
physiotherapist) review both languages, then add their name in
`CONFIG.reviewedBy` so it appears on the About screen.

## Adding recorded instructor audio

1. Record one MP3 per exercise version and language:
   - `audio/en/cat-cow.mp3` (no-equipment version)
   - `audio/es/cat-cow-ball.mp3` (Pilates ball version)
   - Equipment keys: `ball`, `band`, `ring`, `softball`
2. In `data.js`, set `CONFIG.recordedAudio = true`.

Any file that is missing falls back to the device voice automatically, and the
player tells the user.

## Adding videos and photos

Until videos are added, each exercise shows a breathing guide (a circle that
grows as she breathes in and softens as she breathes out) and the position.

- Exercise video: add `video: "video/cat-cow.mp4"` to an exercise (or to one
  of its variations in `v`). Short, silent, looping clips work best.
- Photos: set `CONFIG.images.hero`, `t1`, `t2`, `t3`, or `image` on a workout.
  Without them, the built-in illustrations are used.

## Voice guidance

Until recordings are added, the app uses the phone's own voice and picks the
most natural female voice available (European Spanish for ES). Quality depends
on the device: on iPhone, the "Enhanced" or "Premium" voices in
Settings › Accessibility › Spoken Content › Voices sound much better.

## Renaming

Change `CONFIG.appName` in `data.js`, the `<title>` and Apple title in
`index.html`, and `name` / `short_name` in `manifest.webmanifest`.
After any update, bump `VERSION` in `sw.js` so installed apps refresh.
