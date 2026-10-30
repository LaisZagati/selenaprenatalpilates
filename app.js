/* =========================================================================
   Serena · Prenatal Pilates — app
   ========================================================================= */
"use strict";

(() => {
  /* ---------------------------------------------------------------- utils */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const store = {
    get(k, d) { try { const v = localStorage.getItem("serena:" + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("serena:" + k, JSON.stringify(v)); } catch { /* private mode */ } },
    clear() { try { Object.keys(localStorage).filter((k) => k.startsWith("serena:")).forEach((k) => localStorage.removeItem(k)); } catch { /* */ } }
  };

  const defaultLang = (navigator.language || "en").toLowerCase().startsWith("es") ? "es" : "en";
  const state = {
    lang: store.get("lang", defaultLang),
    tri: store.get("tri", 1),
    cat: "all",
    tab: "home",
    equipment: new Set(store.get("equipment", ["mat"])),
    favs: new Set(store.get("favs", [])),
    safetyAck: store.get("safetyAck", false),
    volume: store.get("volume", 0.9),
    muted: store.get("muted", false),
    music: store.get("music", false)
  };
  const save = () => {
    store.set("lang", state.lang); store.set("tri", state.tri);
    store.set("equipment", [...state.equipment]); store.set("favs", [...state.favs]);
    store.set("safetyAck", state.safetyAck); store.set("volume", state.volume);
    store.set("muted", state.muted); store.set("music", state.music);
  };

  const L = (o) => (o && typeof o === "object" && !Array.isArray(o)) ? (o[state.lang] ?? o.en) : o;
  const S = (k) => L(STRINGS[k]) ?? k;

  const fmt = (sec) => { sec = Math.max(0, Math.ceil(sec)); return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`; };

  let toastTimer;
  const toast = (msg) => {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  };

  /* ---------------------------------------------------------------- icons */
  const ICONS = {
    home: '<path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z"/>',
    workouts: '<circle cx="12" cy="5" r="2"/><path d="M12 8v6M6 11l6 3 6-3M8 20l4-6 4 6"/>',
    tips: '<path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14z"/><path d="M5 19 13 11"/>',
    about: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    heartFill: '<path fill="currentColor" d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    level: '<path d="M6 18v-3M11 18v-6M16 18V9"/>',
    none: '<circle cx="12" cy="5" r="2"/><path d="M12 7.5V14M7 10h10M9 20l3-6 3 6"/>',
    mat: '<path d="M4 9h12a3 3 0 0 1 0 6H4z"/><path d="M16 9a3 3 0 0 0 0 6"/>',
    ball: '<circle cx="12" cy="12" r="8"/><path d="M5 9.5c4 2 10 2 14 0M5 14.5c4-2 10-2 14 0"/>',
    band: '<path d="M3 12c2.5-4 5.5-4 9 0s6.5 4 9 0"/><path d="M3 12c2.5 4 5.5 4 9 0s6.5-4 9 0" opacity=".45"/>',
    ring: '<circle cx="12" cy="12" r="7"/><path d="M3 12h2M19 12h2"/>',
    softball: '<circle cx="12" cy="13" r="5.5"/><path d="M9.2 11.5c1.6 1 4 1 5.6 0"/>',
    play: '<path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/>',
    pause: '<path d="M8.5 5.5v13M15.5 5.5v13" stroke-width="3"/>',
    prev: '<path d="M18 6 9 12l9 6z" fill="currentColor"/><path d="M6 6v12"/>',
    next: '<path d="M6 6l9 6-9 6z" fill="currentColor"/><path d="M18 6v12"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    replay: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4.5 4.5V9H9"/>',
    volume: '<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    mute: '<path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4z"/><path d="M16 10l4 4M20 10l-4 4"/>',
    music: '<path d="M9 18V6l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
    alert: '<path d="M12 4 2.8 19.5h18.4z"/><path d="M12 10v4M12 16.8h.01"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.7 2.7L16 9.8"/>',
    chev: '<path d="M6 9l6 6 6-6"/>',
    breath: '<path d="M3 9h11a3 3 0 1 0-3-3M3 15h15a3 3 0 1 1-3 3M3 12h8"/>',
    posture: '<path d="M12 3c-2 3 2 5 0 9s2 6 0 9"/><path d="M9 7h6M9 12h6M9 17h6" opacity=".55"/>',
    comfort: '<path d="M12 3.5s-6 6.5-6 11a6 6 0 0 0 12 0c0-4.5-6-11-6-11z"/>',
    pelvic: '<path d="M5 8c0 6.5 3 11 7 11s7-4.5 7-11"/><path d="M8.5 13c1 1 2.2 1.6 3.5 1.6s2.5-.6 3.5-1.6"/>',
    relax: '<path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z"/>',
    sliders: '<path d="M5 7h14M5 12h14M5 17h14"/><circle cx="9" cy="7" r="1.8" fill="currentColor"/><circle cx="15" cy="12" r="1.8" fill="currentColor"/><circle cx="11" cy="17" r="1.8" fill="currentColor"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>',
    hips: '<path d="M7 4c-2 5-2 11 1 16M17 4c2 5 2 11-1 16"/><path d="M9 12c1.6 1.2 4.4 1.2 6 0"/>',
    doneMark: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/><path d="M9.2 11.4l2 2 3.6-3.6"/>'
  };
  const ic = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ""}</svg>`;

  const brandMark = `<svg class="brand-mark" viewBox="0 0 34 34" aria-hidden="true"><path d="M6 31V15a11 11 0 0 1 22 0v16" fill="none" stroke="#B04F64" stroke-width="2"/><circle cx="17" cy="21.5" r="5.5" fill="#E7A9B4"/><path d="M4 31h26" stroke="#B04F64" stroke-width="2" stroke-linecap="round"/></svg>`;

  /* ----------------------------------------------------- illustrations */
  const moon = (n) => {
    const lit = n === 1 ? '<path d="M27 3A24 24 0 0 1 27 51A13 24 0 0 0 27 3Z" fill="#FFFFFF"/>'
      : n === 2 ? '<path d="M27 3A24 24 0 0 1 27 51Z" fill="#FFFFFF"/>'
      : '<circle cx="27" cy="27" r="24" fill="#FFFFFF"/>';
    return `<svg class="moon" viewBox="0 0 54 54" aria-hidden="true"><circle cx="27" cy="27" r="24" fill="rgba(255,255,255,.35)" stroke="rgba(46,40,48,.18)" stroke-width="1.2"/>${lit}</svg>`;
  };
  const bg = (img) => img ? ` style="background-image:url('${esc(img)}')"` : "";

  const CAT_ART = { full: ["blush", "workouts"], stretch: ["sage", "tips"], back: ["sand", "posture"], hips: ["shell", "hips"], pelvic: ["blush", "pelvic"], breath: ["sage", "breath"], morning: ["sand", "sun"] };
  const artBox = (tone, icon, cls = "", img = null) =>
    `<div class="art tone-${tone} ${cls}${img ? " has-img" : ""}"${bg(img)}><span class="art-icon">${ic(icon)}</span></div>`;
  const workoutArt = (w, cls) => {
    const [tone, icon] = CAT_ART[w.cat] || ["blush", "workouts"];
    return artBox(w.tone || tone, w.icon || icon, cls, w.image);
  };
  /* breathing guide: grows on the in-breath (4 s), softens on the out-breath (6 s) */
  const orb = () => `<div class="orb-wrap" aria-hidden="true"><span class="orb"></span><div class="orb-label"><span class="in">${esc(S("breatheIn"))}</span><span class="out">${esc(S("breatheOut"))}</span><span class="ready">${esc(S("getReady"))}</span></div></div>`;

  /* -------------------------------------------------------------- content */
  const byId = (id) => WORKOUTS.find((w) => w.id === id);

  function resolve(w, tri) {
    const list = [], swaps = [], seen = new Set();
    for (const [id, secs] of w.items) {
      let eid = id, ex = EXERCISES[id];
      if (!ex) continue;
      if (!ex.tri.includes(tri)) {
        const alt = ex.swap && EXERCISES[ex.swap];
        if (!alt || !alt.tri.includes(tri)) continue;
        swaps.push([id, ex.swap]); eid = ex.swap; ex = alt;
      }
      if (seen.has(eid)) continue;
      seen.add(eid);
      list.push({ id: eid, ex, secs: secs || ex.time });
    }
    return { list, swaps };
  }
  const totalSecs = (list) => list.reduce((a, i) => a + i.secs + CONFIG.getReadySeconds, 0);
  const minutes = (list) => Math.max(1, Math.round(totalSecs(list) / 60));
  const FLOOR = new Set(["seated", "allfours", "sidelying", "kneeling", "supine"]);
  const equipInfo = (list) => {
    const opt = new Set();
    let floor = false;
    list.forEach(({ ex }) => { if (FLOOR.has(ex.pos)) floor = true; ex.v.forEach((v) => v.key !== "none" && opt.add(v.key)); });
    const order = ["ball", "band", "ring", "softball"];
    return { floor, optional: order.filter((k) => opt.has(k)) };
  };
  const owned = () => state.equipment;
  const variationsFor = (ex) => ex.v.filter((v) => v.key === "none" || owned().has(v.key));
  const pickVariation = (ex) => { const c = variationsFor(ex); return c.find((v) => v.key !== "none") || c[0] || ex.v[0]; };

  function todayWorkout() {
    const pool = WORKOUTS.filter((w) => w.tri.includes(state.tri));
    const day = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 864e5);
    return pool[day % pool.length];
  }

  /* --------------------------------------------------------------- layers */
  const layers = [];
  const lockScroll = () => { document.documentElement.style.overflow = layers.length ? "hidden" : ""; };
  function pushLayer(name) { layers.push(name); history.pushState({ layer: name }, ""); lockScroll(); }
  function replaceTop(name) { const old = layers[layers.length - 1]; if (old && old !== name) hideLayer(old); layers[layers.length - 1] = name; history.replaceState({ layer: name }, ""); }
  function closeTop() { if (layers.length) history.back(); }
  function hideLayer(name) {
    if (name === "sheet") { $("#sheet").hidden = true; $("#sheet-body").innerHTML = ""; }
    if (name === "modal") { $("#modal").hidden = true; $("#modal-body").innerHTML = ""; Player.afterModal(); }
    if (name === "player") Player.close();
  }
  window.addEventListener("popstate", () => { const top = layers.pop(); if (top) hideLayer(top); lockScroll(); });

  /* ------------------------------------------------------------ rendering */
  const langToggle = () => `
    <div class="lang" role="group" aria-label="${esc(S("language"))}">
      <button data-act="lang" data-lang="en" aria-pressed="${state.lang === "en"}"><span class="flag" aria-hidden="true">🇬🇧</span><span class="ln-full">English</span><span class="ln-short">EN</span></button>
      <button data-act="lang" data-lang="es" aria-pressed="${state.lang === "es"}"><span class="flag" aria-hidden="true">🇪🇸</span><span class="ln-full">Español</span><span class="ln-short">ES</span></button>
    </div>`;

  function renderNav() {
    const tabs = [["home", "navHome", "home"], ["workouts", "navWorkouts", "workouts"], ["tips", "navTips", "tips"], ["about", "navAbout", "about"]];
    $("#tabbar").innerHTML = `
      <div class="side-brand brand">${brandMark}<div><span class="brand-name">${esc(CONFIG.appName)}</span><span class="brand-sub">${esc(L(CONFIG.tagline))}</span></div></div>
      <div class="tabs">${tabs.map(([id, k, i]) =>
        `<button class="tab" data-act="tab" data-tab="${id}" ${state.tab === id ? 'aria-current="page"' : ""}>${ic(i)}<span>${esc(S(k))}</span></button>`).join("")}</div>
      <div class="side-foot">${langToggle()}<p>${esc(S("safety3"))}</p></div>`;
  }

  const levelLabel = (w) => S(w.level);
  const favBtn = (id, cls = "icon-btn fav") => {
    const on = state.favs.has(id);
    return `<button class="${cls}" data-act="fav" data-id="${id}" aria-pressed="${on}" aria-label="${esc(on ? S("removeFav") : S("addFav"))}">${ic(on ? "heartFill" : "heart")}</button>`;
  };

  function renderHome() {
    const t = todayWorkout();
    const tl = resolve(t, state.tri).list;
    const triTone = { 1: "blush", 2: "sage", 3: "sand" };
    return `
      <header class="topbar mobile-only">
        <div class="brand">${brandMark}<div><span class="brand-name">${esc(CONFIG.appName)}</span><span class="brand-sub">${esc(L(CONFIG.tagline))}</span></div></div>
        ${langToggle()}
      </header>
      <section class="home-hero">
        <div class="hero-text">
          <h1>${esc(S("welcome"))}</h1>
          <p>${esc(S("heroSub"))}</p>
          <button class="btn" data-act="scroll-tri">${esc(S("heroCta"))}</button>
        </div>
        <div class="hero-art art tone-blush${CONFIG.images.hero ? " has-img" : ""}"${bg(CONFIG.images.hero)}>${CONFIG.images.hero ? "" : orb()}</div>
      </section>

      <h2 class="section-title" id="tri-title">${esc(S("chooseTrimester"))}</h2>
      <div class="tri-list">
        ${[1, 2, 3].map((n) => `
          <button class="tri-card" data-act="explore" data-tri="${n}">
            <div class="art tone-${triTone[n]}${CONFIG.images["t" + n] ? " has-img" : ""}"${bg(CONFIG.images["t" + n])}>${CONFIG.images["t" + n] ? "" : moon(n)}</div>
            <div>
              <h3>${esc(L(TRIMESTERS[n].name))}</h3>
              <p class="weeks">${esc(L(TRIMESTERS[n].weeks))}</p>
              <span class="btn small">${esc(S("explore"))}</span>
            </div>
          </button>`).join("")}
      </div>

      <h2 class="section-title">${esc(S("today"))}</h2>
      <button class="today-card" data-act="open-workout" data-id="${t.id}">
        ${workoutArt(t)}
        <div class="body">
          <h3>${esc(L(t.name))}</h3>
          <div class="meta"><span>${ic("clock")}${minutes(tl)} ${S("min")}</span><span>${ic("level")}${esc(levelLabel(t))}</span><span>${esc(L(TRIMESTERS[state.tri].name))}</span></div>
          <p class="muted">${esc(L(t.desc))}</p>
          <span class="btn small">${ic("play")}${esc(S("startNow"))}</span>
        </div>
      </button>`;
  }

  function wCard(w) {
    const { list } = resolve(w, state.tri);
    const eq = equipInfo(list);
    const eqText = [eq.floor ? S("matRecommended") : null, eq.optional.length ? `${S("optional")}: ${eq.optional.map((k) => L(EQUIPMENT[k])).join(", ")}` : null].filter(Boolean).join(". ");
    return `
      <article class="w-card">
        ${workoutArt(w)}
        <div>
          <h3>${esc(L(w.name))}</h3>
          <div class="meta"><span>${ic("clock")}${minutes(list)} ${S("min")}</span><span>${ic("level")}${esc(levelLabel(w))}</span></div>
          <p class="eq-line">${esc(eqText)}.</p>
        </div>
        <button class="open" data-act="open-workout" data-id="${w.id}" aria-label="${esc(L(w.name))}"></button>
        ${favBtn(w.id)}
      </article>`;
  }

  function renderWorkouts() {
    let list = WORKOUTS.filter((w) => w.tri.includes(state.tri));
    if (state.cat === "favs") list = list.filter((w) => state.favs.has(w.id));
    else if (state.cat !== "all") list = list.filter((w) => w.cat === state.cat);
    const cats = Object.keys(CATEGORIES).filter((c) => WORKOUTS.some((w) => w.cat === c && w.tri.includes(state.tri)));
    const empty = state.cat === "favs" ? S("noFavs") : S("noneInCat");
    return `
      <div class="page-head"><h1 class="page-title">${esc(S("workoutsTitle"))}</h1></div>
      <div class="seg" role="group" aria-label="${esc(S("chooseTrimester"))}">
        ${[1, 2, 3].map((n) => `<button data-act="tri" data-tri="${n}" aria-pressed="${state.tri === n}">${S("trimester")} ${n}</button>`).join("")}
      </div>
      <p class="tri-note">${ic("about")}<span><strong>${esc(L(TRIMESTERS[state.tri].weeks))}.</strong> ${esc(L(TRIMESTERS[state.tri].note))}</span></p>
      <div class="chip-row" role="group">
        <button class="chip" data-act="cat" data-cat="all" aria-pressed="${state.cat === "all"}">${esc(S("all"))}</button>
        <button class="chip" data-act="cat" data-cat="favs" aria-pressed="${state.cat === "favs"}">${ic("heart")}${esc(S("favourites"))}</button>
        ${cats.map((c) => `<button class="chip" data-act="cat" data-cat="${c}" aria-pressed="${state.cat === c}">${esc(L(CATEGORIES[c]))}</button>`).join("")}
      </div>
      <div class="w-list">${list.length ? list.map(wCard).join("") : `<p class="empty">${esc(empty)}</p>`}</div>`;
  }

  const TIP_ICON = { breathing: "breath", posture: "posture", comfort: "comfort", "pelvic-floor": "pelvic", relaxation: "relax", modifications: "sliders" };
  const signsList = () => `<ul class="signs">${L(WARNING_SIGNS).map((s) => `<li>${esc(s)}</li>`).join("")}</ul><p class="emergency">${esc(S("emergency"))}</p>`;

  function renderTips() {
    return `
      <h1 class="page-title">${esc(S("tipsTitle"))}</h1>
      <p class="page-intro" style="margin-bottom:22px">${esc(S("tipsIntro"))}</p>
      <div class="tips-grid">
      ${TIPS.map((t, i) => `
        <details class="tip"${i === 0 ? " open" : ""}>
          <summary><span class="tip-icon">${ic(TIP_ICON[t.id])}</span><h3>${esc(L(t.title))}</h3><span class="chev">${ic("chev")}</span></summary>
          <div class="tip-body"><p>${esc(L(t.intro))}</p><ul>${L(t.points).map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>
        </details>`).join("")}
      </div>
      <section class="panel" style="margin-top:22px;max-width:760px">
        <h2>${esc(S("signsShort"))}</h2>
        <p class="muted">${esc(S("signsTitle"))}:</p>
        ${signsList()}
      </section>`;
  }

  const eqGrid = () => `<div class="eq-grid">${Object.keys(EQUIPMENT).map((k) =>
    `<button class="eq-opt" data-act="eq" data-eq="${k}" aria-pressed="${state.equipment.has(k)}">${ic(k)}<span>${esc(L(EQUIPMENT[k]))}</span></button>`).join("")}</div>`;

  let installEvt = null;
  function renderAbout() {
    const standalone = matchMedia("(display-mode: standalone)").matches || navigator.standalone;
    return `
      <h1 class="page-title">${esc(S("aboutTitle"))}</h1>
      <div class="about-grid" style="margin-top:18px">
      <section class="panel">
        <div class="brand" style="margin-bottom:12px">${brandMark}<div><span class="brand-name">${esc(CONFIG.appName)}</span><span class="brand-sub">${esc(L(CONFIG.tagline))}</span></div></div>
        <p>${esc(S("aboutText"))}</p>
        ${CONFIG.reviewedBy ? `<p class="muted">${esc(S("reviewedBy"))}: ${esc(CONFIG.reviewedBy)}</p>` : ""}
      </section>
      <section class="panel"><h2>${esc(S("language"))}</h2>${langToggle()}</section>
      <section class="panel span"><h2>${esc(S("myEquipment"))}</h2><p class="muted" style="margin-bottom:12px">${esc(S("equipIntro"))}</p>${eqGrid()}</section>
      <section class="panel">
        <h2>${esc(S("safetyInfo"))}</h2>
        <p class="muted">${esc(S("signsTitle"))}:</p>
        ${signsList()}
        <button class="link-btn" data-act="safety">${esc(S("showSafety"))}</button>
      </section>
      ${standalone ? "" : `<section class="panel"><h2>${esc(S("install"))}</h2><p class="muted">${esc(S("installIos"))}</p><p class="muted">${esc(S("installAndroid"))}</p>${installEvt ? `<button class="btn soft small" style="margin-top:12px" data-act="install">${ic("download")}${esc(S("installBtn"))}</button>` : ""}</section>`}
      <section class="panel"><h2>${esc(S("disclaimerTitle"))}</h2><p class="muted">${esc(S("disclaimer"))}</p></section>
      </div>
      <button class="link-btn" style="margin-top:12px" data-act="reset">${esc(S("resetData"))}</button>`;
  }

  function render() {
    document.documentElement.lang = state.lang;
    const v = $("#view");
    v.innerHTML = state.tab === "workouts" ? renderWorkouts() : state.tab === "tips" ? renderTips() : state.tab === "about" ? renderAbout() : renderHome();
    renderNav();
  }
  function setTab(t) { state.tab = t; render(); window.scrollTo(0, 0); }

  /* ------------------------------------------------- sheets and modals */
  let sheetMode = null, sheetId = null;
  function openSheet(html, mode, id) {
    sheetMode = mode; sheetId = id;
    $("#sheet-body").innerHTML = `<div class="sheet-inner">${html}</div>`;
    $("#sheet-body").scrollTop = 0;
    if ($("#sheet").hidden) { $("#sheet").hidden = false; pushLayer("sheet"); }
  }

  function detailHtml(w) {
    const { list, swaps } = resolve(w, state.tri);
    const eq = equipInfo(list);
    return `
      ${workoutArt(w, "d-art")}
      <h2 class="d-title" id="sheet-title">${esc(L(w.name))}</h2>
      <div class="meta d-meta"><span>${ic("clock")}${minutes(list)} ${S("min")}</span><span>${ic("level")}${esc(levelLabel(w))}</span><span>${esc(L(TRIMESTERS[state.tri].name))}</span></div>
      <p class="d-desc">${esc(L(w.desc))}</p>
      <div class="d-eq">
        ${eq.floor ? `<strong>${esc(S("matRecommended"))}.</strong> ` : ""}${esc(S("noEquipmentNeeded"))}
        ${eq.optional.length ? `<div class="eq-icons"><span class="lbl">${esc(S("optional"))}:</span>${eq.optional.map((k) => `<span>${ic(k)}${esc(L(EQUIPMENT[k]))}</span>`).join("")}</div>` : ""}
      </div>
      ${swaps.length ? `<p class="d-swaps">${esc(S("adaptedFor"))}: ${swaps.map(([a, b]) => `${esc(L(EXERCISES[a].name))} ${esc(S("replacedWith"))} ${esc(L(EXERCISES[b].name).toLowerCase())}`).join("; ")}.</p>` : ""}
      <h3 class="d-h">${esc(S("inThisWorkout"))}</h3>
      <ol class="d-list">${list.map((i) => `<li><span>${esc(L(i.ex.name))}<span class="f">${esc(L(i.ex.focus))}</span></span><span class="t">${fmt(i.secs)}</span></li>`).join("")}</ol>
      <div class="sheet-actions">${favBtn(w.id, "icon-btn")}<button class="btn" data-act="start" data-id="${w.id}">${ic("play")}${esc(S("startWorkout"))}</button></div>`;
  }
  const openWorkout = (id) => openSheet(detailHtml(byId(id)), "detail", id);

  function equipHtml(id) {
    return `
      <h2 class="d-title" id="sheet-title" style="margin-top:14px">${esc(S("equipTitle"))}</h2>
      <p class="d-desc">${esc(S("equipIntro"))}</p>
      ${eqGrid()}
      <p class="muted" style="margin:16px 2px 4px">${!state.equipment.has("mat") ? esc(S("equipNoMat")) + " " : ""}${esc(S("equipChair"))}</p>
      <div class="sheet-actions"><button class="btn" data-act="begin" data-id="${id}">${esc(S("letsBegin"))}</button></div>`;
  }

  function startFlow(id) {
    if (!state.safetyAck) { showSafety(id); return; }
    openSheet(equipHtml(id), "equip", id);
  }

  let pendingStart = null;
  function showModal(html) {
    $("#modal-body").innerHTML = html;
    if ($("#modal").hidden) { $("#modal").hidden = false; pushLayer("modal"); }
    setTimeout(() => $("#modal-body button")?.focus({ preventScroll: true }), 50);
  }
  function showSafety(id) {
    pendingStart = id || null;
    showModal(`
      <h2 id="modal-title">${esc(S("safetyTitle"))}</h2>
      <p class="lead">${esc(S("safetyIntro"))}</p>
      <ul class="check-list">${["safety1", "safety2", "safety3", "safety4"].map((k) => `<li>${ic("check")}<span>${esc(S(k))}</span></li>`).join("")}</ul>
      <details class="tip" style="box-shadow:none;background:var(--card)"><summary style="grid-template-columns:1fr 20px"><h3 style="font-size:19px">${esc(S("signsShort"))}</h3><span class="chev">${ic("chev")}</span></summary><div class="tip-body" style="padding:0 18px 18px">${signsList()}</div></details>
      <button class="btn full" style="margin-top:18px" data-act="ack">${esc(S("understand"))}</button>`);
  }
  function showSigns() {
    Player.pauseForModal();
    showModal(`<h2 id="modal-title">${esc(S("signsShort"))}</h2><p class="lead">${esc(S("signsTitle"))}:</p>${signsList()}<button class="btn full" style="margin-top:18px" data-act="close-top">${esc(S("close"))}</button>`);
  }

  function toggleEq(k) {
    const eq = state.equipment;
    if (k === "none") { eq.clear(); eq.add("none"); }
    else { eq.delete("none"); eq.has(k) ? eq.delete(k) : eq.add(k); if (!eq.size) eq.add("none"); }
    save();
    if (sheetMode === "equip" && !$("#sheet").hidden) openSheet(equipHtml(sheetId), "equip", sheetId);
    if (state.tab === "about") $$(".eq-opt").forEach((b) => b.setAttribute("aria-pressed", state.equipment.has(b.dataset.eq)));
  }

  function toggleFav(id) {
    state.favs.has(id) ? state.favs.delete(id) : state.favs.add(id);
    save();
    const on = state.favs.has(id);
    $$(`[data-act="fav"][data-id="${id}"]`).forEach((b) => {
      b.setAttribute("aria-pressed", on);
      b.setAttribute("aria-label", on ? S("removeFav") : S("addFav"));
      if (b.classList.contains("btn")) b.textContent = on ? S("removeFav") : S("addFav");
      else b.innerHTML = ic(on ? "heartFill" : "heart");
    });
    toast(on ? S("addFav") + " ✓" : S("removeFav"));
    if (state.tab === "workouts" && state.cat === "favs") render();
  }

  function setLang(l) {
    if (l === state.lang) return;
    state.lang = l; save(); Voice.invalidate(); render();
  }

  /* ========================================================= AUDIO ===== */

  /* --- device voice (text to speech) --- */
  const VOICE_PREFS = {
    en: ["Serena", "Kate", "Stephanie", "Martha", "Samantha", "Karen", "Moira", "Tessa", "Sonia", "Libby", "Maisie", "Aria", "Jenny", "Google UK English Female", "Google US English"],
    es: ["Mónica", "Monica", "Marisol", "Elvira", "Abril", "Esperanza", "Lucía", "Lucia", "Google español", "Paulina"]
  };
  const MALE = /\b(Daniel|Jorge|Diego|Juan|Pablo|Alex|Fred|Arthur|Aaron|Thomas|Guy|Ryan|Alvaro|Álvaro|Enrique|Rishi|Gordon|Oliver|Eddy|Reed|Rocko|Grandpa|Carlos|Raul|Raúl|Tom)\b/i;

  const Voice = {
    ok: "speechSynthesis" in window && "SpeechSynthesisUtterance" in window,
    voices: [], cache: {}, queue: [], idx: 0, playing: false, token: 0, part: 0, timer: null, onProgress: null,
    init() {
      if (!this.ok) return;
      const load = () => { this.voices = speechSynthesis.getVoices() || []; this.cache = {}; };
      load();
      if (speechSynthesis.addEventListener) speechSynthesis.addEventListener("voiceschanged", load);
      else speechSynthesis.onvoiceschanged = load;
    },
    invalidate() { this.cache = {}; },
    pick() {
      const lang = state.lang;
      if (lang in this.cache) return this.cache[lang];
      let best = null, top = -Infinity;
      for (const v of this.voices) {
        const vl = (v.lang || "").replace("_", "-");
        if (!vl.toLowerCase().startsWith(lang)) continue;
        let s = 0;
        if (lang === "es" && /^es-ES$/i.test(vl)) s += 40;
        if (lang === "en" && /^en-(GB|US|IE|AU)$/i.test(vl)) s += 10;
        const pi = VOICE_PREFS[lang].findIndex((p) => v.name.includes(p));
        if (pi >= 0) s += 30 - pi;
        if (/natural|neural|enhanced|premium|mejorad/i.test(v.name)) s += 25;
        if (/female|mujer/i.test(v.name)) s += 8;
        if (MALE.test(v.name) || (/\bmale\b/i.test(v.name) && !/female/i.test(v.name))) s -= 30;
        if (s > top) { top = s; best = v; }
      }
      if (this.voices.length) this.cache[lang] = best;
      return best;
    },
    say(lines) { this.stop(); this.queue = lines.filter(Boolean); this.idx = 0; this.playing = true; this.later(); },
    add(lines) {
      if (!this.playing || this.idx >= this.queue.length) return this.say(lines);
      this.queue.push(...lines.filter(Boolean)); this.report();
    },
    busy() { return this.playing && this.idx < this.queue.length; },
    later() { clearTimeout(this.timer); this.timer = setTimeout(() => this.speakNext(), 70); },
    speakNext() {
      if (!this.playing) return;
      if (this.idx >= this.queue.length) { this.playing = false; this.report(1); return; }
      const text = this.queue[this.idx], t = ++this.token;
      const done = () => { if (t !== this.token) return; this.idx++; this.part = 0; this.report(); this.speakNext(); };
      const rate = state.lang === "es" ? 0.92 : 0.9;
      if (state.muted || !this.ok) {
        // keep the guidance in sync silently, so cues land at the right time when unmuted
        this.timer = setTimeout(done, Math.max(1200, text.length * 62 / rate));
        return;
      }
      const u = new SpeechSynthesisUtterance(text);
      const v = this.pick();
      if (v) { u.voice = v; u.lang = v.lang; } else u.lang = state.lang === "es" ? "es-ES" : "en-GB";
      u.rate = rate; u.pitch = 1.02; u.volume = state.volume;
      u.onboundary = (e) => { if (t === this.token && e.charIndex != null) { this.part = e.charIndex / text.length; this.report(); } };
      u.onend = done; u.onerror = done;
      speechSynthesis.speak(u);
    },
    pause() { this.playing = false; this.token++; clearTimeout(this.timer); if (this.ok) speechSynthesis.cancel(); },
    resume() { if (this.idx < this.queue.length) { this.playing = true; this.later(); } },
    stop() { this.playing = false; this.token++; clearTimeout(this.timer); this.queue = []; this.idx = 0; this.part = 0; if (this.ok) speechSynthesis.cancel(); this.report(0); },
    restartSentence() { if (this.playing) { this.token++; clearTimeout(this.timer); if (this.ok) speechSynthesis.cancel(); this.later(); } },
    report(force) {
      const n = this.queue.length;
      const p = force ?? (n ? (this.idx + this.part) / n : 0);
      this.onProgress && this.onProgress(Math.min(1, p));
      this.onIndex && this.onIndex(this.idx);
    }
  };

  /* --- guide: recorded instructor audio first, device voice as fallback --- */
  const Guide = {
    audio: new Audio(), fileOk: false, token: 0, notice: null,
    init() {
      this.audio.preload = "auto";
      this.audio.addEventListener("timeupdate", () => {
        if (this.fileOk && this.audio.duration) Voice.onProgress && Voice.onProgress(this.audio.currentTime / this.audio.duration);
      });
    },
    stepsFor(it) { return [...it.v.steps[state.lang], L(it.ex.breath)]; },
    tryFile(it) {
      return new Promise((res) => {
        const a = this.audio; let fin = false;
        const end = (ok) => { if (fin) return; fin = true; clearTimeout(tm); a.oncanplay = a.onerror = null; res(ok); };
        const tm = setTimeout(() => end(false), 3500);
        a.oncanplay = () => { a.volume = state.volume; a.muted = state.muted; a.play().then(() => end(true)).catch(() => end(false)); };
        a.onerror = () => end(false);
        a.src = CONFIG.audioPath(state.lang, it.id, it.v.key);
        a.load();
      });
    },
    prep(it, lines) {
      const t = ++this.token;
      this.stop(true); this.notice = null;
      if (CONFIG.recordedAudio) {
        this.tryFile(it).then((ok) => {
          if (t !== this.token) return;
          this.fileOk = ok;
          if (!ok) { this.notice = "recordedMissing"; Voice.say(lines); if (Player.phase === "work") this.work(it); }
          Player.updateNotice();
        });
      } else {
        this.fileOk = false;
        Voice.say(lines);
      }
    },
    work(it) {
      if (this.fileOk) return;
      const base = Voice.busy() ? Voice.queue.length : 0;
      Voice.add(this.stepsFor(it));
      Player.stepBase = base;
      Voice.report();
    },
    cue(text, important) { if (this.fileOk) return; if (Voice.busy() && !important) return; Voice.add([text]); },
    replay(it) {
      if (this.fileOk) { this.audio.currentTime = 0; this.audio.play().catch(() => {}); return; }
      Voice.say([L(it.ex.setup), ...this.stepsFor(it)]);
      Player.stepBase = 1;
    },
    pause() { if (this.fileOk) this.audio.pause(); Voice.pause(); },
    resume() { if (this.fileOk) this.audio.play().catch(() => {}); else Voice.resume(); },
    stop(keepToken) { if (!keepToken) this.token++; this.audio.pause(); this.fileOk = false; Voice.stop(); },
    setVolume(restart) { this.audio.volume = state.volume; Music.setVolume(); if (restart && !state.muted) Voice.restartSentence(); },
    setMuted() { this.audio.muted = state.muted; Voice.restartSentence(); }
  };

  /* --- optional background music: a soft generated pad (no files needed) --- */
  const Music = {
    ctx: null, master: null, nodes: [], on: false, timer: null,
    chords: [[146.83, 220.0, 277.18, 329.63], [130.81, 196.0, 246.94, 329.63], [110.0, 164.81, 220.0, 277.18], [123.47, 185.0, 246.94, 293.66]],
    level() { return state.volume * 0.06; },
    start() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC || this.on) return;
      try {
        this.ctx = this.ctx || new AC();
        const c = this.ctx; c.resume();
        this.on = true;
        this.master = c.createGain(); this.master.gain.value = 0;
        const lp = c.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1000;
        lp.connect(this.master); this.master.connect(c.destination);
        this.nodes = this.chords[0].map((f, k) => {
          const o = c.createOscillator(); o.type = k % 2 ? "sine" : "triangle"; o.frequency.value = f; o.detune.value = (k - 1.5) * 4;
          const g = c.createGain(); g.gain.value = 0.16;
          const lfo = c.createOscillator(); lfo.frequency.value = 0.05 + k * 0.025;
          const lg = c.createGain(); lg.gain.value = 0.07;
          lfo.connect(lg); lg.connect(g.gain); o.connect(g); g.connect(lp);
          o.start(); lfo.start();
          return { o, lfo };
        });
        this.master.gain.setTargetAtTime(this.level(), c.currentTime, 1.5);
        let ci = 0;
        this.timer = setInterval(() => {
          ci = (ci + 1) % this.chords.length;
          this.nodes.forEach((n, k) => n.o.frequency.setTargetAtTime(this.chords[ci][k], c.currentTime, 1.4));
        }, 9000);
      } catch { this.on = false; }
    },
    setVolume() { if (this.on) this.master.gain.setTargetAtTime(this.level(), this.ctx.currentTime, 0.2); },
    suspend() { if (this.on) this.ctx.suspend(); },
    resume() { if (this.on) this.ctx.resume(); },
    stop() {
      if (!this.on) return;
      this.on = false; clearInterval(this.timer);
      const c = this.ctx, m = this.master, ns = this.nodes;
      c.resume(); m.gain.setTargetAtTime(0, c.currentTime, 0.4);
      setTimeout(() => { ns.forEach((n) => { try { n.o.stop(); n.lfo.stop(); } catch { /* */ } }); m.disconnect(); }, 1800);
    }
  };

  /* --- keep the screen awake during a workout --- */
  const Wake = {
    lock: null, want: false,
    async on() { this.want = true; try { this.lock = await navigator.wakeLock?.request("screen"); } catch { /* not supported */ } },
    off() { this.want = false; try { this.lock?.release(); } catch { /* */ } this.lock = null; }
  };
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && Wake.want) Wake.on(); });

  /* ======================================================== PLAYER ===== */
  const C = 2 * Math.PI * 49;
  const Player = {
    w: null, list: [], i: 0, phase: "prep", remaining: 0, total: 0, paused: false, finished: false,
    loop: null, last: 0, worked: 0, half: false, ten: false, modalPaused: false, stepBase: null,
    get cur() { return this.list[this.i]; },

    open(w) {
      this.w = w;
      this.list = resolve(w, state.tri).list.map((it) => ({ ...it, v: pickVariation(it.ex) }));
      this.worked = 0; this.finished = false;
      $("#player").hidden = false;
      Wake.on();
      if (state.music) Music.start();
      Voice.onProgress = (p) => { const b = $("#paprog"); if (b) b.style.width = (p * 100).toFixed(1) + "%"; };
      Voice.onIndex = (idx) => this.highlight(idx);
      this.go(0, true);
      this.last = performance.now();
      clearInterval(this.loop);
      this.loop = setInterval(() => { const now = performance.now(); const dt = (now - this.last) / 1000; this.last = now; this.tick(dt); }, 200);
    },

    go(i, first = false) {
      this.i = i; this.phase = "prep"; this.paused = false;
      this.remaining = this.total = CONFIG.getReadySeconds;
      this.half = this.ten = false; this.stepBase = null;
      $("#player").classList.remove("is-paused");
      $("#player").classList.add("is-prep");
      Music.resume();
      this.render();
      const it = this.cur;
      Guide.prep(it, [first ? S("sayWelcome") : S("sayRelease"), `${S("sayNext")} ${L(it.ex.name)}.`, L(it.ex.setup)]);
      this.updateNotice();
    },

    highlight(idx) {
      const items = $$("#player .p-steps li");
      const k = this.stepBase == null ? -1 : idx - this.stepBase;
      items.forEach((li, n) => {
        const now = n === k;
        if (now && !li.classList.contains("is-now")) li.scrollIntoView({ block: "nearest", behavior: "smooth" });
        li.classList.toggle("is-now", now);
      });
    },

    startWork() {
      this.phase = "work";
      $("#player").classList.remove("is-prep");
      this.remaining = this.total = this.cur.secs;
      Guide.work(this.cur);
      const vid = $("#player video"); if (vid) { vid.currentTime = 0; vid.play().catch(() => {}); }
      this.updateTimer();
    },

    tick(dt) {
      if (this.paused || this.finished || !this.w) return;
      this.remaining -= dt;
      if (this.phase === "work") {
        this.worked += dt;
        const sides = this.cur.v.sides ?? this.cur.ex.sides;
        if (!this.half && this.remaining <= this.total / 2) {
          this.half = true;
          Guide.cue(sides ? S("saySides") : S("sayHalf"), !!sides);
        }
        if (!this.ten && this.total >= 40 && this.remaining <= 10) { this.ten = true; Guide.cue(S("sayTen"), false); }
      }
      if (this.remaining <= 0) {
        if (this.phase === "prep") this.startWork();
        else this.next();
        return;
      }
      this.updateTimer();
    },

    next() { if (this.i < this.list.length - 1) this.go(this.i + 1); else this.finish(); },
    prev() {
      if (this.phase === "work" && this.total - this.remaining > 5) this.go(this.i);
      else this.go(Math.max(0, this.i - 1));
    },
    toggle() {
      this.paused = !this.paused;
      $("#player").classList.toggle("is-paused", this.paused);
      const vid = $("#player video");
      if (this.paused) { Guide.pause(); Music.suspend(); vid && vid.pause(); }
      else { this.last = performance.now(); Guide.resume(); Music.resume(); vid && vid.play().catch(() => {}); }
      this.updateTimer();
    },
    pauseForModal() { if (!$("#player").hidden && !this.paused && !this.finished) { this.toggle(); this.modalPaused = true; } },
    afterModal() { this.modalPaused = false; },

    setVariation(key) {
      const it = this.cur; const v = it.ex.v.find((x) => x.key === key);
      if (!v || v.key === it.v.key) return;
      it.v = v;
      const scroll = $("#pscroll")?.scrollTop || 0;
      this.render();
      $("#pscroll").scrollTop = scroll;
      if (this.paused) return;
      if (CONFIG.recordedAudio) Guide.prep(it, [L(it.ex.setup)]);
      if (this.phase === "work" || !CONFIG.recordedAudio) { Voice.say(Guide.stepsFor(it)); this.stepBase = 0; }
    },

    finish() {
      this.finished = true;
      Guide.stop();
      Voice.say([S("sayDone")]);
      Wake.off();
      const mins = Math.max(1, Math.round(this.worked / 60));
      const fav = state.favs.has(this.w.id);
      $("#player").innerHTML = `
        <div class="p-frame">
          <div class="p-head"><button class="icon-btn" data-act="close-top" aria-label="${esc(S("close"))}">${ic("close")}</button><span></span><span></span></div>
          <div class="done">
            ${artBox("blush", "doneMark")}
            <h2>${esc(S("doneTitle"))}</h2>
            <p>${esc(S("doneText"))}</p>
            <p class="sum">${esc(S("doneSummary"))}<strong>${mins} ${S("min")}</strong></p>
            <p style="font-size:14px">${esc(S("stayHydrated"))}</p>
            <div class="actions">
              <button class="btn full" data-act="p-library">${esc(S("backToLibrary"))}</button>
              <button class="btn ghost full" data-act="fav" data-id="${this.w.id}" aria-pressed="${fav}">${esc(fav ? S("removeFav") : S("addFav"))}</button>
            </div>
          </div>
        </div>`;
    },

    close() {
      clearInterval(this.loop);
      Guide.stop(); Music.stop(); Wake.off();
      Voice.onProgress = null; Voice.onIndex = null;
      const p = $("#player"); p.hidden = true; p.innerHTML = ""; p.classList.remove("is-paused", "is-prep");
      this.w = null;
    },

    updateNotice() {
      const box = $("#pfallback"); if (!box) return;
      let msg = null;
      if (state.muted) msg = S("voiceMuted");
      else if (Guide.notice) msg = S(Guide.notice);
      else if (!Voice.ok && !CONFIG.recordedAudio) msg = S("voiceUnavailable");
      box.hidden = !msg; box.textContent = msg || "";
    },

    updateTimer() {
      const t = $("#ptime"); if (!t) return;
      t.textContent = fmt(this.remaining);
      const frac = Math.max(0, Math.min(1, this.remaining / this.total));
      $("#parc").style.strokeDashoffset = (C * (1 - frac)).toFixed(1);
      $("#pmain").classList.toggle("prep", this.phase === "prep");
      const ph = $("#pphase");
      ph.textContent = this.paused ? S("paused") : this.phase === "prep" ? S("getReady") : `${S("exercise")} ${this.i + 1} ${S("of")} ${this.list.length}`;
      ph.classList.toggle("prep", this.phase === "prep");
      const seg = $("#pseg"); if (seg) seg.style.width = this.phase === "work" ? ((1 - frac) * 100).toFixed(1) + "%" : "0%";
      const tg = $("#ptoggle");
      tg.setAttribute("aria-label", this.paused ? S("resume") : S("pause"));
      tg.querySelector("svg").outerHTML = ic(this.paused ? "play" : "pause");
    },

    render() {
      const it = this.cur, ex = it.ex, v = it.v, n = this.list.length, i = this.i;
      const vars = variationsFor(ex);
      const tone = (CAT_ART[this.w.cat] || ["blush"])[0];
      const video = v.video || ex.video;
      const media = video
        ? `<video src="${esc(video)}" muted loop playsinline preload="metadata" ${this.phase === "work" ? "autoplay" : ""}></video>`
        : orb();
      const chips = (vars.length > 1 ? vars : [v]).map((x) =>
        `<button class="chip" data-act="p-var" data-key="${x.key}" aria-pressed="${x.key === v.key}">${ic(x.key)}${esc(L(EQUIPMENT[x.key]))}</button>`).join("");
      $("#player").innerHTML = `
        <div class="p-frame">
          <div class="p-head">
            <button class="icon-btn" data-act="p-end" aria-label="${esc(S("endWorkout"))}">${ic("close")}</button>
            <div class="ttl"><strong>${esc(L(this.w.name))}</strong>${S("exercise")} ${i + 1} ${S("of")} ${n}</div>
            <button class="signs-btn" data-act="signs">${ic("alert")}${esc(S("signsShort"))}</button>
          </div>
          <div class="p-progress" aria-hidden="true">${this.list.map((_, k) => `<i class="${k < i ? "is-done" : ""}">${k === i ? '<b id="pseg"></b>' : ""}</i>`).join("")}</div>

          <div class="p-body">
            <div class="p-left">
              <div class="p-media art tone-${tone}">${media}<span class="phase" id="pphase"></span><div class="pos"><span>${ic("posture")}${esc(L(POSITIONS[ex.pos]))}</span></div></div>

              <div class="p-audio">
                <button class="icon-btn" data-act="p-replay" aria-label="${esc(S("replay"))}" title="${esc(S("replay"))}">${ic("replay")}</button>
                <button class="icon-btn" data-act="p-mute" aria-pressed="${state.muted}" aria-label="${esc(state.muted ? S("unmute") : S("mute"))}" title="${esc(state.muted ? S("unmute") : S("mute"))}">${ic(state.muted ? "mute" : "volume")}</button>
                <div class="vol"><input type="range" id="pvol" min="0" max="1" step="0.05" value="${state.volume}" aria-label="${esc(S("volume"))}"><div class="aprog"><b id="paprog"></b></div></div>
                <button class="icon-btn" data-act="p-music" aria-pressed="${state.music}" aria-label="${esc(S("music"))}" title="${esc(S("music"))}">${ic("music")}</button>
              </div>

              <div class="p-controls">
                <div class="side"><button class="icon-btn" data-act="p-prev" aria-label="${esc(S("previous"))}">${ic("prev")}</button><span>${esc(S("previous"))}</span></div>
                <div class="p-main" id="pmain">
                  <svg class="timer" viewBox="0 0 104 104" aria-hidden="true"><circle class="track" cx="52" cy="52" r="49"/><circle class="arc" id="parc" cx="52" cy="52" r="49" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="0"/></svg>
                  <button id="ptoggle" data-act="p-toggle" aria-label="${esc(S("pause"))}"><span class="time" id="ptime">0:00</span>${ic("pause")}</button>
                </div>
                <div class="side"><button class="icon-btn" data-act="p-next" aria-label="${esc(S("next"))}">${ic("next")}</button><span>${esc(S("next"))}</span></div>
              </div>
            </div>

            <div class="p-scroll" id="pscroll">
              <h2 class="p-name">${esc(L(ex.name))}</h2>
              <p class="p-focus">${esc(L(ex.focus))}</p>
              <div class="var-row" role="group" aria-label="${esc(S("version"))}"><span class="lbl">${esc(S("version"))}</span>${chips}</div>
              <div class="p-fallback" id="pfallback" hidden></div>
              <div class="p-block"><h3>${esc(S("steps"))}</h3><ol class="p-steps">${v.steps[state.lang].map((s) => `<li>${esc(s)}</li>`).join("")}</ol></div>
              <div class="p-block"><h3>${esc(S("breathing"))}</h3><p class="p-note breath">${esc(L(ex.breath))}</p>${video ? "" : `<p class="p-coach">${esc(S("coachTip"))}</p>`}</div>
              <div class="p-block"><h3>${esc(S("easierOption"))}</h3><p class="p-note easy">${esc(L(ex.easier))}</p></div>
              <div class="p-block"><h3>${esc(S("safetyNote"))}</h3><p class="p-note safe">${esc(L(ex.safety))}</p></div>
            </div>
          </div>
        </div>`;
      $("#player").classList.toggle("is-prep", this.phase === "prep");
      this.updateTimer();
      this.updateNotice();
      if (this.stepBase != null) this.highlight(Voice.idx);
    }
  };

  /* ------------------------------------------------------------- events */
  document.addEventListener("click", async (e) => {
    const el = e.target.closest("[data-act]");
    if (!el) return;
    const act = el.dataset.act, id = el.dataset.id;
    switch (act) {
      case "tab": setTab(el.dataset.tab); break;
      case "scroll-tri": $("#tri-title")?.scrollIntoView({ behavior: "smooth", block: "start" }); break;
      case "lang": setLang(el.dataset.lang); break;
      case "explore": state.tri = +el.dataset.tri; state.cat = "all"; save(); setTab("workouts"); break;
      case "tri": state.tri = +el.dataset.tri; save(); render(); break;
      case "cat": state.cat = el.dataset.cat; render(); break;
      case "fav": toggleFav(id); break;
      case "open-workout": openWorkout(id); break;
      case "start": startFlow(id); break;
      case "eq": toggleEq(el.dataset.eq); break;
      case "close-top": closeTop(); break;
      case "safety": showSafety(null); break;
      case "signs": showSigns(); break;
      case "ack": {
        state.safetyAck = true; save();
        const sid = pendingStart; pendingStart = null;
        closeTop();
        if (sid) openSheet(equipHtml(sid), "equip", sid);
        break;
      }
      case "begin": {
        const w = byId(id);
        replaceTop("player");
        Player.open(w);
        break;
      }
      case "p-toggle": Player.toggle(); break;
      case "p-next": Player.next(); break;
      case "p-prev": Player.prev(); break;
      case "p-replay": if (Player.paused) Player.toggle(); Guide.replay(Player.cur); break;
      case "p-var": Player.setVariation(el.dataset.key); break;
      case "p-mute": {
        state.muted = !state.muted; save(); Guide.setMuted();
        el.setAttribute("aria-pressed", state.muted);
        el.setAttribute("aria-label", state.muted ? S("unmute") : S("mute"));
        el.innerHTML = ic(state.muted ? "mute" : "volume");
        Player.updateNotice();
        break;
      }
      case "p-music": {
        state.music = !state.music; save();
        state.music ? Music.start() : Music.stop();
        if (state.music && Player.paused) Music.suspend();
        el.setAttribute("aria-pressed", state.music);
        break;
      }
      case "p-end": if (Player.phase === "prep" && Player.i === 0 || confirm(S("endWorkout") + "?")) closeTop(); break;
      case "p-library": closeTop(); state.cat = "all"; setTab("workouts"); break;
      case "install": if (installEvt) { installEvt.prompt(); await installEvt.userChoice.catch(() => {}); installEvt = null; render(); } break;
      case "reset":
        if (confirm(S("resetConfirm"))) {
          store.clear();
          Object.assign(state, { lang: defaultLang, tri: 1, cat: "all", equipment: new Set(["mat"]), favs: new Set(), safetyAck: false, volume: 0.9, muted: false, music: false });
          render();
        }
        break;
    }
  });

  document.addEventListener("input", (e) => {
    if (e.target.id === "pvol") { state.volume = +e.target.value; Guide.setVolume(false); }
  });
  document.addEventListener("change", (e) => {
    if (e.target.id === "pvol") { state.volume = +e.target.value; save(); Guide.setVolume(true); }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && layers.length) { closeTop(); return; }
    if (!$("#player").hidden && !Player.finished && $("#modal").hidden) {
      if (e.key === " " && !/INPUT|BUTTON/.test(document.activeElement?.tagName || "")) { e.preventDefault(); Player.toggle(); }
      if (e.key === "ArrowRight") Player.next();
      if (e.key === "ArrowLeft") Player.prev();
    }
  });

  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); installEvt = e; if (state.tab === "about") render(); });

  /* --------------------------------------------------------------- start */
  Voice.init();
  Guide.init();
  render();

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
