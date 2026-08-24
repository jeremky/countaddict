const STORAGE_KEY = "countaddict.history";
const LAST_TAP_KEY = "countaddict.lastTap";
const BEST_GAP_KEY = "countaddict.bestGap";
const ACTIVE_TYPES_KEY = "countaddict.widgets";

const CATALOG = [
  {
    key: "cigarette",
    label: "Cigarette",
    emoji: "🚬",
    addLabel: "Ajouter une cigarette",
    removeLabel: "Retirer une cigarette",
  },
  {
    key: "coffee",
    label: "Café",
    emoji: "☕",
    addLabel: "Ajouter un café",
    removeLabel: "Retirer un café",
  },
  {
    key: "tea",
    label: "Thé",
    emoji: "🍵",
    addLabel: "Ajouter un thé",
    removeLabel: "Retirer un thé",
  },
  {
    key: "alcohol",
    label: "Alcool",
    emoji: "🍺",
    addLabel: "Ajouter un verre d'alcool",
    removeLabel: "Retirer un verre d'alcool",
  },
  {
    key: "sugar",
    label: "Sucrerie",
    emoji: "🍬",
    addLabel: "Ajouter une sucrerie",
    removeLabel: "Retirer une sucrerie",
  },
  {
    key: "energy",
    label: "Énergisant",
    emoji: "⚡",
    addLabel: "Ajouter un énergisant",
    removeLabel: "Retirer un énergisant",
  },
  {
    key: "vaping",
    label: "Vapotage",
    emoji: "💨",
    addLabel: "Ajouter une vape",
    removeLabel: "Retirer une vape",
  },
  {
    key: "soda",
    label: "Soda",
    emoji: "🥤",
    addLabel: "Ajouter un soda",
    removeLabel: "Retirer un soda",
  },
];

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

function getLastTaps() {
  try {
    return JSON.parse(localStorage.getItem(LAST_TAP_KEY)) || {};
  } catch {
    return {};
  }
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
      localStorage.setItem(BEST_GAP_KEY, JSON.stringify(gaps));
    }
  }

  lastTaps[type] = now;
  localStorage.setItem(LAST_TAP_KEY, JSON.stringify(lastTaps));
}

function getLongestGaps() {
  try {
    return JSON.parse(localStorage.getItem(BEST_GAP_KEY)) || {};
  } catch {
    return {};
  }
}

function getLongestGap(type) {
  const lastTaps = getLastTaps();
  const stored = getLongestGaps()[type] || 0;
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

function toggleWidget(key, enabled) {
  const active = new Set(getActiveTypes());
  if (enabled) {
    active.add(key);
  } else {
    active.delete(key);
  }
  setActiveTypes([...active]);
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
  localStorage.setItem(LAST_TAP_KEY, JSON.stringify(lastTaps));

  const gaps = getLongestGaps();
  delete gaps[type];
  localStorage.setItem(BEST_GAP_KEY, JSON.stringify(gaps));
}

function pluralize(count, singular, plural) {
  return count === 1 ? singular : plural;
}

function formatDuration(ms) {
  const minutes = Math.floor(ms / 60000);
  if (minutes < 1) return "moins d'une minute";
  if (minutes < 60) return `${minutes} ${pluralize(minutes, "minute", "minutes")}`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours < 24) {
    const hoursPart = `${hours} ${pluralize(hours, "heure", "heures")}`;
    return remainingMinutes === 0 ? hoursPart : `${hoursPart} ${remainingMinutes} ${pluralize(remainingMinutes, "minute", "minutes")}`;
  }
  const days = Math.floor(hours / 24);
  return `${days} ${pluralize(days, "jour", "jours")}`;
}

function formatElapsed(ms) {
  const minutes = Math.floor(ms / 60000);
  if (minutes < 1) return "à l'instant";
  return `il y a ${formatDuration(ms)}`;
}

function buildCounterCard(item) {
  const card = document.createElement("div");
  card.className = `counter-card counter-${item.key}`;
  card.dataset.type = item.key;
  card.innerHTML = `
    <button class="minus-btn" data-type="${item.key}" aria-label="${item.removeLabel}">−</button>
    <button class="remove-btn" data-type="${item.key}" aria-label="Options pour ${item.label}">×</button>
    <div class="remove-menu">
      <button class="cancel-menu-btn" data-type="${item.key}" aria-label="Annuler">Annuler</button>
      <button class="archive-confirm" data-type="${item.key}" aria-label="Archiver ${item.label} (données conservées)">Archiver</button>
    </div>
    <button class="tap-btn" data-type="${item.key}" aria-label="${item.addLabel}">
      <span class="emoji">${item.emoji}</span>
      <span class="count" id="count-${item.key}">0</span>
    </button>
    <span class="counter-label">${item.label}</span>
    <span class="last-tap" id="last-${item.key}"></span>
    <span class="drag-handle" data-type="${item.key}" aria-hidden="true">⠿</span>
  `;
  return card;
}

function renderCounters() {
  const container = document.getElementById("counters");
  const types = getActiveTypes();
  container.innerHTML = "";
  container.dataset.count = Math.min(types.length, 3);
  for (const type of types) {
    container.appendChild(buildCounterCard(catalogItem(type)));
  }
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
    el.textContent = timestamp ? formatElapsed(Date.now() - timestamp) : "—";
  }
}

function renderDate() {
  const now = new Date();
  document.getElementById("today-date").textContent = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  document.getElementById("today-time").textContent = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function historyTypes() {
  const history = getHistory();
  const keys = new Set(getActiveTypes());
  for (const entry of Object.values(history)) {
    for (const key of Object.keys(entry)) keys.add(key);
  }
  return CATALOG.map((item) => item.key).filter((key) => keys.has(key));
}

function renderHistory() {
  renderMonthPicker();

  const history = getHistory();
  const allDates = Object.keys(history);
  const dates = allDates.filter((date) => !selectedMonth || date.startsWith(selectedMonth)).sort((a, b) => b.localeCompare(a));
  const types = historyTypes();
  const headRow = document.getElementById("history-head");
  const body = document.getElementById("history-body");
  const statsBody = document.getElementById("stats-body");
  const statsTable = document.getElementById("stats-table");
  const dailyTable = document.getElementById("daily-table");
  const empty = document.getElementById("empty-history");

  if (allDates.length === 0) {
    empty.classList.remove("hidden");
    statsTable.classList.add("hidden");
    dailyTable.classList.add("hidden");
    return;
  }
  empty.classList.add("hidden");
  statsTable.classList.remove("hidden");
  dailyTable.classList.remove("hidden");

  const totals = computeTotals(selectedMonth);
  statsBody.innerHTML = "";
  for (const type of types) {
    const item = catalogItem(type);
    const stat = totals.byType[type] || { total: 0, max: 0 };
    const avg = totals.days ? stat.total / totals.days : 0;
    const longestGap = getLongestGap(type);
    const row = document.createElement("tr");
    row.innerHTML = `<td>${item.emoji} ${item.label}</td><td>${avg.toFixed(1)}</td><td>${stat.total}</td><td>${stat.max}</td><td>${longestGap ? formatDuration(longestGap) : "—"}</td>`;
    statsBody.appendChild(row);
  }

  headRow.innerHTML = `<th>Date</th>${types.map((type) => `<th>${catalogItem(type).emoji}</th>`).join("")}`;
  body.innerHTML = "";

  for (const date of dates) {
    const entry = history[date];
    const row = document.createElement("tr");
    const label = new Date(`${date}T00:00:00`).toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    row.innerHTML = `<td>${label}</td>${types.map((type) => `<td>${entry[type] || 0}</td>`).join("")}`;
    body.appendChild(row);
  }
}

function computeTotals(monthFilter) {
  const history = getHistory();
  const byType = {};
  let days = 0;
  for (const [date, entry] of Object.entries(history)) {
    if (monthFilter && !date.startsWith(monthFilter)) continue;
    days += 1;
    for (const [type, count] of Object.entries(entry)) {
      const stat = byType[type] || (byType[type] = { total: 0, max: 0 });
      stat.total += count || 0;
      stat.max = Math.max(stat.max, count || 0);
    }
  }
  return { byType, days };
}

function historyMonths() {
  const months = new Set(Object.keys(getHistory()).map((date) => date.slice(0, 7)));
  return [...months].sort((a, b) => b.localeCompare(a));
}

function formatMonthLabel(month) {
  const [year, m] = month.split("-");
  const label = new Date(Number(year), Number(m) - 1, 1).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

let selectedMonth = "";

function renderMonthPicker() {
  const months = historyMonths();
  const picker = document.getElementById("month-picker");
  picker.innerHTML = "";

  if (months.length === 0) {
    picker.classList.add("hidden");
    return;
  }
  picker.classList.remove("hidden");

  const options = [{ value: "", label: "Tout" }, ...months.map((month) => ({ value: month, label: formatMonthLabel(month) }))];
  for (const option of options) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "month-chip";
    btn.classList.toggle("active", option.value === selectedMonth);
    btn.dataset.month = option.value;
    btn.textContent = option.label;
    picker.appendChild(btn);
  }
}

function renderAddMenu() {
  const active = new Set(getActiveTypes());
  const available = CATALOG.filter((item) => !active.has(item.key));
  const list = document.getElementById("add-addiction-list");
  list.innerHTML = "";

  if (available.length === 0) {
    list.innerHTML = `<p class="add-addiction-empty">Toutes les addictions disponibles sont déjà ajoutées.</p>`;
    return;
  }

  for (const item of available) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "add-addiction-row";
    btn.dataset.type = item.key;
    btn.innerHTML = `<span>${item.emoji}</span><span>${item.label}</span>`;
    list.appendChild(btn);
  }
}

function renderArchive() {
  const active = new Set(getActiveTypes());
  const archived = historyTypes().filter((type) => !active.has(type));
  const card = document.getElementById("archive-card");
  const list = document.getElementById("archive-list");
  list.innerHTML = "";

  if (archived.length === 0) {
    card.classList.add("hidden");
    return;
  }
  card.classList.remove("hidden");

  for (const type of archived) {
    const item = catalogItem(type);
    const row = document.createElement("div");
    row.className = "archive-row";
    row.innerHTML = `
      <span>${item.emoji} ${item.label}</span>
      <div class="archive-actions">
        <button class="archive-restore-btn" data-type="${item.key}">Réafficher</button>
        <button class="archive-delete-btn" data-type="${item.key}">Supprimer</button>
      </div>
    `;
    list.appendChild(row);
  }
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
      const confirmed = confirm(`Supprimer définitivement les données de ${item.label} ? Cette action est irréversible.`);
      if (!confirmed) return;
      resetType(deleteBtn.dataset.type);
      renderArchive();
    }
  });
}

function setupMonthPicker() {
  document.getElementById("month-picker").addEventListener("click", (e) => {
    const btn = e.target.closest(".month-chip");
    if (!btn) return;
    selectedMonth = btn.dataset.month;
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

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data.history || {}));
  localStorage.setItem(LAST_TAP_KEY, JSON.stringify(data.lastTaps || {}));
  localStorage.setItem(BEST_GAP_KEY, JSON.stringify(data.longestGaps || {}));
  localStorage.setItem(ACTIVE_TYPES_KEY, JSON.stringify(activeTypes));
  selectedMonth = "";

  renderCounters();
  renderToday();
  renderLastTaps();
  renderAddMenu();
  renderHistory();
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
        alert("Ce fichier n'est pas un export CountAddict valide.");
        return;
      }

      const confirmed = confirm("Importer ces données ? Elles remplaceront les données actuelles.");
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

function setupCounters() {
  const counters = document.getElementById("counters");

  counters.addEventListener("click", (e) => {
    const cancelBtn = e.target.closest(".cancel-menu-btn");
    const archiveBtn = e.target.closest(".archive-confirm");
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

    if (removeBtn) {
      removeBtn.closest(".counter-card").classList.add("confirm-remove");
      return;
    }

    const tapBtn = e.target.closest(".tap-btn");
    if (tapBtn) {
      changeToday(tapBtn.dataset.type, 1);
      recordTap(tapBtn.dataset.type);
      renderToday();
      renderLastTaps();
      bump(tapBtn);
      return;
    }

    const minusBtn = e.target.closest(".minus-btn");
    if (minusBtn) {
      changeToday(minusBtn.dataset.type, -1);
      renderToday();
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

    setActiveTypes([...counters.querySelectorAll(".counter-card")].map((card) => card.dataset.type));

    dragCard = null;
    placeholder = null;
    pointerId = null;
  }

  counters.addEventListener("pointerup", endDrag);
  counters.addEventListener("pointercancel", endDrag);
}

function setupAddAddiction() {
  document.getElementById("add-addiction-list").addEventListener("click", (e) => {
    const btn = e.target.closest(".add-addiction-row");
    if (!btn) return;
    toggleWidget(btn.dataset.type, true);
    document.getElementById("add-addiction").open = false;
    renderCounters();
    renderToday();
    renderLastTaps();
    renderAddMenu();
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
    for (const [t, view] of [[tabToday, viewToday], [tabHistory, viewHistory], [tabSettings, viewSettings]]) {
      const active = t === tab;
      t.setAttribute("aria-selected", String(active));
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
    const confirmed = confirm("Réinitialiser toutes les données ? Cette action est irréversible.");
    if (!confirmed) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LAST_TAP_KEY);
    localStorage.removeItem(BEST_GAP_KEY);
    localStorage.removeItem(ACTIVE_TYPES_KEY);
    await clearAppCache();
    location.reload();
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

renderDate();
renderCounters();
renderToday();
renderLastTaps();
renderAddMenu();
setupCounters();
setupReorder();
setupTabs();
setupAddAddiction();
setupMonthPicker();
setupExport();
setupImport();
setupArchive();
setupReset();
registerServiceWorker();
setInterval(() => {
  renderDate();
  renderLastTaps();
}, 30000);
