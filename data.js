/* =========================================================================
   Serena · Prenatal Pilates — content
   -------------------------------------------------------------------------
   IMPORTANT: every exercise, variation, cue and tip below is a DRAFT.
   It must be reviewed and signed off by a qualified prenatal Pilates
   instructor (and ideally a women's health physiotherapist) in BOTH
   languages before the app is sold or published.
   ========================================================================= */

const CONFIG = {
  appName: "Serena",
  tagline: { en: "Prenatal Pilates", es: "Pilates prenatal" },

  /* Recorded instructor audio. Set to true once you add MP3 files.
     File names: audio/en/<exercise-id>.mp3 for the no-equipment version,
     audio/en/<exercise-id>-<equipment>.mp3 for a variation
     (e.g. audio/es/chair-squat-ball.mp3). Missing files fall back to the
     device voice automatically. */
  recordedAudio: false,
  audioPath: (lang, exId, varKey) =>
    `audio/${lang}/${exId}${varKey && varKey !== "none" ? "-" + varKey : ""}.mp3`,

  /* Photography. Leave null to use the built-in illustrations, or add
     your own photos, e.g. hero: "images/hero.jpg". */
  images: { hero: null, t1: null, t2: null, t3: null },

  /* Shown in About once your content has been reviewed, e.g.
     "Ana López, Prenatal Pilates Instructor (Valencia)". */
  reviewedBy: null,

  getReadySeconds: 8
};

const EQUIPMENT = {
  none:     { en: "No equipment",     es: "Sin material" },
  mat:      { en: "Pilates mat",      es: "Esterilla" },
  ball:     { en: "Pilates ball",     es: "Fitball" },
  band:     { en: "Resistance band",  es: "Banda elástica" },
  ring:     { en: "Pilates ring",     es: "Aro de Pilates" },
  softball: { en: "Small soft ball",  es: "Pelota blanda pequeña" }
};

const TRIMESTERS = {
  1: {
    name: { en: "First Trimester", es: "Primer trimestre" },
    weeks: { en: "Weeks 1–13", es: "Semanas 1–13" },
    note: {
      en: "Tiredness and nausea are common now. Short sessions count, and rest days are part of the plan.",
      es: "El cansancio y las náuseas son habituales ahora. Las sesiones cortas cuentan y los días de descanso forman parte del plan."
    }
  },
  2: {
    name: { en: "Second Trimester", es: "Segundo trimestre" },
    weeks: { en: "Weeks 14–27", es: "Semanas 14–27" },
    note: {
      en: "From here on we avoid lying flat on your back. Workouts use seated, standing, side-lying and hands-and-knees positions.",
      es: "A partir de ahora evitamos tumbarnos boca arriba. Los entrenamientos usan posturas sentada, de pie, de lado y en cuadrupedia."
    }
  },
  3: {
    name: { en: "Third Trimester", es: "Tercer trimestre" },
    weeks: { en: "Weeks 28–40", es: "Semanas 28–40" },
    note: {
      en: "Comfort comes first. Keep support close for balance, move slowly and rest whenever you need to.",
      es: "La comodidad es lo primero. Ten un apoyo cerca para el equilibrio, muévete despacio y descansa siempre que lo necesites."
    }
  }
};

const CATEGORIES = {
  full:    { en: "Full Body Pilates",       es: "Pilates cuerpo completo" },
  stretch: { en: "Gentle Stretching",       es: "Estiramientos suaves" },
  back:    { en: "Back & Posture",          es: "Espalda y postura" },
  hips:    { en: "Hip Mobility",            es: "Movilidad de cadera" },
  pelvic:  { en: "Pelvic Floor Awareness",  es: "Conciencia del suelo pélvico" },
  breath:  { en: "Breathing & Relaxation",  es: "Respiración y relajación" },
  morning: { en: "Gentle Morning Movement", es: "Movimiento suave de mañana" }
};

const POSITIONS = {
  standing:  { en: "Standing, with a chair or wall nearby", es: "De pie, con una silla o pared cerca" },
  seated:    { en: "Seated", es: "Sentada" },
  allfours:  { en: "On hands and knees", es: "En cuadrupedia" },
  sidelying: { en: "Lying on your side", es: "Tumbada de lado" },
  kneeling:  { en: "Kneeling", es: "De rodillas" },
  supine:    { en: "Lying on your back (first trimester only)", es: "Boca arriba (solo primer trimestre)" }
};

/* -------------------------------------------------------------------------
   EXERCISES
   pos:  illustration (standing, seated, allfours, sidelying, kneeling, supine)
   tri:  trimesters where the exercise is offered
   swap: exercise used instead in other trimesters
   time: default seconds  ·  sides: speaks "change sides" halfway
   video: optional, e.g. "video/cat-cow.mp4" (or per variation)
   v:    variations — key = equipment needed ("none" = bodyweight)
   ------------------------------------------------------------------------- */
const EXERCISES = {
  "march": {
    pos: "standing", tri: [1, 2, 3], time: 60,
    name: { en: "Gentle Marching", es: "Marcha suave" },
    focus: { en: "Warm-up, circulation", es: "Calentamiento, circulación" },
    setup: { en: "Stand tall next to a chair, feet hip-width apart.", es: "Ponte de pie junto a una silla, con los pies al ancho de caderas." },
    breath: { en: "Breathe easily. You should be able to talk comfortably the whole time.", es: "Respira con facilidad. Debes poder hablar cómodamente en todo momento." },
    easier: { en: "Lift your heels only, keeping your toes on the floor.", es: "Eleva solo los talones, sin despegar las puntas del suelo." },
    safety: { en: "Hold the chair if your balance feels different today.", es: "Sujétate a la silla si hoy notas el equilibrio diferente." },
    v: [
      { key: "none", steps: {
        en: ["March slowly on the spot, lifting your knees to a comfortable height.", "Let your arms swing naturally.", "Keep your chest open and your shoulders relaxed.", "Stay at a pace where you can still chat."],
        es: ["Marcha despacio sin desplazarte, elevando las rodillas a una altura cómoda.", "Deja que los brazos se balanceen de forma natural.", "Mantén el pecho abierto y los hombros relajados.", "Mantén un ritmo que te permita seguir hablando."] } }
    ]
  },

  "rib-breathing": {
    pos: "seated", tri: [1, 2, 3], time: 60,
    name: { en: "360° Rib Breathing", es: "Respiración costal 360°" },
    focus: { en: "Breathing, calm", es: "Respiración, calma" },
    setup: { en: "Sit tall on your mat or a cushion, legs crossed or knees bent.", es: "Siéntate erguida sobre la esterilla o un cojín, con las piernas cruzadas o las rodillas flexionadas." },
    breath: { en: "Inhale through your nose into the sides and back of your ribs. Exhale slowly through your mouth.", es: "Inspira por la nariz hacia los lados y la espalda de las costillas. Espira despacio por la boca." },
    easier: { en: "Sit on a chair or lean your back against a wall.", es: "Siéntate en una silla o apoya la espalda en la pared." },
    safety: { en: "Never hold your breath. If you feel light-headed, return to your normal breathing.", es: "No contengas nunca la respiración. Si notas mareo, vuelve a tu respiración normal." },
    v: [
      { key: "none", steps: {
        en: ["Place your hands on the sides of your ribs.", "Breathe in through your nose and feel your ribs widen into your hands.", "Breathe out slowly through your mouth and feel your ribs soften.", "Keep your shoulders relaxed and your jaw soft."],
        es: ["Coloca las manos a los lados de las costillas.", "Inspira por la nariz y siente cómo las costillas se abren hacia tus manos.", "Espira despacio por la boca y siente cómo las costillas se relajan.", "Mantén los hombros relajados y la mandíbula suelta."] } },
      { key: "band", steps: {
        en: ["Wrap the band around your lower ribs and hold the ends crossed in front.", "Breathe in and gently widen your ribs into the band.", "Breathe out and let the band guide your ribs back in.", "Keep the band light. It is there for feedback, not resistance."],
        es: ["Rodea las costillas bajas con la banda y sujeta los extremos cruzados por delante.", "Inspira y expande suavemente las costillas contra la banda.", "Espira y deja que la banda acompañe a las costillas de vuelta.", "Mantén la banda ligera: es solo una referencia, no una resistencia."] } },
      { key: "ball", steps: {
        en: ["Sit on the Pilates ball with your feet wider than your hips, flat on the floor.", "Place your hands on your ribs.", "Breathe in wide into your ribs, then breathe out slowly.", "Keep the ball still and your feet grounded."],
        es: ["Siéntate en el fitball con los pies más separados que las caderas y bien apoyados.", "Coloca las manos sobre las costillas.", "Inspira llevando el aire a las costillas y espira despacio.", "Mantén la pelota quieta y los pies firmes en el suelo."] } }
    ]
  },

  "pelvic-floor-breath": {
    pos: "seated", tri: [1, 2, 3], time: 90,
    name: { en: "Pelvic Floor Breath Connection", es: "Respiración y suelo pélvico" },
    focus: { en: "Pelvic floor awareness", es: "Conciencia del suelo pélvico" },
    setup: { en: "Sit tall with your weight even on both sit bones.", es: "Siéntate erguida con el peso repartido sobre los dos isquiones." },
    breath: { en: "Inhale to let the pelvic floor soften and widen. Exhale to gently lift.", es: "Inspira dejando que el suelo pélvico se relaje y se abra. Espira para elevarlo suavemente." },
    easier: { en: "Focus only on the relaxing breath, without lifting.", es: "Céntrate solo en la respiración que relaja, sin elevar." },
    safety: { en: "The lift is gentle, around a third of your effort. Letting go fully is just as important. Stop if you feel pain or heaviness.", es: "La elevación es suave, alrededor de un tercio de tu esfuerzo. Soltar por completo es igual de importante. Para si notas dolor o pesadez." },
    v: [
      { key: "none", steps: {
        en: ["Breathe in and let your pelvic floor relax and widen.", "Breathe out and gently lift, as if picking up a blueberry with your pelvic floor.", "Breathe in and fully let go.", "Keep your glutes, thighs and shoulders relaxed."],
        es: ["Inspira y deja que el suelo pélvico se relaje y se abra.", "Espira y elévalo suavemente, como si recogieras un arándano con el suelo pélvico.", "Inspira y suelta por completo.", "Mantén glúteos, muslos y hombros relajados."] } },
      { key: "softball", steps: {
        en: ["Place the small soft ball between your knees.", "Breathe in and relax your pelvic floor.", "Breathe out, lightly hug the ball and gently lift your pelvic floor.", "Breathe in and release both completely."],
        es: ["Coloca la pelota blanda pequeña entre las rodillas.", "Inspira y relaja el suelo pélvico.", "Espira, abraza ligeramente la pelota y eleva suavemente el suelo pélvico.", "Inspira y suelta ambos por completo."] } },
      { key: "ball", steps: {
        en: ["Sit on the Pilates ball, feet flat and wide.", "Notice the ball supporting your pelvic floor.", "Breathe in to soften. Breathe out to gently lift away from the ball.", "Breathe in and relax back onto the ball."],
        es: ["Siéntate en el fitball con los pies apoyados y separados.", "Siente cómo la pelota sostiene tu suelo pélvico.", "Inspira para relajar. Espira para elevar suavemente, alejándote de la pelota.", "Inspira y vuelve a relajarte sobre la pelota."] } }
    ]
  },

  "pf-lift-release": {
    pos: "seated", tri: [1, 2, 3], time: 90,
    name: { en: "Lift & Fully Release", es: "Elevar y soltar por completo" },
    focus: { en: "Pelvic floor control", es: "Control del suelo pélvico" },
    setup: { en: "Sit tall on a chair or on your ball, feet flat on the floor.", es: "Siéntate erguida en una silla o en el fitball, con los pies apoyados en el suelo." },
    breath: { en: "Exhale to lift, inhale to release. Keep breathing throughout.", es: "Espira para elevar, inspira para soltar. Sigue respirando en todo momento." },
    easier: { en: "Hold for one second instead of three.", es: "Mantén un segundo en lugar de tres." },
    safety: { en: "Relaxing the pelvic floor matters as much as lifting it, especially as birth approaches. Stop if you feel pain.", es: "Relajar el suelo pélvico es tan importante como elevarlo, sobre todo al acercarse el parto. Para si notas dolor." },
    v: [
      { key: "none", steps: {
        en: ["Breathe out and gently lift your pelvic floor, holding for three seconds.", "Keep breathing. Never hold your breath.", "Breathe in and release completely for five seconds.", "Notice the difference between lifting and letting go."],
        es: ["Espira y eleva suavemente el suelo pélvico, manteniendo tres segundos.", "Sigue respirando. No contengas nunca la respiración.", "Inspira y suelta por completo durante cinco segundos.", "Nota la diferencia entre elevar y soltar."] } },
      { key: "ball", steps: {
        en: ["Sit on the Pilates ball with your feet wide.", "Breathe out and gently lift your pelvic floor away from the ball for three seconds.", "Breathe in and let it rest fully onto the ball for five seconds.", "Keep your upper body tall and soft."],
        es: ["Siéntate en el fitball con los pies separados.", "Espira y eleva suavemente el suelo pélvico alejándolo de la pelota durante tres segundos.", "Inspira y deja que descanse por completo sobre la pelota durante cinco segundos.", "Mantén la parte superior del cuerpo erguida y relajada."] } }
    ]
  },

  "cat-cow": {
    pos: "allfours", tri: [1, 2, 3], time: 60,
    name: { en: "Gentle Cat-Cow", es: "Gato-vaca suave" },
    focus: { en: "Spine mobility, back relief", es: "Movilidad de columna, alivio de espalda" },
    setup: { en: "Come to hands and knees, wrists under shoulders and knees under hips.", es: "Colócate en cuadrupedia, con las muñecas bajo los hombros y las rodillas bajo las caderas." },
    breath: { en: "Inhale to lengthen and gently open your chest. Exhale to round your back.", es: "Inspira para alargar y abrir suavemente el pecho. Espira para redondear la espalda." },
    easier: { en: "Place a folded towel under your knees, or rest on your forearms.", es: "Pon una toalla doblada bajo las rodillas o apóyate en los antebrazos." },
    safety: { en: "Keep the arch small. Let your belly hang naturally rather than pushing it down.", es: "Mantén el arco pequeño. Deja que la tripa cuelgue de forma natural, sin empujarla hacia abajo." },
    v: [
      { key: "none", steps: {
        en: ["Breathe in and gently lift your chest and tailbone, keeping your neck long.", "Breathe out and round your back, letting your head relax down.", "Move slowly, following your breath.", "Keep your arms long and your weight even."],
        es: ["Inspira y eleva suavemente el pecho y el coxis, con el cuello largo.", "Espira y redondea la espalda dejando caer la cabeza con suavidad.", "Muévete despacio, siguiendo la respiración.", "Mantén los brazos largos y el peso repartido."] } },
      { key: "ball", steps: {
        en: ["Kneel and rest your forearms on the Pilates ball in front of you.", "Breathe in and lengthen your spine.", "Breathe out and gently round, rolling the ball slightly towards you.", "Breathe in and roll the ball away as you lengthen again."],
        es: ["Arrodíllate y apoya los antebrazos sobre el fitball delante de ti.", "Inspira y alarga la columna.", "Espira y redondea suavemente, acercando un poco la pelota.", "Inspira y aleja la pelota mientras vuelves a alargar."] } }
    ]
  },

  "wall-pelvic-tilt": {
    pos: "standing", tri: [1, 2, 3], time: 60,
    name: { en: "Wall Pelvic Tilts", es: "Basculación pélvica en la pared" },
    focus: { en: "Lower back relief, posture", es: "Alivio lumbar, postura" },
    setup: { en: "Stand with your back against a wall, feet a small step forward and knees soft.", es: "Ponte de pie con la espalda en la pared, los pies un pequeño paso hacia delante y las rodillas sueltas." },
    breath: { en: "Exhale to tilt, inhale to return.", es: "Espira para bascular, inspira para volver." },
    easier: { en: "Do the same movement sitting on a chair.", es: "Haz el mismo movimiento sentada en una silla." },
    safety: { en: "Keep the movement small and comfortable.", es: "Mantén el movimiento pequeño y cómodo." },
    v: [
      { key: "none", steps: {
        en: ["Breathe out and gently bring your lower back towards the wall.", "Breathe in and return to your natural curve.", "Keep your shoulders and head resting on the wall.", "Let the movement come from your pelvis, not your legs."],
        es: ["Espira y acerca suavemente la zona lumbar a la pared.", "Inspira y vuelve a tu curva natural.", "Mantén los hombros y la cabeza apoyados en la pared.", "Deja que el movimiento salga de la pelvis, no de las piernas."] } },
      { key: "softball", steps: {
        en: ["Place the small soft ball between your lower back and the wall.", "Breathe out and gently press your lower back into the ball.", "Breathe in and release.", "Enjoy the gentle massage of the ball."],
        es: ["Coloca la pelota blanda entre la zona lumbar y la pared.", "Espira y presiona suavemente la zona lumbar contra la pelota.", "Inspira y suelta.", "Disfruta del suave masaje de la pelota."] } }
    ]
  },

  "bird-dog": {
    pos: "allfours", tri: [1, 2, 3], time: 60,
    name: { en: "Bird Dog Reach", es: "Brazo y pierna alternos" },
    focus: { en: "Back, glutes, balance", es: "Espalda, glúteos, equilibrio" },
    setup: { en: "Come to hands and knees with a long, neutral spine.", es: "Colócate en cuadrupedia con la columna larga y neutra." },
    breath: { en: "Exhale to reach, inhale to return.", es: "Espira para alargar, inspira para volver." },
    easier: { en: "Reach only an arm, or only a leg, sliding it along the floor.", es: "Alarga solo un brazo, o solo una pierna deslizándola por el suelo." },
    safety: { en: "Keep your hips level and avoid arching your back. Skip it if your belly forms a ridge or dome down the middle.", es: "Mantén las caderas niveladas y evita arquear la espalda. Sáltalo si en la tripa aparece una cresta o cúpula en el centro." },
    v: [
      { key: "none", steps: {
        en: ["Breathe out and slide one leg back, lifting it to hip height.", "If you feel steady, reach the opposite arm forward.", "Breathe in and return to hands and knees.", "Alternate sides slowly."],
        es: ["Espira y desliza una pierna hacia atrás, elevándola a la altura de la cadera.", "Si te sientes estable, alarga el brazo contrario hacia delante.", "Inspira y vuelve a cuadrupedia.", "Alterna los lados despacio."] } }
    ]
  },

  "bridge": {
    pos: "supine", tri: [1], swap: "standing-hip-extension", time: 60,
    name: { en: "Gentle Bridge", es: "Puente suave" },
    focus: { en: "Glutes, back of the legs", es: "Glúteos, parte posterior de las piernas" },
    setup: { en: "Lie on your back with knees bent and feet hip-width apart.", es: "Túmbate boca arriba con las rodillas flexionadas y los pies al ancho de caderas." },
    breath: { en: "Exhale to lift, inhale at the top, exhale to lower.", es: "Espira para elevar, inspira arriba, espira para bajar." },
    easier: { en: "Lift your hips only a few centimetres.", es: "Eleva la cadera solo unos centímetros." },
    safety: { en: "First trimester only. Later in pregnancy, lying on your back can make you dizzy, so this exercise is replaced with a standing one.", es: "Solo en el primer trimestre. Más adelante, estar boca arriba puede provocar mareo, así que este ejercicio se sustituye por uno de pie." },
    v: [
      { key: "none", steps: {
        en: ["Breathe out and lift your hips slowly, peeling your spine off the mat.", "Breathe in at the top, ribs soft.", "Breathe out and roll down one part of your spine at a time.", "Keep your knees in line with your feet."],
        es: ["Espira y eleva la cadera despacio, despegando la columna de la esterilla.", "Inspira arriba, con las costillas relajadas.", "Espira y baja vértebra a vértebra.", "Mantén las rodillas alineadas con los pies."] } },
      { key: "softball", steps: {
        en: ["Place the small soft ball between your knees.", "Breathe out, gently squeeze the ball and lift your hips.", "Breathe in at the top.", "Breathe out and roll down slowly, keeping the ball in place."],
        es: ["Coloca la pelota blanda entre las rodillas.", "Espira, aprieta suavemente la pelota y eleva la cadera.", "Inspira arriba.", "Espira y baja despacio, sin soltar la pelota."] } },
      { key: "ring", steps: {
        en: ["Place the Pilates ring between your knees.", "Breathe out, press gently into the ring and lift your hips.", "Breathe in at the top.", "Breathe out and roll down slowly."],
        es: ["Coloca el aro de Pilates entre las rodillas.", "Espira, presiona suavemente el aro y eleva la cadera.", "Inspira arriba.", "Espira y baja despacio."] } }
    ]
  },

  "standing-hip-extension": {
    pos: "standing", tri: [1, 2, 3], time: 80, sides: true,
    name: { en: "Standing Hip Extension", es: "Extensión de cadera de pie" },
    focus: { en: "Glutes, back of the legs", es: "Glúteos, parte posterior de las piernas" },
    setup: { en: "Stand facing a sturdy chair, holding the backrest with both hands.", es: "Ponte de pie frente a una silla firme, sujetando el respaldo con las dos manos." },
    breath: { en: "Exhale to reach back, inhale to return.", es: "Espira para llevar la pierna atrás, inspira para volver." },
    easier: { en: "Make the movement smaller and keep your toes touching the floor.", es: "Haz el movimiento más pequeño y mantén las puntas de los pies en contacto con el suelo." },
    safety: { en: "Keep your back long. Don’t arch your lower back to lift the leg higher.", es: "Mantén la espalda larga. No arquees la zona lumbar para elevar más la pierna." },
    v: [
      { key: "none", steps: {
        en: ["Shift your weight onto one leg, knee soft.", "Breathe out and reach the other leg back, gently squeezing your glute.", "Breathe in and bring it back to the start.", "Halfway through, change sides."],
        es: ["Lleva el peso a una pierna, con la rodilla suelta.", "Espira y lleva la otra pierna hacia atrás, activando suavemente el glúteo.", "Inspira y vuelve al inicio.", "A mitad de tiempo, cambia de lado."] } },
      { key: "band", steps: {
        en: ["Place the band around your lower legs, just above the ankles.", "Hold the chair and shift your weight onto one leg.", "Breathe out and reach the other leg back against the band.", "Breathe in to return. Halfway through, change sides."],
        es: ["Coloca la banda alrededor de la parte baja de las piernas, justo por encima de los tobillos.", "Sujeta la silla y lleva el peso a una pierna.", "Espira y lleva la otra pierna hacia atrás contra la banda.", "Inspira para volver. A mitad de tiempo, cambia de lado."] } }
    ]
  },

  "chair-squat": {
    pos: "standing", tri: [1, 2, 3], time: 60,
    name: { en: "Supported Squat", es: "Sentadilla con apoyo" },
    focus: { en: "Legs, glutes, birth preparation", es: "Piernas, glúteos, preparación al parto" },
    setup: { en: "Stand behind a sturdy chair, holding the backrest, feet hip-width apart.", es: "Colócate de pie detrás de una silla firme, sujetando el respaldo, con los pies al ancho de caderas." },
    breath: { en: "Inhale to lower, exhale to stand.", es: "Inspira para bajar, espira para subir." },
    easier: { en: "Make the squat smaller, or sit down onto a chair and stand up again.", es: "Haz la sentadilla más pequeña, o siéntate en una silla y vuelve a levantarte." },
    safety: { en: "Only go as low as feels comfortable for your knees and pelvis. Stop if you feel pain at the front of your pelvis.", es: "Baja solo hasta donde resulte cómodo para rodillas y pelvis. Para si notas dolor en la parte delantera de la pelvis." },
    v: [
      { key: "none", steps: {
        en: ["Breathe in and bend your knees, sending your hips back as if sitting down.", "Keep your chest open and your knees over your toes.", "Breathe out and press through your feet to stand tall.", "Keep holding the chair for balance."],
        es: ["Inspira y flexiona las rodillas llevando la cadera hacia atrás, como si fueras a sentarte.", "Mantén el pecho abierto y las rodillas sobre los pies.", "Espira y empuja el suelo para volver a estar de pie.", "Sigue sujetando la silla para mantener el equilibrio."] } },
      { key: "ball", steps: {
        en: ["Place the Pilates ball between your lower back and a wall.", "Walk your feet slightly forward, hip-width apart.", "Breathe in and bend your knees, letting the ball roll down the wall.", "Breathe out and press through your feet to come back up."],
        es: ["Coloca el fitball entre la zona lumbar y la pared.", "Adelanta un poco los pies, separados al ancho de caderas.", "Inspira y flexiona las rodillas dejando que la pelota ruede por la pared.", "Espira y empuja el suelo para volver a subir."] } },
      { key: "band", steps: {
        en: ["Place the band just above your knees with light tension.", "Hold the chair, breathe in and bend your knees, sending your hips back.", "Keep a gentle press outwards into the band.", "Breathe out and stand tall."],
        es: ["Coloca la banda justo por encima de las rodillas, con poca tensión.", "Sujeta la silla, inspira y flexiona las rodillas llevando la cadera atrás.", "Mantén una presión suave hacia fuera contra la banda.", "Espira y vuelve a estar de pie."] } }
    ]
  },

  "standing-side-leg": {
    pos: "standing", tri: [1, 2, 3], time: 80, sides: true,
    name: { en: "Standing Side Leg Lift", es: "Elevación lateral de pie" },
    focus: { en: "Outer hips, balance", es: "Cara externa de la cadera, equilibrio" },
    setup: { en: "Stand side-on to a chair, holding the backrest.", es: "Ponte de lado junto a una silla, sujetando el respaldo." },
    breath: { en: "Exhale to lift, inhale to lower.", es: "Espira para elevar, inspira para bajar." },
    easier: { en: "Lift your leg less and hold the chair with both hands.", es: "Eleva menos la pierna y sujeta la silla con las dos manos." },
    safety: { en: "Keep holding support. Your balance changes during pregnancy.", es: "Mantén siempre el apoyo. El equilibrio cambia durante el embarazo." },
    v: [
      { key: "none", steps: {
        en: ["Shift your weight onto the leg closest to the chair.", "Breathe out and lift your outside leg to the side, keeping your body tall.", "Breathe in and lower with control.", "Halfway through, turn around and change sides."],
        es: ["Lleva el peso a la pierna más cercana a la silla.", "Espira y eleva la otra pierna hacia el lado, manteniendo el cuerpo erguido.", "Inspira y baja con control.", "A mitad de tiempo, gírate y cambia de lado."] } },
      { key: "band", steps: {
        en: ["Place the band around your lower legs, just above the ankles.", "Hold the chair and shift your weight onto one leg.", "Breathe out and lift the other leg to the side against the band.", "Breathe in and lower slowly. Halfway through, change sides."],
        es: ["Coloca la banda alrededor de la parte baja de las piernas, justo por encima de los tobillos.", "Sujeta la silla y lleva el peso a una pierna.", "Espira y eleva la otra pierna hacia el lado contra la banda.", "Inspira y baja despacio. A mitad de tiempo, cambia de lado."] } }
    ]
  },

  "side-clam": {
    pos: "sidelying", tri: [1, 2, 3], time: 80, sides: true,
    name: { en: "Side-Lying Clam", es: "Almeja de lado" },
    focus: { en: "Hips, glutes, pelvic stability", es: "Caderas, glúteos, estabilidad pélvica" },
    setup: { en: "Lie on your side with a pillow under your head, knees bent and hips stacked.", es: "Túmbate de lado con un cojín bajo la cabeza, las rodillas flexionadas y las caderas una encima de otra." },
    breath: { en: "Exhale to open, inhale to close.", es: "Espira para abrir, inspira para cerrar." },
    easier: { en: "Place a pillow under your belly and keep the movement small.", es: "Pon un cojín bajo la tripa y haz el movimiento más pequeño." },
    safety: { en: "If you feel pain at your pubic bone, make the movement smaller or skip it.", es: "Si notas dolor en el pubis, reduce el movimiento o sáltalo." },
    v: [
      { key: "none", steps: {
        en: ["Keep your feet together.", "Breathe out and lift your top knee, keeping your hips still.", "Breathe in and lower slowly.", "Halfway through, change sides."],
        es: ["Mantén los pies juntos.", "Espira y eleva la rodilla de arriba, sin mover la cadera.", "Inspira y baja despacio.", "A mitad de tiempo, cambia de lado."] } },
      { key: "band", steps: {
        en: ["Place the band just above your knees.", "Breathe out and open your top knee against the band.", "Breathe in and close with control.", "Halfway through, change sides."],
        es: ["Coloca la banda justo por encima de las rodillas.", "Espira y abre la rodilla de arriba contra la banda.", "Inspira y cierra con control.", "A mitad de tiempo, cambia de lado."] } }
    ]
  },

  "side-leg-lift": {
    pos: "sidelying", tri: [1, 2, 3], time: 80, sides: true,
    name: { en: "Side-Lying Leg Lift", es: "Elevación de pierna de lado" },
    focus: { en: "Outer hips, glutes", es: "Cara externa de la cadera, glúteos" },
    setup: { en: "Lie on your side, bottom knee bent for support and top leg long.", es: "Túmbate de lado con la rodilla de abajo flexionada como apoyo y la pierna de arriba estirada." },
    breath: { en: "Exhale to lift, inhale to lower.", es: "Espira para elevar, inspira para bajar." },
    easier: { en: "Bend your top knee and lift less.", es: "Flexiona la rodilla de arriba y eleva menos." },
    safety: { en: "Keep the movement small and controlled. Stop if you feel pelvic or groin pain.", es: "Mantén el movimiento pequeño y controlado. Para si notas dolor en la pelvis o la ingle." },
    v: [
      { key: "none", steps: {
        en: ["Reach your top leg long, toes pointing forward.", "Breathe out and lift the leg to hip height.", "Breathe in and lower slowly.", "Halfway through, change sides."],
        es: ["Alarga la pierna de arriba con los dedos mirando al frente.", "Espira y eleva la pierna hasta la altura de la cadera.", "Inspira y baja despacio.", "A mitad de tiempo, cambia de lado."] } },
      { key: "ring", steps: {
        en: ["Rest the Pilates ring on the floor in front of your belly and hold it with your top hand for support.", "Reach your top leg long.", "Breathe out and lift the leg to hip height.", "Breathe in and lower slowly. Halfway through, change sides."],
        es: ["Apoya el aro de Pilates en el suelo delante de la tripa y sujétalo con la mano de arriba como apoyo.", "Alarga la pierna de arriba.", "Espira y eleva la pierna hasta la altura de la cadera.", "Inspira y baja despacio. A mitad de tiempo, cambia de lado."] } }
    ]
  },

  "arm-openings": {
    pos: "seated", tri: [1, 2, 3], time: 60,
    name: { en: "Arm Openings", es: "Apertura de brazos" },
    focus: { en: "Upper back, posture", es: "Espalda alta, postura" },
    setup: { en: "Sit tall on a chair, ball or cushion, arms reaching forward at chest height.", es: "Siéntate erguida en una silla, fitball o cojín, con los brazos al frente a la altura del pecho." },
    breath: { en: "Exhale to open or press, inhale to return.", es: "Espira para abrir o presionar, inspira para volver." },
    easier: { en: "Bend your elbows and keep the movement smaller.", es: "Flexiona los codos y haz el movimiento más pequeño." },
    safety: { en: "Keep your ribs soft and avoid arching your back.", es: "Mantén las costillas relajadas y evita arquear la espalda." },
    v: [
      { key: "none", steps: {
        en: ["Breathe out and open your arms wide, drawing your shoulder blades gently together.", "Breathe in and bring your arms back to the front.", "Keep your shoulders away from your ears.", "Move smoothly with your breath."],
        es: ["Espira y abre los brazos, acercando suavemente las escápulas.", "Inspira y vuelve a llevar los brazos al frente.", "Mantén los hombros lejos de las orejas.", "Muévete con fluidez, siguiendo la respiración."] } },
      { key: "band", steps: {
        en: ["Hold the band with both hands, arms forward, with slight tension.", "Breathe out and pull the band apart, opening your chest.", "Breathe in and return with control.", "Choose a light band. Quality matters more than effort."],
        es: ["Sujeta la banda con las dos manos, brazos al frente y un poco de tensión.", "Espira y separa la banda, abriendo el pecho.", "Inspira y vuelve con control.", "Elige una banda suave. La calidad importa más que el esfuerzo."] } },
      { key: "ring", steps: {
        en: ["Hold the Pilates ring in front of your chest between your palms.", "Breathe out and gently squeeze the ring.", "Breathe in and release slowly.", "Keep your elbows soft and your shoulders relaxed."],
        es: ["Sujeta el aro de Pilates delante del pecho, entre las palmas.", "Espira y presiona suavemente el aro.", "Inspira y suelta despacio.", "Mantén los codos sueltos y los hombros relajados."] } },
      { key: "softball", steps: {
        en: ["Hold the small soft ball between your palms in front of your chest.", "Breathe out and press your palms gently together.", "Breathe in and release.", "Keep your neck long and your shoulders down."],
        es: ["Sujeta la pelota blanda entre las palmas, delante del pecho.", "Espira y presiona suavemente las palmas entre sí.", "Inspira y suelta.", "Mantén el cuello largo y los hombros bajos."] } }
    ]
  },

  "inner-thigh": {
    pos: "seated", tri: [1, 2, 3], time: 60,
    name: { en: "Seated Inner Thigh Squeeze", es: "Aductores sentada" },
    focus: { en: "Inner thighs, pelvic stability", es: "Aductores, estabilidad pélvica" },
    setup: { en: "Sit tall on a chair with your feet flat and knees hip-width apart.", es: "Siéntate erguida en una silla con los pies apoyados y las rodillas al ancho de caderas." },
    breath: { en: "Exhale to squeeze, inhale to release.", es: "Espira para apretar, inspira para soltar." },
    easier: { en: "Squeeze more gently and for a shorter time.", es: "Aprieta con más suavidad y durante menos tiempo." },
    safety: { en: "Stop if you feel pain at your pubic bone, at the front of the pelvis.", es: "Para si notas dolor en el pubis, en la parte delantera de la pelvis." },
    v: [
      { key: "none", steps: {
        en: ["Place your fists between your knees.", "Breathe out and gently press your knees into your fists.", "Breathe in and release.", "Keep your back tall and let your pelvic floor relax on each inhale."],
        es: ["Coloca los puños entre las rodillas.", "Espira y presiona suavemente las rodillas contra los puños.", "Inspira y suelta.", "Mantén la espalda erguida y relaja el suelo pélvico en cada inspiración."] } },
      { key: "ring", steps: {
        en: ["Place the Pilates ring between your knees.", "Breathe out and squeeze the ring gently.", "Breathe in and release slowly.", "Use about half your strength."],
        es: ["Coloca el aro de Pilates entre las rodillas.", "Espira y aprieta suavemente el aro.", "Inspira y suelta despacio.", "Usa más o menos la mitad de tu fuerza."] } },
      { key: "softball", steps: {
        en: ["Place the small soft ball between your knees.", "Breathe out and squeeze gently.", "Breathe in and release.", "Keep the movement soft and steady."],
        es: ["Coloca la pelota blanda pequeña entre las rodillas.", "Espira y aprieta suavemente.", "Inspira y suelta.", "Mantén el movimiento suave y constante."] } }
    ]
  },

  "hip-circles": {
    pos: "standing", tri: [1, 2, 3], time: 60,
    name: { en: "Hip Circles", es: "Círculos de cadera" },
    focus: { en: "Hip mobility, lower back", es: "Movilidad de cadera, zona lumbar" },
    setup: { en: "Stand with your feet wider than your hips, knees soft, hands on your hips.", es: "Ponte de pie con los pies más separados que las caderas, las rodillas sueltas y las manos en la cadera." },
    breath: { en: "Breathe slowly and naturally.", es: "Respira de forma lenta y natural." },
    easier: { en: "Make smaller circles while holding a chair.", es: "Haz círculos más pequeños sujetándote a una silla." },
    safety: { en: "Keep the movement slow and smooth. Avoid jerky or very large circles.", es: "Mantén el movimiento lento y fluido. Evita los círculos bruscos o muy amplios." },
    v: [
      { key: "none", steps: {
        en: ["Begin to draw slow circles with your hips.", "Keep your upper body steady and your knees soft.", "After a few circles, change direction.", "Let it feel soothing, like a gentle sway."],
        es: ["Empieza a dibujar círculos lentos con la cadera.", "Mantén la parte superior del cuerpo estable y las rodillas sueltas.", "Tras unos círculos, cambia de dirección.", "Deja que se sienta relajante, como un balanceo suave."] } },
      { key: "ball", steps: {
        en: ["Sit on the Pilates ball with your feet wide and flat.", "Draw slow circles with your hips, letting the ball roll beneath you.", "Keep your upper body tall and steady.", "After a few circles, change direction."],
        es: ["Siéntate en el fitball con los pies separados y bien apoyados.", "Dibuja círculos lentos con la cadera, dejando que la pelota ruede bajo ti.", "Mantén la parte superior del cuerpo erguida y estable.", "Tras unos círculos, cambia de dirección."] } }
    ]
  },

  "hip-flexor": {
    pos: "kneeling", tri: [1, 2, 3], time: 80, sides: true,
    name: { en: "Kneeling Hip Flexor Stretch", es: "Estiramiento de flexores de cadera" },
    focus: { en: "Front of the hips", es: "Parte delantera de la cadera" },
    setup: { en: "Kneel on a cushion with one foot forward, holding a chair for support.", es: "Arrodíllate sobre un cojín con un pie adelantado, sujetándote a una silla." },
    breath: { en: "Breathe slowly and let each exhale soften the stretch.", es: "Respira despacio y deja que cada espiración suavice el estiramiento." },
    easier: { en: "Do it standing, in a small lunge, holding a chair.", es: "Hazlo de pie, en una zancada pequeña, sujetándote a una silla." },
    safety: { en: "A gentle stretch only. Pregnancy hormones make your joints more mobile, so never push to your limit.", es: "Solo un estiramiento suave. Las hormonas del embarazo aumentan la movilidad articular, así que no llegues nunca a tu límite." },
    v: [
      { key: "none", steps: {
        en: ["Gently tuck your tailbone under.", "Shift your weight slightly forward until you feel a gentle stretch at the front of your back hip.", "Stay here and breathe slowly.", "Halfway through, change sides."],
        es: ["Mete suavemente el coxis hacia dentro.", "Lleva el peso un poco hacia delante hasta notar un estiramiento suave en la parte delantera de la cadera de atrás.", "Quédate aquí respirando despacio.", "A mitad de tiempo, cambia de lado."] } }
    ]
  },

  "figure-four": {
    pos: "seated", tri: [1, 2, 3], time: 80, sides: true,
    name: { en: "Seated Figure-Four Stretch", es: "Estiramiento en cuatro sentada" },
    focus: { en: "Glutes, outer hips", es: "Glúteos, cara externa de la cadera" },
    setup: { en: "Sit tall on a chair with both feet flat.", es: "Siéntate erguida en una silla con los dos pies apoyados." },
    breath: { en: "Breathe slowly into the stretch.", es: "Respira despacio hacia el estiramiento." },
    easier: { en: "Rest your foot lower down on your shin instead of your knee.", es: "Apoya el pie más abajo, sobre la espinilla, en lugar de en la rodilla." },
    safety: { en: "If your belly gets in the way, stay upright and skip the lean.", es: "Si la tripa te molesta, quédate erguida y no te inclines." },
    v: [
      { key: "none", steps: {
        en: ["Place your right ankle on your left knee.", "Sit tall and, if comfortable, lean forward a little with a long back.", "Breathe into the stretch in your right hip.", "Halfway through, change sides."],
        es: ["Coloca el tobillo derecho sobre la rodilla izquierda.", "Siéntate erguida y, si te resulta cómodo, inclínate un poco hacia delante con la espalda larga.", "Respira hacia el estiramiento de la cadera derecha.", "A mitad de tiempo, cambia de lado."] } }
    ]
  },

  "mermaid": {
    pos: "seated", tri: [1, 2, 3], time: 80, sides: true,
    name: { en: "Mermaid Side Stretch", es: "Estiramiento sirena" },
    focus: { en: "Side body, room to breathe", es: "Costados, espacio para respirar" },
    setup: { en: "Sit cross-legged or on a cushion with a tall spine.", es: "Siéntate con las piernas cruzadas o sobre un cojín, con la columna erguida." },
    breath: { en: "Inhale to reach up, exhale to bend.", es: "Inspira para alargar hacia arriba, espira para inclinarte." },
    easier: { en: "Keep your hand on your head instead of reaching up.", es: "Deja la mano sobre la cabeza en lugar de alargar el brazo." },
    safety: { en: "Bend to the side only. Avoid twisting or leaning back.", es: "Inclínate solo hacia el lado. Evita girar o echarte hacia atrás." },
    v: [
      { key: "none", steps: {
        en: ["Place one hand on the floor beside you.", "Breathe in and reach the other arm up.", "Breathe out and gently bend towards the hand on the floor.", "Breathe in to come up. Halfway through, change sides."],
        es: ["Apoya una mano en el suelo a tu lado.", "Inspira y alarga el otro brazo hacia arriba.", "Espira e inclínate suavemente hacia la mano del suelo.", "Inspira para volver. A mitad de tiempo, cambia de lado."] } },
      { key: "ball", steps: {
        en: ["Sit with the Pilates ball beside you, one hand resting on top.", "Breathe in and reach your other arm up.", "Breathe out and roll the ball away as you bend to the side.", "Breathe in to return. Halfway through, change sides."],
        es: ["Siéntate con el fitball a tu lado y una mano apoyada encima.", "Inspira y alarga el otro brazo hacia arriba.", "Espira y aleja la pelota rodando mientras te inclinas hacia el lado.", "Inspira para volver. A mitad de tiempo, cambia de lado."] } }
    ]
  },

  "thread-needle": {
    pos: "allfours", tri: [1, 2, 3], time: 80, sides: true,
    name: { en: "Thread the Needle", es: "Enhebrar la aguja" },
    focus: { en: "Upper back, shoulders", es: "Espalda alta, hombros" },
    setup: { en: "Come to hands and knees.", es: "Colócate en cuadrupedia." },
    breath: { en: "Exhale to thread through, inhale to open.", es: "Espira para pasar el brazo, inspira para abrir." },
    easier: { en: "Rest your forehead on a cushion at the bottom of the movement.", es: "Apoya la frente en un cojín al final del movimiento." },
    safety: { en: "Rotate through your upper back only. Keep your hips and belly steady.", es: "Gira solo desde la espalda alta. Mantén la cadera y la tripa estables." },
    v: [
      { key: "none", steps: {
        en: ["Breathe in and open one arm up towards the ceiling.", "Breathe out and slide that arm under the opposite one, resting your shoulder gently down.", "Breathe in and open again.", "Halfway through, change sides."],
        es: ["Inspira y abre un brazo hacia el techo.", "Espira y pasa ese brazo por debajo del otro, apoyando suavemente el hombro.", "Inspira y vuelve a abrir.", "A mitad de tiempo, cambia de lado."] } }
    ]
  },

  "chest-opener": {
    pos: "standing", tri: [1, 2, 3], time: 60, sides: true,
    name: { en: "Wall Chest Opener", es: "Apertura de pecho en la pared" },
    focus: { en: "Chest, posture", es: "Pecho, postura" },
    setup: { en: "Stand side-on to a wall and place your forearm on it at shoulder height.", es: "Ponte de lado junto a una pared y apoya el antebrazo a la altura del hombro." },
    breath: { en: "Breathe slowly into the front of your chest.", es: "Respira despacio hacia la parte delantera del pecho." },
    easier: { en: "Take a smaller step for a gentler stretch.", es: "Da un paso más pequeño para un estiramiento más suave." },
    safety: { en: "A gentle stretch only. Ease off if you feel tingling in your arm or hand.", es: "Solo un estiramiento suave. Afloja si notas hormigueo en el brazo o la mano." },
    v: [
      { key: "none", steps: {
        en: ["Step forward with the leg closest to the wall.", "Gently turn your chest away from the wall until you feel a stretch.", "Breathe slowly and keep your shoulder relaxed.", "Halfway through, change sides."],
        es: ["Da un paso adelante con la pierna más cercana a la pared.", "Gira suavemente el pecho alejándolo de la pared hasta notar el estiramiento.", "Respira despacio y mantén el hombro relajado.", "A mitad de tiempo, cambia de lado."] } },
      { key: "band", sides: false, steps: {
        en: ["Hold the band behind you with both hands, a little wider than your hips.", "Breathe in and gently draw your shoulders back and down.", "Feel your chest open without arching your back.", "Breathe out and relax. Repeat slowly."],
        es: ["Sujeta la banda por detrás con las dos manos, algo más abiertas que la cadera.", "Inspira y lleva suavemente los hombros hacia atrás y abajo.", "Siente cómo se abre el pecho sin arquear la espalda.", "Espira y relaja. Repite despacio."] } }
    ]
  },

  "calf-raises": {
    pos: "standing", tri: [1, 2, 3], time: 60,
    name: { en: "Supported Calf Raises", es: "Elevación de talones con apoyo" },
    focus: { en: "Circulation, ankles, balance", es: "Circulación, tobillos, equilibrio" },
    setup: { en: "Stand holding a chair, feet hip-width apart.", es: "Ponte de pie sujetando una silla, con los pies al ancho de caderas." },
    breath: { en: "Exhale to rise, inhale to lower.", es: "Espira para subir, inspira para bajar." },
    easier: { en: "Sit on a chair and lift your heels.", es: "Siéntate en una silla y eleva los talones." },
    safety: { en: "Hold support at all times. If one calf is painful, swollen or red, stop and contact your healthcare provider.", es: "Mantén siempre el apoyo. Si una pantorrilla está dolorida, hinchada o enrojecida, para y contacta con tu profesional sanitario." },
    v: [
      { key: "none", steps: {
        en: ["Breathe out and rise slowly onto the balls of your feet.", "Breathe in and lower your heels with control.", "Keep your weight centred over your big toes.", "Stay tall through your spine."],
        es: ["Espira y sube despacio sobre las puntas de los pies.", "Inspira y baja los talones con control.", "Mantén el peso centrado sobre los dedos gordos.", "Mantén la columna erguida."] } },
      { key: "softball", steps: {
        en: ["Place the small soft ball between your ankles.", "Breathe out and rise onto your toes, gently hugging the ball.", "Breathe in and lower slowly.", "Keep holding the chair."],
        es: ["Coloca la pelota blanda entre los tobillos.", "Espira y sube a las puntas, abrazando suavemente la pelota.", "Inspira y baja despacio.", "Sigue sujetando la silla."] } }
    ]
  },

  "neck-release": {
    pos: "seated", tri: [1, 2, 3], time: 60,
    name: { en: "Neck & Shoulder Release", es: "Liberación de cuello y hombros" },
    focus: { en: "Tension relief", es: "Alivio de tensión" },
    setup: { en: "Sit tall with your shoulders relaxed.", es: "Siéntate erguida con los hombros relajados." },
    breath: { en: "Slow, easy breathing.", es: "Respiración lenta y tranquila." },
    easier: { en: "Do the shoulder rolls only.", es: "Haz solo los círculos de hombros." },
    safety: { en: "Move slowly and avoid rolling your head all the way back.", es: "Muévete despacio y evita llevar la cabeza del todo hacia atrás." },
    v: [
      { key: "none", steps: {
        en: ["Roll your shoulders slowly backwards a few times.", "Gently tilt your right ear towards your right shoulder and breathe.", "Return to centre and tilt to the left.", "Finish with a slow nod, chin towards your chest."],
        es: ["Haz unos círculos lentos con los hombros hacia atrás.", "Inclina suavemente la oreja derecha hacia el hombro derecho y respira.", "Vuelve al centro e inclina hacia la izquierda.", "Termina con un asentimiento lento, llevando la barbilla hacia el pecho."] } }
    ]
  },

  "child-pose": {
    pos: "kneeling", tri: [1, 2, 3], time: 60,
    name: { en: "Wide-Knee Child’s Pose", es: "Postura del niño con rodillas abiertas" },
    focus: { en: "Lower back, relaxation", es: "Zona lumbar, relajación" },
    setup: { en: "Kneel with your big toes together and knees wide, making space for your belly.", es: "Arrodíllate con los dedos gordos juntos y las rodillas abiertas, dejando espacio para la tripa." },
    breath: { en: "Breathe into your back and ribs.", es: "Respira hacia la espalda y las costillas." },
    easier: { en: "Rest your forearms on a chair seat or a stack of cushions.", es: "Apoya los antebrazos en el asiento de una silla o en varios cojines." },
    safety: { en: "Keep your knees wide enough that nothing presses on your belly. Come up slowly to avoid dizziness.", es: "Abre las rodillas lo suficiente para que nada presione la tripa. Sube despacio para evitar mareos." },
    v: [
      { key: "none", steps: {
        en: ["Walk your hands forward and lower your chest towards the floor.", "Rest your forehead on your hands or a cushion.", "Breathe slowly into your back and ribs.", "Let your whole body soften."],
        es: ["Camina con las manos hacia delante y acerca el pecho al suelo.", "Apoya la frente en las manos o en un cojín.", "Respira despacio hacia la espalda y las costillas.", "Deja que todo el cuerpo se suelte."] } },
      { key: "ball", steps: {
        en: ["Place the Pilates ball in front of you.", "Rest your arms and head on the ball.", "Let your hips sink back towards your heels.", "Breathe slowly, swaying gently side to side if it feels good."],
        es: ["Coloca el fitball delante de ti.", "Apoya los brazos y la cabeza sobre la pelota.", "Deja que la cadera baje hacia los talones.", "Respira despacio y balancéate suavemente de lado a lado si te sienta bien."] } }
    ]
  },

  "side-rest": {
    pos: "sidelying", tri: [1, 2, 3], time: 90,
    name: { en: "Side-Lying Rest & Breath", es: "Descanso de lado y respiración" },
    focus: { en: "Relaxation", es: "Relajación" },
    setup: { en: "Lie on your left side with pillows under your head, between your knees and under your belly.", es: "Túmbate sobre el lado izquierdo con cojines bajo la cabeza, entre las rodillas y bajo la tripa." },
    breath: { en: "Breathe in for four, out for six.", es: "Inspira en cuatro tiempos y espira en seis." },
    easier: { en: "If lying down isn’t comfortable, sit supported in a chair with your feet up.", es: "Si tumbarte no te resulta cómodo, siéntate con apoyo en una silla y con los pies elevados." },
    safety: { en: "Afterwards, rise slowly. Pause sitting up before you stand.", es: "Al terminar, levántate despacio. Haz una pausa sentada antes de ponerte de pie." },
    v: [
      { key: "none", steps: {
        en: ["Close your eyes or soften your gaze.", "Breathe in for a count of four.", "Breathe out for a count of six.", "Let your shoulders, jaw and hands relax completely."],
        es: ["Cierra los ojos o suaviza la mirada.", "Inspira contando hasta cuatro.", "Espira contando hasta seis.", "Deja que los hombros, la mandíbula y las manos se relajen por completo."] } }
    ]
  }
};

/* -------------------------------------------------------------------------
   WORKOUTS — items: [exerciseId, seconds]
   ------------------------------------------------------------------------- */
const WORKOUTS = [
  {
    id: "morning-10", cat: "morning", tri: [1, 2, 3], level: "gentle", image: null,
    name: { en: "10-Minute Gentle Morning Pilates", es: "Pilates suave de mañana, 10 minutos" },
    desc: { en: "Wake up your spine, hips and breath with an easy standing and seated flow.", es: "Despierta la columna, las caderas y la respiración con una secuencia suave de pie y sentada." },
    items: [["march", 90], ["rib-breathing", 60], ["cat-cow", 60], ["wall-pelvic-tilt", 60], ["mermaid", 80], ["chest-opener", 60], ["calf-raises", 60], ["neck-release", 90]]
  },
  {
    id: "full-body-15", cat: "full", tri: [1, 2, 3], level: "beginner", image: null,
    name: { en: "15-Minute Full Body Prenatal Pilates", es: "Pilates prenatal cuerpo completo, 15 minutos" },
    desc: { en: "A balanced session for your whole body: breath, back, hips, legs and arms.", es: "Una sesión equilibrada para todo el cuerpo: respiración, espalda, caderas, piernas y brazos." },
    items: [["march", 60], ["rib-breathing", 60], ["cat-cow", 60], ["bird-dog", 60], ["bridge", 60], ["side-clam", 80], ["arm-openings", 60], ["inner-thigh", 60], ["chair-squat", 60], ["mermaid", 80], ["child-pose", 60], ["side-rest", 90]]
  },
  {
    id: "hips-20", cat: "hips", tri: [1, 2, 3], level: "gentle", image: null,
    name: { en: "20-Minute Hip Mobility", es: "Movilidad de cadera, 20 minutos" },
    desc: { en: "Release tight hips and build gentle strength around your pelvis.", es: "Libera la tensión de las caderas y fortalece suavemente la zona de la pelvis." },
    items: [["march", 60], ["rib-breathing", 60], ["hip-circles", 60], ["cat-cow", 60], ["side-clam", 80], ["side-leg-lift", 80], ["hip-flexor", 80], ["figure-four", 80], ["chair-squat", 60], ["standing-side-leg", 80], ["inner-thigh", 60], ["mermaid", 80], ["thread-needle", 80], ["child-pose", 60], ["side-rest", 120]]
  },
  {
    id: "back-15", cat: "back", tri: [1, 2, 3], level: "gentle", image: null,
    name: { en: "15-Minute Back Relief & Posture", es: "Alivio de espalda y postura, 15 minutos" },
    desc: { en: "Ease your back and open your chest as your posture changes.", es: "Alivia la espalda y abre el pecho mientras tu postura cambia." },
    items: [["rib-breathing", 60], ["neck-release", 60], ["wall-pelvic-tilt", 60], ["cat-cow", 60], ["thread-needle", 80], ["bird-dog", 60], ["arm-openings", 60], ["chest-opener", 60], ["mermaid", 80], ["figure-four", 80], ["child-pose", 60], ["side-rest", 90]]
  },
  {
    id: "breath-10", cat: "breath", tri: [1, 2, 3], level: "gentle", image: null,
    name: { en: "10-Minute Breathing & Relaxation", es: "Respiración y relajación, 10 minutos" },
    desc: { en: "Slow breathing and supported rest to calm your mind and body.", es: "Respiración lenta y descanso con apoyo para calmar mente y cuerpo." },
    items: [["rib-breathing", 90], ["pelvic-floor-breath", 90], ["neck-release", 60], ["mermaid", 80], ["child-pose", 90], ["side-rest", 150]]
  },
  {
    id: "stretch-15", cat: "stretch", tri: [1, 2, 3], level: "gentle", image: null,
    name: { en: "15-Minute Gentle Stretching", es: "Estiramientos suaves, 15 minutos" },
    desc: { en: "Supported stretches that never push. Comfort leads every movement.", es: "Estiramientos con apoyo que nunca fuerzan. La comodidad guía cada movimiento." },
    items: [["neck-release", 60], ["wall-pelvic-tilt", 60], ["hip-circles", 60], ["cat-cow", 60], ["mermaid", 80], ["thread-needle", 80], ["hip-flexor", 80], ["figure-four", 80], ["chest-opener", 60], ["child-pose", 90], ["side-rest", 120]]
  },
  {
    id: "pelvic-10", cat: "pelvic", tri: [1, 2, 3], level: "gentle", image: null,
    name: { en: "10-Minute Pelvic Floor Awareness", es: "Conciencia del suelo pélvico, 10 minutos" },
    desc: { en: "Connect your breath with your pelvic floor: lifting and, just as importantly, letting go.", es: "Conecta la respiración con el suelo pélvico: elevar y, igual de importante, soltar." },
    items: [["rib-breathing", 60], ["pelvic-floor-breath", 90], ["pf-lift-release", 90], ["inner-thigh", 60], ["hip-circles", 60], ["cat-cow", 60], ["child-pose", 60], ["side-rest", 60]]
  },
  {
    id: "strength-20", cat: "full", tri: [1, 2], level: "moderate", image: null,
    name: { en: "20-Minute Prenatal Strength Flow", es: "Fuerza prenatal, 20 minutos" },
    desc: { en: "A longer flow for days when you feel energetic. Keep it at a pace where you can still talk.", es: "Una secuencia más larga para los días con energía. Mantén un ritmo que te permita seguir hablando." },
    items: [["march", 60], ["rib-breathing", 60], ["cat-cow", 60], ["bird-dog", 90], ["bridge", 60], ["chair-squat", 90], ["standing-side-leg", 80], ["side-clam", 80], ["side-leg-lift", 80], ["arm-openings", 90], ["inner-thigh", 60], ["calf-raises", 60], ["mermaid", 80], ["child-pose", 60], ["side-rest", 60]]
  },
  {
    id: "third-ease-15", cat: "full", tri: [3], level: "gentle", image: null, tone: "shell", pose: "seated",
    name: { en: "15-Minute Third Trimester Ease", es: "Bienestar en el tercer trimestre, 15 minutos" },
    desc: { en: "Comfort-first movement for the final weeks, using only seated, standing and side-lying positions.", es: "Movimiento centrado en la comodidad para las últimas semanas, solo sentada, de pie y de lado." },
    items: [["rib-breathing", 60], ["pelvic-floor-breath", 60], ["hip-circles", 60], ["wall-pelvic-tilt", 60], ["side-clam", 80], ["chair-squat", 60], ["arm-openings", 60], ["mermaid", 80], ["figure-four", 80], ["child-pose", 60], ["side-rest", 150]]
  }
];

/* -------------------------------------------------------------------------
   PREGNANCY TIPS
   ------------------------------------------------------------------------- */
const TIPS = [
  {
    id: "breathing",
    title: { en: "Breathing during Pilates", es: "La respiración en Pilates" },
    intro: { en: "Your breath leads every movement. It calms your nervous system and supports your core and pelvic floor.", es: "La respiración guía cada movimiento. Calma el sistema nervioso y acompaña al core y al suelo pélvico." },
    points: {
      en: ["Breathe in through your nose, wide into your ribs.", "Breathe out through your mouth during the effort part of each exercise.", "Never hold your breath or strain. If you can’t talk, slow down."],
      es: ["Inspira por la nariz, llevando el aire a las costillas.", "Espira por la boca en la fase de esfuerzo de cada ejercicio.", "No contengas la respiración ni hagas fuerza excesiva. Si no puedes hablar, baja el ritmo."]
    }
  },
  {
    id: "posture",
    title: { en: "Posture during pregnancy", es: "La postura en el embarazo" },
    intro: { en: "As your belly grows, your centre of gravity moves forward and your lower back often takes the strain.", es: "A medida que crece la tripa, tu centro de gravedad se desplaza hacia delante y la zona lumbar suele sufrir." },
    points: {
      en: ["Stand with your weight spread evenly between heels and toes.", "Imagine your ribs stacked over your pelvis rather than leaning back.", "Change position often during the day, and sit with your back supported."],
      es: ["Reparte el peso por igual entre talones y puntas.", "Imagina las costillas apiladas sobre la pelvis, sin echarte hacia atrás.", "Cambia de postura a menudo durante el día y siéntate con la espalda apoyada."]
    }
  },
  {
    id: "comfort",
    title: { en: "Staying comfortable while exercising", es: "Comodidad al hacer ejercicio" },
    intro: { en: "Pregnancy is a time to maintain and enjoy movement, not to push for new personal bests.", es: "El embarazo es un momento para mantener y disfrutar del movimiento, no para batir récords." },
    points: {
      en: ["Drink water before and after, and keep a bottle close.", "Exercise in a cool, airy room and avoid overheating.", "From the second trimester, avoid lying flat on your back for long. Use side-lying or propped-up positions instead."],
      es: ["Bebe agua antes y después, y ten una botella cerca.", "Haz ejercicio en una habitación fresca y ventilada, y evita acalorarte.", "Desde el segundo trimestre, evita estar mucho tiempo boca arriba. Usa posturas de lado o incorporada."]
    }
  },
  {
    id: "pelvic-floor",
    title: { en: "Pelvic floor awareness", es: "Conciencia del suelo pélvico" },
    intro: { en: "Your pelvic floor supports your baby, bladder and bowel. It needs to lift and also to let go fully.", es: "El suelo pélvico sostiene al bebé, la vejiga y el intestino. Necesita saber elevarse y también soltarse del todo." },
    points: {
      en: ["Lift gently as you breathe out, then release completely as you breathe in.", "Relaxing becomes even more important as birth approaches.", "If you notice leaking, heaviness or pain, ask your midwife about a women’s health physiotherapist."],
      es: ["Eleva suavemente al espirar y suelta por completo al inspirar.", "Saber relajar es aún más importante a medida que se acerca el parto.", "Si notas pérdidas, pesadez o dolor, pregunta a tu matrona por un fisioterapeuta de suelo pélvico."]
    }
  },
  {
    id: "relaxation",
    title: { en: "Relaxation techniques", es: "Técnicas de relajación" },
    intro: { en: "A few quiet minutes a day can ease tension and help you sleep. Many women also find it helpful practice for labour.", es: "Unos minutos de calma al día alivian la tensión y ayudan a dormir. A muchas mujeres también les sirve como práctica para el parto." },
    points: {
      en: ["Try breathing in for four and out for six.", "Scan from head to toe, softening your jaw, shoulders and hands.", "Rest on your side with pillows between your knees and under your belly."],
      es: ["Prueba a inspirar en cuatro tiempos y espirar en seis.", "Recorre el cuerpo de la cabeza a los pies, soltando mandíbula, hombros y manos.", "Descansa de lado con cojines entre las rodillas y bajo la tripa."]
    }
  },
  {
    id: "modifications",
    title: { en: "Understanding modifications", es: "Entender las adaptaciones" },
    intro: { en: "Every pregnancy is different, and so is every day. Choosing an easier option is always the right choice when your body asks for it.", es: "Cada embarazo es distinto, y cada día también. Elegir la opción más sencilla siempre es lo correcto cuando tu cuerpo lo pide." },
    points: {
      en: ["Each exercise shows an easier option. Use it freely.", "Skip anything that causes pain, pressure or a ridge down the middle of your belly.", "Your healthcare provider’s advice always comes before anything in this app."],
      es: ["Cada ejercicio muestra una opción más sencilla. Úsala con libertad.", "Sáltate todo lo que te cause dolor, presión o una cresta en el centro de la tripa.", "Las indicaciones de tu profesional sanitario están siempre por encima de esta app."]
    }
  }
];

/* -------------------------------------------------------------------------
   STOP SIGNS — stop exercising and contact your healthcare provider
   ------------------------------------------------------------------------- */
const WARNING_SIGNS = {
  en: ["Vaginal bleeding", "Fluid leaking from the vagina", "Regular, painful contractions", "Dizziness or feeling faint", "Shortness of breath before you start exercising", "Chest pain", "Headache", "Muscle weakness affecting your balance", "Calf pain or swelling", "Your baby moving less than usual"],
  es: ["Sangrado vaginal", "Pérdida de líquido por la vagina", "Contracciones regulares y dolorosas", "Mareo o sensación de desmayo", "Falta de aire antes de empezar el ejercicio", "Dolor en el pecho", "Dolor de cabeza", "Debilidad muscular que afecta al equilibrio", "Dolor o hinchazón en la pantorrilla", "Notar que el bebé se mueve menos de lo habitual"]
};

/* -------------------------------------------------------------------------
   INTERFACE TEXT
   ------------------------------------------------------------------------- */
const STRINGS = {
  navHome: { en: "Home", es: "Inicio" },
  navWorkouts: { en: "Workouts", es: "Entrenos" },
  navTips: { en: "Tips", es: "Consejos" },
  navAbout: { en: "About", es: "Info" },

  welcome: { en: "Move gently. Breathe deeply. Enjoy your pregnancy.", es: "Muévete con suavidad. Respira profundo. Disfruta de tu embarazo." },
  chooseTrimester: { en: "Choose your trimester", es: "Elige tu trimestre" },
  explore: { en: "Explore Workouts", es: "Ver entrenamientos" },
  today: { en: "Today’s Gentle Movement", es: "Movimiento suave de hoy" },
  startNow: { en: "Start now", es: "Empezar ahora" },

  workoutsTitle: { en: "Workouts", es: "Entrenamientos" },
  all: { en: "All", es: "Todos" },
  favourites: { en: "Favourites", es: "Favoritos" },
  noFavs: { en: "Tap the heart on any workout to save it here.", es: "Toca el corazón de cualquier entrenamiento para guardarlo aquí." },
  noneInCat: { en: "No workouts in this category for this trimester yet. Try “All”.", es: "Aún no hay entrenamientos de esta categoría para este trimestre. Prueba con «Todos»." },
  min: { en: "min", es: "min" },
  trimester: { en: "Trimester", es: "Trimestre" },
  exercises: { en: "exercises", es: "ejercicios" },
  gentle: { en: "Gentle", es: "Suave" },
  beginner: { en: "Beginner", es: "Principiante" },
  moderate: { en: "Moderate", es: "Moderado" },
  matRecommended: { en: "Mat recommended", es: "Esterilla recomendada" },
  optional: { en: "Optional", es: "Opcional" },
  noEquipmentNeeded: { en: "Every exercise has a no-equipment version.", es: "Todos los ejercicios tienen versión sin material." },
  inThisWorkout: { en: "In this workout", es: "En este entrenamiento" },
  adaptedFor: { en: "Adapted for your trimester", es: "Adaptado a tu trimestre" },
  replacedWith: { en: "replaced with", es: "sustituido por" },
  startWorkout: { en: "Start workout", es: "Empezar entrenamiento" },
  addFav: { en: "Save to favourites", es: "Guardar en favoritos" },
  removeFav: { en: "Remove from favourites", es: "Quitar de favoritos" },
  back: { en: "Back", es: "Volver" },
  close: { en: "Close", es: "Cerrar" },

  equipTitle: { en: "What do you have today?", es: "¿Qué material tienes hoy?" },
  equipIntro: { en: "We’ll show the version of each exercise that suits your equipment. You can switch versions during the workout.", es: "Te mostraremos la versión de cada ejercicio que encaja con tu material. Puedes cambiar de versión durante el entrenamiento." },
  equipNoMat: { en: "No mat? A soft rug or folded blanket works well.", es: "¿Sin esterilla? Una alfombra suave o una manta doblada funcionan bien." },
  equipChair: { en: "You’ll also need a sturdy chair or wall for support.", es: "También necesitarás una silla firme o una pared como apoyo." },
  letsBegin: { en: "Let’s begin", es: "Vamos a empezar" },

  safetyTitle: { en: "Before you begin", es: "Antes de empezar" },
  safetyIntro: { en: "This app offers gentle movement for healthy pregnancies. It is not medical advice, and it can’t tell whether exercise is right for you.", es: "Esta app ofrece movimiento suave para embarazos sin complicaciones. No es consejo médico y no puede saber si el ejercicio es adecuado para ti." },
  safety1: { en: "Talk to your doctor or midwife before starting or continuing exercise in pregnancy.", es: "Habla con tu médico o matrona antes de empezar o continuar con el ejercicio en el embarazo." },
  safety2: { en: "Follow any restrictions they have given you. Their advice comes before anything in this app.", es: "Sigue las restricciones que te hayan indicado. Su consejo está por encima de cualquier contenido de esta app." },
  safety3: { en: "Move within comfort. You should be able to talk while you exercise.", es: "Muévete dentro de lo cómodo. Debes poder hablar mientras haces ejercicio." },
  safety4: { en: "Stop straight away if you notice any warning sign. The list is in every workout and in Info.", es: "Para de inmediato si notas cualquier señal de alarma. La lista está en cada entrenamiento y en Info." },
  understand: { en: "I understand", es: "Entendido" },

  signsTitle: { en: "Stop and contact your healthcare provider if you notice", es: "Para y contacta con tu profesional sanitario si notas" },
  signsShort: { en: "Warning signs", es: "Señales de alarma" },
  emergency: { en: "If symptoms are severe or sudden, call your local emergency number (112 in Europe, 911 in the US).", es: "Si los síntomas son graves o repentinos, llama al número de emergencias (112 en Europa, 911 en EE. UU.)." },

  getReady: { en: "Get ready", es: "Prepárate" },
  exercise: { en: "Exercise", es: "Ejercicio" },
  of: { en: "of", es: "de" },
  next: { en: "Next", es: "Siguiente" },
  previous: { en: "Previous", es: "Anterior" },
  pause: { en: "Pause", es: "Pausa" },
  resume: { en: "Resume", es: "Continuar" },
  paused: { en: "Paused", es: "En pausa" },
  steps: { en: "How to do it", es: "Cómo hacerlo" },
  breathing: { en: "Breathing", es: "Respiración" },
  easierOption: { en: "Easier option", es: "Opción más sencilla" },
  safetyNote: { en: "Safety note", es: "Nota de seguridad" },
  version: { en: "Version", es: "Versión" },
  replay: { en: "Replay instructions", es: "Repetir instrucciones" },
  mute: { en: "Mute voice", es: "Silenciar voz" },
  unmute: { en: "Unmute voice", es: "Activar voz" },
  music: { en: "Background music", es: "Música de fondo" },
  volume: { en: "Volume", es: "Volumen" },
  voiceDevice: { en: "Voice guidance", es: "Guía por voz" },
  voiceRecorded: { en: "Instructor audio", es: "Audio de la instructora" },
  voiceMuted: { en: "Voice muted. Follow the steps on screen.", es: "Voz silenciada. Sigue los pasos en pantalla." },
  voiceUnavailable: { en: "Audio guidance isn’t available on this device. Follow the written steps below.", es: "La guía por audio no está disponible en este dispositivo. Sigue los pasos escritos." },
  recordedMissing: { en: "Instructor audio not found for this exercise, so the device voice is guiding you.", es: "No se ha encontrado el audio de la instructora para este ejercicio; te guía la voz del dispositivo." },
  endWorkout: { en: "End workout", es: "Terminar entrenamiento" },

  doneTitle: { en: "Beautifully done!", es: "¡Lo has hecho precioso!" },
  doneText: { en: "Take a moment to appreciate yourself.", es: "Tómate un momento para agradecértelo." },
  doneSummary: { en: "You moved for", es: "Te has movido durante" },
  backToLibrary: { en: "Back to workouts", es: "Volver a entrenamientos" },
  stayHydrated: { en: "Have a glass of water and rise slowly.", es: "Bebe un vaso de agua y levántate despacio." },

  tipsTitle: { en: "Pregnancy Tips", es: "Consejos para el embarazo" },
  tipsIntro: { en: "Short, practical guidance to help you move with confidence.", es: "Consejos breves y prácticos para moverte con confianza." },

  aboutTitle: { en: "About", es: "Información" },
  aboutText: { en: "Serena is a simple prenatal Pilates companion. Choose your trimester, pick a workout and follow the voice guidance at home, with or without equipment.", es: "Serena es una compañera sencilla de Pilates prenatal. Elige tu trimestre, escoge un entrenamiento y sigue la guía por voz en casa, con o sin material." },
  language: { en: "Language", es: "Idioma" },
  myEquipment: { en: "My equipment", es: "Mi material" },
  safetyInfo: { en: "Safety", es: "Seguridad" },
  disclaimerTitle: { en: "Important", es: "Importante" },
  disclaimer: { en: "The information in this app is general and educational. It is not a substitute for advice from your doctor, midwife or physiotherapist, and it doesn’t diagnose or treat any condition.", es: "La información de esta app es general y educativa. No sustituye el consejo de tu médico, matrona o fisioterapeuta, y no diagnostica ni trata ninguna afección." },
  reviewedBy: { en: "Exercises reviewed by", es: "Ejercicios revisados por" },
  install: { en: "Add to your home screen", es: "Añadir a la pantalla de inicio" },
  installIos: { en: "On iPhone, tap Share, then “Add to Home Screen”.", es: "En iPhone, toca Compartir y luego «Añadir a pantalla de inicio»." },
  installAndroid: { en: "On Android, open the browser menu and tap “Install app”.", es: "En Android, abre el menú del navegador y toca «Instalar aplicación»." },
  installBtn: { en: "Install app", es: "Instalar app" },
  resetData: { en: "Reset saved preferences", es: "Borrar preferencias guardadas" },
  resetConfirm: { en: "Reset language, equipment, favourites and safety confirmation on this device?", es: "¿Borrar idioma, material, favoritos y confirmación de seguridad en este dispositivo?" },
  showSafety: { en: "Read the safety notice", es: "Leer el aviso de seguridad" },

  breatheIn: { en: "Breathe in", es: "Inspira" },
  breatheOut: { en: "Breathe out", es: "Espira" },
  coachTip: { en: "Move with the circle: breathe in as it grows, out as it softens. Do the effort on the out-breath.", es: "Muévete con el círculo: inspira cuando crece y espira cuando se suaviza. Haz el esfuerzo al espirar." },
  position: { en: "Position", es: "Posición" },
  heroSub: { en: "Short, guided Pilates sessions for each stage of pregnancy, with spoken instructions in English or Spanish. No account needed.", es: "Sesiones cortas y guiadas de Pilates para cada etapa del embarazo, con instrucciones habladas en inglés o español. Sin crear cuenta." },
  heroCta: { en: "Choose your trimester", es: "Elige tu trimestre" },

  /* spoken cues */
  sayWelcome: { en: "Welcome to your gentle prenatal Pilates session. Find a comfortable position. Take a deep breath in, and slowly breathe out. Let’s begin.", es: "Bienvenida a tu sesión de Pilates prenatal suave. Busca una posición cómoda. Inspira profundamente y suelta el aire lentamente. Vamos a comenzar." },
  sayNext: { en: "Next:", es: "Siguiente:" },
  sayRelease: { en: "Gently release.", es: "Suelta con suavidad." },
  sayHalf: { en: "Keep breathing. You’re doing beautifully.", es: "Sigue respirando. Lo estás haciendo muy bien." },
  saySides: { en: "Now gently change sides.", es: "Ahora cambia de lado con suavidad." },
  sayTen: { en: "Ten more seconds.", es: "Diez segundos más." },
  sayDone: { en: "Beautifully done. Take a moment to appreciate yourself, and rise slowly when you’re ready.", es: "Lo has hecho precioso. Tómate un momento para agradecértelo y levántate despacio cuando estés lista." }
};
