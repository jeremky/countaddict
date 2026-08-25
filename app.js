const STORAGE_KEY = "countaddict.history";
const LAST_TAP_KEY = "countaddict.lastTap";
const BEST_GAP_KEY = "countaddict.bestGap";
const ACTIVE_TYPES_KEY = "countaddict.widgets";
const ARCHIVE_DATE_KEY = "countaddict.archivedAt";
const LANG_KEY = "countaddict.lang";

const CATALOG = [
  { key: "cigarette", emoji: "🚬" },
  { key: "coffee", emoji: "☕" },
  { key: "tea", emoji: "🍵" },
  { key: "alcohol", emoji: "🍺" },
  { key: "sugar", emoji: "🍬" },
  { key: "energy", emoji: "⚡" },
  { key: "vaping", emoji: "💨" },
  { key: "soda", emoji: "🥤" },
  { key: "shopping", emoji: "🛍️" },
  { key: "travel", emoji: "✈️" },
  { key: "snack", emoji: "🍿" },
  { key: "cbd", emoji: "🌿" },
];

const LOCALES = { fr: "fr-FR", en: "en-US" };

const TRANSLATIONS = {
  fr: {
    tabToday: "Aujourd'hui",
    tabHistory: "Historique",
    tabSettings: "Réglages",
    addAddiction: "+ Ajouter une addiction",
    addAddictionEmpty: "Toutes les addictions disponibles sont déjà ajoutées.",
    cancel: "Annuler",
    archive: "Archiver",
    delete: "Supprimer",
    optionsFor: (label) => `Options pour ${label}`,
    archiveAria: (label) => `Archiver ${label} (données conservées)`,
    deleteAria: (label) => `Supprimer ${label} (irréversible)`,
    historyDate: "Date",
    statsAddiction: "Addiction",
    statsAvg: "Moyenne",
    statsTotal: "Total",
    statsMax: "Max",
    statsTrend: "Tendance",
    statsBestGap: "Pause max",
    emptyHistory: "Pas encore d'historique.",
    rangeThisWeek: "Cette semaine",
    rangeThisMonth: "Ce mois-ci",
    rangeLast6Months: "6 mois",
    rangeLastYear: "1 an",
    rangeAll: "Tout",
    settingsDataTitle: "Mes données",
    settingsDataHint: "Exporte une copie de toutes tes données au format JSON.",
    exportBtn: "Exporter mes données",
    settingsImportHint: "Restaure des données depuis un fichier exporté précédemment.",
    importBtn: "Importer mes données",
    archiveTitle: "Archives",
    archiveHint: "Addictions retirées de l'accueil, données conservées.",
    archiveRestore: "Réafficher",
    archiveDelete: "Supprimer",
    archivedOn: (date) => `Archivé le ${date}`,
    resetTitle: "Réinitialisation",
    resetHint: "Efface définitivement l'historique et les compteurs du jour, puis recharge l'application.",
    resetBtn: "Réinitialiser toutes les données",
    languageTitle: "Langue",
    languageHint: "Choisis la langue de l'interface.",
    aboutTitle: "À propos",
    aboutTagline: "Un compteur minimaliste pour suivre tes habitudes, un tap à la fois.",
    aboutPrivacy: "Toutes les données restent sur cet appareil — aucun compte, aucun cloud.",
    confirmDeleteType: (label) => `Supprimer définitivement les données de ${label} ? Cette action est irréversible.`,
    confirmImport: "Importer ces données ? Elles remplaceront les données actuelles.",
    invalidImport: "Ce fichier n'est pas un export CountAddict valide.",
    confirmReset: "Réinitialiser toutes les données ? Cette action est irréversible.",
    justNow: "à l'instant",
    timeAgo: (d) => `il y a ${d}`,
    lessThanMinute: "moins d'une minute",
    minute: "minute",
    minutes: "minutes",
    hour: "heure",
    hours: "heures",
    day: "jour",
    days: "jours",
    dashPlaceholder: "—",
    catalog: {
      cigarette: { label: "Cigarette", addLabel: "Ajouter une cigarette", removeLabel: "Retirer une cigarette" },
      coffee: { label: "Café", addLabel: "Ajouter un café", removeLabel: "Retirer un café" },
      tea: { label: "Thé", addLabel: "Ajouter un thé", removeLabel: "Retirer un thé" },
      alcohol: { label: "Alcool", addLabel: "Ajouter un verre d'alcool", removeLabel: "Retirer un verre d'alcool" },
      sugar: { label: "Sucrerie", addLabel: "Ajouter une sucrerie", removeLabel: "Retirer une sucrerie" },
      energy: { label: "Énergisant", addLabel: "Ajouter un énergisant", removeLabel: "Retirer un énergisant" },
      vaping: { label: "Vapotage", addLabel: "Ajouter une vape", removeLabel: "Retirer une vape" },
      soda: { label: "Soda", addLabel: "Ajouter un soda", removeLabel: "Retirer un soda" },
      shopping: { label: "Achat", addLabel: "Ajouter un achat", removeLabel: "Retirer un achat" },
      travel: { label: "Voyage", addLabel: "Ajouter un voyage", removeLabel: "Retirer un voyage" },
      snack: { label: "Grignotage", addLabel: "Ajouter un grignotage", removeLabel: "Retirer un grignotage" },
      cbd: { label: "CBD", addLabel: "Ajouter un CBD", removeLabel: "Retirer un CBD" },
    },
  },
  en: {
    tabToday: "Today",
    tabHistory: "History",
    tabSettings: "Settings",
    addAddiction: "+ Add an addiction",
    addAddictionEmpty: "All available addictions have already been added.",
    cancel: "Cancel",
    archive: "Archive",
    delete: "Delete",
    optionsFor: (label) => `Options for ${label}`,
    archiveAria: (label) => `Archive ${label} (data kept)`,
    deleteAria: (label) => `Delete ${label} (irreversible)`,
    historyDate: "Date",
    statsAddiction: "Addiction",
    statsAvg: "Average",
    statsTotal: "Total",
    statsMax: "Max",
    statsTrend: "Trend",
    statsBestGap: "Longest gap",
    emptyHistory: "No history yet.",
    rangeThisWeek: "This week",
    rangeThisMonth: "This month",
    rangeLast6Months: "6 months",
    rangeLastYear: "1 year",
    rangeAll: "All",
    settingsDataTitle: "My data",
    settingsDataHint: "Export a copy of all your data as JSON.",
    exportBtn: "Export my data",
    settingsImportHint: "Restore data from a previously exported file.",
    importBtn: "Import my data",
    archiveTitle: "Archive",
    archiveHint: "Addictions removed from the home screen, data kept.",
    archiveRestore: "Restore",
    archiveDelete: "Delete",
    archivedOn: (date) => `Archived on ${date}`,
    resetTitle: "Reset",
    resetHint: "Permanently erases the history and today's counters, then reloads the app.",
    resetBtn: "Reset all data",
    languageTitle: "Language",
    languageHint: "Choose the interface language.",
    aboutTitle: "About",
    aboutTagline: "A minimalist counter to track your habits, one tap at a time.",
    aboutPrivacy: "All data stays on this device — no account, no cloud.",
    confirmDeleteType: (label) => `Permanently delete data for ${label}? This action is irreversible.`,
    confirmImport: "Import this data? It will replace your current data.",
    invalidImport: "This file is not a valid CountAddict export.",
    confirmReset: "Reset all data? This action is irreversible.",
    justNow: "just now",
    timeAgo: (d) => `${d} ago`,
    lessThanMinute: "less than a minute",
    minute: "minute",
    minutes: "minutes",
    hour: "hour",
    hours: "hours",
    day: "day",
    days: "days",
    dashPlaceholder: "—",
    catalog: {
      cigarette: { label: "Cigarette", addLabel: "Add a cigarette", removeLabel: "Remove a cigarette" },
      coffee: { label: "Coffee", addLabel: "Add a coffee", removeLabel: "Remove a coffee" },
      tea: { label: "Tea", addLabel: "Add a tea", removeLabel: "Remove a tea" },
      alcohol: { label: "Alcohol", addLabel: "Add a drink", removeLabel: "Remove a drink" },
      sugar: { label: "Sweets", addLabel: "Add a sweet", removeLabel: "Remove a sweet" },
      energy: { label: "Energy drink", addLabel: "Add an energy drink", removeLabel: "Remove an energy drink" },
      vaping: { label: "Vaping", addLabel: "Add a vape", removeLabel: "Remove a vape" },
      soda: { label: "Soda", addLabel: "Add a soda", removeLabel: "Remove a soda" },
      shopping: { label: "Shopping", addLabel: "Add a purchase", removeLabel: "Remove a purchase" },
      travel: { label: "Travel", addLabel: "Add a trip", removeLabel: "Remove a trip" },
      snack: { label: "Snacking", addLabel: "Add a snack", removeLabel: "Remove a snack" },
      cbd: { label: "CBD", addLabel: "Add a CBD", removeLabel: "Remove a CBD" },
    },
  },
};

function getLang() {
  const lang = localStorage.getItem(LANG_KEY);
  return lang === "en" ? "en" : "fr";
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang === "en" ? "en" : "fr");
}

function t(key) {
  return TRANSLATIONS[getLang()][key];
}

function tc(type, field) {
  return TRANSLATIONS[getLang()].catalog[type][field];
}

function applyTranslations() {
  document.documentElement.lang = getLang();
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = t(el.dataset.i18n);
    if (typeof value === "string") el.textContent = value;
  });
}

function catalogItem(type) {
  return CATALOG.find((item) => item.key === type);
}

function todayKey() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now - offset).toISOString().slice(0, 10);
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveHistory(history) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

function getTodayEntry() {
  const history = getHistory();
  return history[todayKey()] || {};
}

function changeToday(type, delta) {
  const history = getHistory();
  const key = todayKey();
  const entry = history[key] || {};
  entry[type] = Math.max(0, (entry[type] || 0) + delta);
  history[key] = entry;
  saveHistory(history);
  return entry;
}

function typeEverUsed(type, history = getHistory()) {
  return Object.values(history).some((entry) => (entry[type] || 0) > 0);
}

function getLastTaps() {
  try {
    return JSON.parse(localStorage.getItem(LAST_TAP_KEY)) || {};
  } catch {
    return {};
  }
}

function saveLastTaps(lastTaps) {
  localStorage.setItem(LAST_TAP_KEY, JSON.stringify(lastTaps));
}

function getLongestGaps() {
  try {
    return JSON.parse(localStorage.getItem(BEST_GAP_KEY)) || {};
  } catch {
    return {};
  }
}

function saveLongestGaps(gaps) {
  localStorage.setItem(BEST_GAP_KEY, JSON.stringify(gaps));
}

function recordTap(type) {
  const lastTaps = getLastTaps();
  const previous = lastTaps[type];
  const now = Date.now();

  if (previous) {
    const gap = now - previous;
    const gaps = getLongestGaps();
    if (gap > (gaps[type] || 0)) {
      gaps[type] = gap;
      saveLongestGaps(gaps);
    }
  }

  lastTaps[type] = now;
  saveLastTaps(lastTaps);
}

function getLongestGap(type, lastTaps = getLastTaps(), gaps = getLongestGaps()) {
  const stored = gaps[type] || 0;
  const ongoing = lastTaps[type] ? Date.now() - lastTaps[type] : 0;
  return Math.max(stored, ongoing);
}

function getActiveTypes() {
  try {
    return JSON.parse(localStorage.getItem(ACTIVE_TYPES_KEY)) || [];
  } catch {
    return [];
  }
}

function setActiveTypes(types) {
  localStorage.setItem(ACTIVE_TYPES_KEY, JSON.stringify(types));
}

function getArchiveDates() {
  try {
    return JSON.parse(localStorage.getItem(ARCHIVE_DATE_KEY)) || {};
  } catch {
    return {};
  }
}

function toggleWidget(key, enabled) {
  const active = new Set(getActiveTypes());
  const archiveDates = getArchiveDates();
  if (enabled) {
    active.add(key);
    delete archiveDates[key];
  } else {
    active.delete(key);
    archiveDates[key] = todayKey();
  }
  setActiveTypes([...active]);
  localStorage.setItem(ARCHIVE_DATE_KEY, JSON.stringify(archiveDates));
}

function resetType(type) {
  const history = getHistory();
  for (const [date, entry] of Object.entries(history)) {
    delete entry[type];
    if (Object.keys(entry).length === 0) delete history[date];
  }
  saveHistory(history);

  const lastTaps = getLastTaps();
  delete lastTaps[type];
  saveLastTaps(lastTaps);

  const gaps = getLongestGaps();
  delete gaps[type];
  saveLongestGaps(gaps);

  const archiveDates = getArchiveDates();
  delete archiveDates[type];
  localStorage.setItem(ARCHIVE_DATE_KEY, JSON.stringify(archiveDates));
}

function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}

function formatDuration(ms) {
  const minutes = Math.floor(ms / 60000);
  if (minutes < 1) return t("lessThanMinute");
  if (minutes < 60) return `${minutes} ${pluralize(minutes, t("minute"), t("minutes"))}`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours < 24) {
    const hoursPart = `${hours} ${pluralize(hours, t("hour"), t("hours"))}`;
    return remainingMinutes === 0 ? hoursPart : `${hoursPart} ${remainingMinutes} ${pluralize(remainingMinutes, t("minute"), t("minutes"))}`;
  }
  const days = Math.floor(hours / 24);
  return `${days} ${pluralize(days, t("day"), t("days"))}`;
}

function formatElapsed(ms) {
  const minutes = Math.floor(ms / 60000);
  if (minutes < 1) return t("justNow");
  return t("timeAgo")(formatDuration(ms));
}

function buildCounterCard(item, history) {
  const label = tc(item.key, "label");
  const hasActivity = typeEverUsed(item.key, history);

  const card = document.createElement("div");
  card.className = `counter-card counter-${item.key}`;
  card.dataset.type = item.key;
  card.innerHTML = `
    <button class="minus-btn" data-type="${item.key}" aria-label="${tc(item.key, "removeLabel")}">−</button>
    <button class="remove-btn" data-type="${item.key}" aria-label="${t("optionsFor")(label)}">×</button>
    <div class="remove-menu">
      <button class="cancel-menu-btn" data-type="${item.key}" aria-label="${t("cancel")}">${t("cancel")}</button>
      <button class="archive-btn${hasActivity ? "" : " hidden"}" data-type="${item.key}" aria-label="${t("archiveAria")(label)}">${t("archive")}</button>
      <button class="delete-btn" data-type="${item.key}" data-confirm="${hasActivity ? "1" : "0"}" aria-label="${t("deleteAria")(label)}">${t("delete")}</button>
    </div>
    <button class="tap-btn" data-type="${item.key}" aria-label="${tc(item.key, "addLabel")}">
      <span class="emoji">${item.emoji}</span>
      <span class="count" id="count-${item.key}">0</span>
    </button>
    <span class="counter-label">${label}</span>
    <span class="last-tap" id="last-${item.key}"></span>
    <span class="drag-handle" data-type="${item.key}" aria-hidden="true">⠿</span>
  `;
  return card;
}

function renderCounters() {
  const container = document.getElementById("counters");
  const types = getActiveTypes();
  const history = getHistory();
  const fragment = document.createDocumentFragment();
  for (const type of types) {
    fragment.appendChild(buildCounterCard(catalogItem(type), history));
  }
  container.innerHTML = "";
  container.appendChild(fragment);
}

function renderToday() {
  const entry = getTodayEntry();
  for (const type of getActiveTypes()) {
    document.getElementById(`count-${type}`).textContent = entry[type] || 0;
    document.querySelector(`.minus-btn[data-type="${type}"]`).disabled = !entry[type];
  }
}

function renderLastTaps() {
  const lastTaps = getLastTaps();
  for (const type of getActiveTypes()) {
    const el = document.getElementById(`last-${type}`);
    const timestamp = lastTaps[type];
    el.textContent = timestamp ? formatElapsed(Date.now() - timestamp) : t("dashPlaceholder");
  }
}

function renderDate() {
  const now = new Date();
  const locale = LOCALES[getLang()];
  document.getElementById("today-date").textContent = now.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  document.getElementById("today-time").textContent = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function historyTypes() {
  const active = new Set(getActiveTypes());
  return CATALOG.map((item) => item.key).filter((key) => active.has(key));
}

function buildSparkline(values) {
  if (values.length < 2) return t("dashPlaceholder");
  const width = 60;
  const height = 20;
  const max = Math.max(...values, 1);
  const step = width / (values.length - 1);
  const points = values
    .map((v, i) => `${(i * step).toFixed(1)},${(height - (v / max) * height).toFixed(1)}`)
    .join(" ");
  return `<svg class="sparkline" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true"><polyline points="${points}" /></svg>`;
}

function renderHistory() {
  const history = getHistory();
  renderRangePicker(history);

  const allDates = Object.keys(history);
  const dates = allDates.filter((date) => matchesRange(date, selectedRange)).sort((a, b) => b.localeCompare(a));
  const trendDates = [...dates].sort((a, b) => a.localeCompare(b));
  const types = historyTypes();
  const headRow = document.getElementById("history-head");
  const body = document.getElementById("history-body");
  const statsBody = document.getElementById("stats-body");
  const statsTable = document.getElementById("stats-table");
  const dailyTable = document.getElementById("daily-table");
  const empty = document.getElementById("empty-history");
  const locale = LOCALES[getLang()];

  if (allDates.length === 0) {
    empty.classList.remove("hidden");
    statsTable.classList.add("hidden");
    dailyTable.classList.add("hidden");
    return;
  }
  empty.classList.add("hidden");
  statsTable.classList.remove("hidden");
  dailyTable.classList.remove("hidden");

  const totals = computeTotals(selectedRange, history);
  const lastTaps = getLastTaps();
  const gaps = getLongestGaps();
  const statsFragment = document.createDocumentFragment();
  for (const type of types) {
    const item = catalogItem(type);
    const stat = totals.byType[type] || { total: 0, max: 0 };
    const avg = totals.days ? stat.total / totals.days : 0;
    const longestGap = getLongestGap(type, lastTaps, gaps);
    const trend = buildSparkline(trendDates.map((date) => history[date][type] || 0));
    const row = document.createElement("tr");
    row.innerHTML = `<td>${item.emoji} ${tc(type, "label")}</td><td>${avg.toFixed(1)}</td><td>${stat.total}</td><td>${stat.max}</td><td>${trend}</td><td>${longestGap ? formatDuration(longestGap) : t("dashPlaceholder")}</td>`;
    statsFragment.appendChild(row);
  }
  statsBody.innerHTML = "";
  statsBody.appendChild(statsFragment);

  headRow.innerHTML = `<th>${t("historyDate")}</th>${types.map((type) => `<th>${catalogItem(type).emoji}</th>`).join("")}`;

  const bodyFragment = document.createDocumentFragment();
  for (const date of dates) {
    const entry = history[date];
    const row = document.createElement("tr");
    const label = new Date(`${date}T00:00:00`).toLocaleDateString(locale, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    row.innerHTML = `<td>${label}</td>${types.map((type) => `<td>${entry[type] || 0}</td>`).join("")}`;
    bodyFragment.appendChild(row);
  }
  body.innerHTML = "";
  body.appendChild(bodyFragment);
}

function computeTotals(range, history = getHistory()) {
  const byType = {};
  let days = 0;
  for (const [date, entry] of Object.entries(history)) {
    if (!matchesRange(date, range)) continue;
    days += 1;
    for (const [type, count] of Object.entries(entry)) {
      const stat = byType[type] || (byType[type] = { total: 0, max: 0 });
      stat.total += count || 0;
      stat.max = Math.max(stat.max, count || 0);
    }
  }
  return { byType, days };
}

function dateKeyMonthsAgo(months) {
  const now = new Date();
  now.setMonth(now.getMonth() - months);
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now - offset).toISOString().slice(0, 10);
}

function currentWeekStartKey() {
  const now = new Date();
  const day = now.getDay();
  const diffToMonday = day === 0 ? 6 : day - 1;
  now.setDate(now.getDate() - diffToMonday);
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now - offset).toISOString().slice(0, 10);
}

function matchesRange(date, range) {
  if (range === "week") return date >= currentWeekStartKey();
  if (range === "month") return date.slice(0, 7) === todayKey().slice(0, 7);
  if (range === "6m") return date >= dateKeyMonthsAgo(6);
  if (range === "1y") return date >= dateKeyMonthsAgo(12);
  return true;
}

const HISTORY_RANGES = [
  { value: "week", key: "rangeThisWeek" },
  { value: "month", key: "rangeThisMonth" },
  { value: "6m", key: "rangeLast6Months" },
  { value: "1y", key: "rangeLastYear" },
  { value: "", key: "rangeAll" },
];

const DEFAULT_RANGE = "week";
let selectedRange = DEFAULT_RANGE;

function renderRangePicker(history = getHistory()) {
  const picker = document.getElementById("month-picker");

  if (Object.keys(history).length === 0) {
    picker.innerHTML = "";
    picker.classList.add("hidden");
    return;
  }
  picker.classList.remove("hidden");

  const fragment = document.createDocumentFragment();
  for (const option of HISTORY_RANGES) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "month-chip";
    btn.classList.toggle("active", option.value === selectedRange);
    btn.dataset.range = option.value;
    btn.textContent = t(option.key);
    fragment.appendChild(btn);
  }
  picker.innerHTML = "";
  picker.appendChild(fragment);
}

function renderAddMenu() {
  const active = new Set(getActiveTypes());
  const available = CATALOG.filter((item) => !active.has(item.key)).sort((a, b) =>
    tc(a.key, "label").localeCompare(tc(b.key, "label"), LOCALES[getLang()])
  );
  const list = document.getElementById("add-addiction-list");
  list.innerHTML = "";

  if (available.length === 0) {
    list.innerHTML = `<p class="add-addiction-empty">${t("addAddictionEmpty")}</p>`;
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const item of available) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "add-addiction-row";
    btn.dataset.type = item.key;
    btn.innerHTML = `<span>${item.emoji}</span><span>${tc(item.key, "label")}</span>`;
    fragment.appendChild(btn);
  }
  list.appendChild(fragment);
}

function renderArchive() {
  const active = new Set(getActiveTypes());
  const archiveDates = getArchiveDates();
  const archived = CATALOG.map((item) => item.key).filter((key) => !active.has(key) && archiveDates[key]);
  const card = document.getElementById("archive-card");
  const list = document.getElementById("archive-list");
  list.innerHTML = "";

  if (archived.length === 0) {
    card.classList.add("hidden");
    return;
  }
  card.classList.remove("hidden");

  const locale = LOCALES[getLang()];
  const fragment = document.createDocumentFragment();
  for (const type of archived) {
    const item = catalogItem(type);
    const dateLabel = new Date(`${archiveDates[type]}T00:00:00`).toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const row = document.createElement("div");
    row.className = "archive-row";
    row.innerHTML = `
      <div class="archive-info">
        <span>${item.emoji} ${tc(type, "label")}</span>
        <span class="archive-date">${t("archivedOn")(dateLabel)}</span>
      </div>
      <div class="archive-actions">
        <button class="archive-restore-btn" data-type="${item.key}">${t("archiveRestore")}</button>
        <button class="archive-delete-btn" data-type="${item.key}">${t("archiveDelete")}</button>
      </div>
    `;
    fragment.appendChild(row);
  }
  list.appendChild(fragment);
}

function setupArchive() {
  document.getElementById("archive-list").addEventListener("click", (e) => {
    const restoreBtn = e.target.closest(".archive-restore-btn");
    if (restoreBtn) {
      toggleWidget(restoreBtn.dataset.type, true);
      renderCounters();
      renderToday();
      renderLastTaps();
      renderAddMenu();
      renderArchive();
      return;
    }

    const deleteBtn = e.target.closest(".archive-delete-btn");
    if (deleteBtn) {
      const item = catalogItem(deleteBtn.dataset.type);
      const confirmed = confirm(t("confirmDeleteType")(tc(item.key, "label")));
      if (!confirmed) return;
      resetType(deleteBtn.dataset.type);
      renderArchive();
    }
  });
}

function setupRangePicker() {
  document.getElementById("month-picker").addEventListener("click", (e) => {
    const btn = e.target.closest(".month-chip");
    if (!btn) return;
    selectedRange = btn.dataset.range;
    renderHistory();
  });
}

function exportData() {
  const data = {
    exportedAt: new Date().toISOString(),
    history: getHistory(),
    lastTaps: getLastTaps(),
    longestGaps: getLongestGaps(),
    activeTypes: getActiveTypes(),
    archiveDates: getArchiveDates(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `countaddict-${todayKey()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function setupExport() {
  document.getElementById("export-btn").addEventListener("click", exportData);
}

function importData(data) {
  const knownKeys = new Set(CATALOG.map((item) => item.key));
  const activeTypes = Array.isArray(data.activeTypes) ? data.activeTypes.filter((key) => knownKeys.has(key)) : [];
  const archiveDates = {};
  if (data.archiveDates && typeof data.archiveDates === "object") {
    for (const [key, date] of Object.entries(data.archiveDates)) {
      if (knownKeys.has(key)) archiveDates[key] = date;
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data.history || {}));
  localStorage.setItem(LAST_TAP_KEY, JSON.stringify(data.lastTaps || {}));
  localStorage.setItem(BEST_GAP_KEY, JSON.stringify(data.longestGaps || {}));
  localStorage.setItem(ACTIVE_TYPES_KEY, JSON.stringify(activeTypes));
  localStorage.setItem(ARCHIVE_DATE_KEY, JSON.stringify(archiveDates));
  selectedRange = DEFAULT_RANGE;

  renderCounters();
  renderToday();
  renderLastTaps();
  renderAddMenu();
  renderHistory();
  renderArchive();
}

function setupImport() {
  const fileInput = document.getElementById("import-file");
  document.getElementById("import-btn").addEventListener("click", () => fileInput.click());

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      let data;
      try {
        data = JSON.parse(reader.result);
      } catch {
        data = null;
      }

      fileInput.value = "";

      if (!data || typeof data !== "object" || !data.history) {
        alert(t("invalidImport"));
        return;
      }

      const confirmed = confirm(t("confirmImport"));
      if (!confirmed) return;

      importData(data);
    };
    reader.readAsText(file);
  });
}

function bump(button) {
  button.classList.remove("bump");
  void button.offsetWidth;
  button.classList.add("bump");
  button.addEventListener("animationend", () => button.classList.remove("bump"), { once: true });
}

const lastTapUndo = {};

function setupCounters() {
  const counters = document.getElementById("counters");

  counters.addEventListener("click", (e) => {
    const cancelBtn = e.target.closest(".cancel-menu-btn");
    const archiveBtn = e.target.closest(".archive-btn");
    const deleteBtn = e.target.closest(".delete-btn");
    const removeBtn = e.target.closest(".remove-btn");

    // tout clic hors du menu ouvert le referme
    counters.querySelectorAll(".counter-card.confirm-remove").forEach((card) => {
      if (!card.querySelector(".remove-menu").contains(e.target)) card.classList.remove("confirm-remove");
    });

    if (cancelBtn) {
      cancelBtn.closest(".counter-card").classList.remove("confirm-remove");
      return;
    }

    if (archiveBtn) {
      toggleWidget(archiveBtn.dataset.type, false);
      renderCounters();
      renderToday();
      renderLastTaps();
      renderAddMenu();
      return;
    }

    if (deleteBtn) {
      const type = deleteBtn.dataset.type;
      // confirmation uniquement si des clics ont déjà été enregistrés sur cette bulle (données à perdre)
      if (deleteBtn.dataset.confirm === "1") {
        const confirmed = confirm(t("confirmDeleteType")(tc(type, "label")));
        if (!confirmed) return;
      }
      resetType(type);
      const active = new Set(getActiveTypes());
      active.delete(type);
      setActiveTypes([...active]);
      renderCounters();
      renderToday();
      renderLastTaps();
      renderAddMenu();
      return;
    }

    if (removeBtn) {
      const card = removeBtn.closest(".counter-card");
      const type = removeBtn.dataset.type;
      const hasActivity = typeEverUsed(type);
      card.querySelector(".archive-btn").classList.toggle("hidden", !hasActivity);
      card.querySelector(".delete-btn").dataset.confirm = hasActivity ? "1" : "0";
      card.classList.add("confirm-remove");
      return;
    }

    const tapBtn = e.target.closest(".tap-btn");
    if (tapBtn) {
      const type = tapBtn.dataset.type;
      lastTapUndo[type] = { prevLastTap: getLastTaps()[type] ?? null, prevBestGap: getLongestGaps()[type] ?? null };
      changeToday(type, 1);
      recordTap(type);
      renderToday();
      renderLastTaps();
      bump(tapBtn);
      return;
    }

    const minusBtn = e.target.closest(".minus-btn");
    if (minusBtn) {
      const type = minusBtn.dataset.type;
      changeToday(type, -1);

      const undo = lastTapUndo[type];
      if (undo) {
        const lastTaps = getLastTaps();
        if (undo.prevLastTap === null) delete lastTaps[type];
        else lastTaps[type] = undo.prevLastTap;
        saveLastTaps(lastTaps);

        const gaps = getLongestGaps();
        if (undo.prevBestGap === null) delete gaps[type];
        else gaps[type] = undo.prevBestGap;
        saveLongestGaps(gaps);

        delete lastTapUndo[type];
      }

      renderToday();
      renderLastTaps();
    }
  });

  document.addEventListener("click", (e) => {
    if (counters.contains(e.target)) return;
    counters.querySelectorAll(".counter-card.confirm-remove").forEach((card) => card.classList.remove("confirm-remove"));
  });
}

function setupReorder() {
  const counters = document.getElementById("counters");
  let dragCard = null;
  let placeholder = null;
  let pointerId = null;
  let offsetX = 0;
  let offsetY = 0;

  counters.addEventListener("pointerdown", (e) => {
    const handle = e.target.closest(".drag-handle");
    if (!handle) return;

    dragCard = handle.closest(".counter-card");
    pointerId = e.pointerId;
    dragCard.setPointerCapture(pointerId);

    const rect = dragCard.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    placeholder = document.createElement("div");
    placeholder.className = "counter-card-placeholder";
    placeholder.style.width = `${rect.width}px`;
    placeholder.style.height = `${rect.height}px`;
    dragCard.after(placeholder);

    dragCard.classList.add("dragging");
    dragCard.style.width = `${rect.width}px`;
    dragCard.style.left = `${rect.left}px`;
    dragCard.style.top = `${rect.top}px`;
    document.body.classList.add("dragging-active");

    e.preventDefault();
  });

  counters.addEventListener("pointermove", (e) => {
    if (!dragCard || e.pointerId !== pointerId) return;
    e.preventDefault();
    dragCard.style.left = `${e.clientX - offsetX}px`;
    dragCard.style.top = `${e.clientY - offsetY}px`;

    for (const card of counters.querySelectorAll(".counter-card")) {
      if (card === dragCard) continue;
      const rect = card.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) continue;
      const placeholderIsBefore = !!(placeholder.compareDocumentPosition(card) & Node.DOCUMENT_POSITION_FOLLOWING);
      if (placeholderIsBefore) {
        card.after(placeholder);
      } else {
        card.before(placeholder);
      }
      break;
    }
  });

  function endDrag(e) {
    if (!dragCard || e.pointerId !== pointerId) return;
    placeholder.replaceWith(dragCard);
    dragCard.classList.remove("dragging");
    dragCard.style.width = "";
    dragCard.style.left = "";
    dragCard.style.top = "";
    document.body.classList.remove("dragging-active");

    setActiveTypes([...counters.querySelectorAll(".counter-card")].map((card) => card.dataset.type));

    dragCard = null;
    placeholder = null;
    pointerId = null;
  }

  counters.addEventListener("pointerup", endDrag);
  counters.addEventListener("pointercancel", endDrag);
}

function setupAddAddiction() {
  const details = document.getElementById("add-addiction");

  document.getElementById("add-addiction-list").addEventListener("click", (e) => {
    const btn = e.target.closest(".add-addiction-row");
    if (!btn) return;
    toggleWidget(btn.dataset.type, true);
    details.open = false;
    renderCounters();
    renderToday();
    renderLastTaps();
    renderAddMenu();
  });

  document.addEventListener("click", (e) => {
    if (details.open && !details.contains(e.target)) details.open = false;
  });
}

function setupTabs() {
  const tabToday = document.getElementById("tab-today");
  const tabHistory = document.getElementById("tab-history");
  const tabSettings = document.getElementById("tab-settings");
  const viewToday = document.getElementById("view-today");
  const viewHistory = document.getElementById("view-history");
  const viewSettings = document.getElementById("view-settings");

  function select(tab) {
    for (const [tabBtn, view] of [[tabToday, viewToday], [tabHistory, viewHistory], [tabSettings, viewSettings]]) {
      const active = tabBtn === tab;
      tabBtn.setAttribute("aria-selected", String(active));
      view.classList.toggle("hidden", !active);
    }
  }

  tabToday.addEventListener("click", () => select(tabToday));
  tabHistory.addEventListener("click", () => {
    select(tabHistory);
    renderHistory();
  });
  tabSettings.addEventListener("click", () => {
    select(tabSettings);
    renderArchive();
  });
}

function setupLanguage() {
  const buttons = document.querySelectorAll(".lang-btn");

  function refreshButtons() {
    const lang = getLang();
    buttons.forEach((btn) => btn.classList.toggle("active", btn.dataset.lang === lang));
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.lang === getLang()) return;
      setLang(btn.dataset.lang);
      refreshButtons();
      applyTranslations();
      renderDate();
      renderCounters();
      renderToday();
      renderLastTaps();
      renderAddMenu();
      renderArchive();
      renderHistory();
    });
  });

  refreshButtons();
}

async function clearAppCache() {
  if ("caches" in window) {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
  }
  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(registrations.map((registration) => registration.unregister()));
  }
}

function setupReset() {
  document.getElementById("reset-btn").addEventListener("click", async () => {
    const confirmed = confirm(t("confirmReset"));
    if (!confirmed) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LAST_TAP_KEY);
    localStorage.removeItem(BEST_GAP_KEY);
    localStorage.removeItem(ACTIVE_TYPES_KEY);
    localStorage.removeItem(ARCHIVE_DATE_KEY);
    await clearAppCache();
    location.reload();
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

applyTranslations();
renderDate();
renderCounters();
renderToday();
renderLastTaps();
renderAddMenu();
setupCounters();
setupReorder();
setupTabs();
setupAddAddiction();
setupRangePicker();
setupExport();
setupImport();
setupArchive();
setupLanguage();
setupReset();
registerServiceWorker();

function tick() {
  renderDate();
  renderLastTaps();
}

let tickInterval = setInterval(tick, 30000);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearInterval(tickInterval);
  } else {
    tick();
    tickInterval = setInterval(tick, 30000);
  }
});
