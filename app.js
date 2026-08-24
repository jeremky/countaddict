const STORAGE_KEY = "countaddict.history";
const TYPES = ["cigarettes", "coffees"];

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
  return history[todayKey()] || { cigarettes: 0, coffees: 0 };
}

function changeToday(type, delta) {
  const history = getHistory();
  const key = todayKey();
  const entry = history[key] || { cigarettes: 0, coffees: 0 };
  entry[type] = Math.max(0, (entry[type] || 0) + delta);
  history[key] = entry;
  saveHistory(history);
  return entry;
}

function renderToday() {
  const entry = getTodayEntry();
  for (const type of TYPES) {
    document.getElementById(`count-${type}`).textContent = entry[type];
    document.querySelector(`.minus-btn[data-type="${type}"]`).disabled = entry[type] === 0;
  }
}

function renderDate() {
  const el = document.getElementById("today-date");
  el.textContent = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function renderHistory() {
  const history = getHistory();
  const dates = Object.keys(history).sort((a, b) => b.localeCompare(a));
  const body = document.getElementById("history-body");
  const empty = document.getElementById("empty-history");
  body.innerHTML = "";

  if (dates.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  for (const date of dates) {
    const entry = history[date];
    const row = document.createElement("tr");
    const label = new Date(`${date}T00:00:00`).toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    row.innerHTML = `<td>${label}</td><td>${entry.cigarettes || 0}</td><td>${entry.coffees || 0}</td>`;
    body.appendChild(row);
  }
}

function bump(button) {
  button.classList.remove("bump");
  void button.offsetWidth;
  button.classList.add("bump");
}

function setupCounters() {
  document.querySelectorAll(".tap-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      changeToday(btn.dataset.type, 1);
      renderToday();
      bump(btn);
    });
  });

  document.querySelectorAll(".minus-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      changeToday(btn.dataset.type, -1);
      renderToday();
    });
  });
}

function setupTabs() {
  const tabToday = document.getElementById("tab-today");
  const tabHistory = document.getElementById("tab-history");
  const viewToday = document.getElementById("view-today");
  const viewHistory = document.getElementById("view-history");

  function showToday() {
    tabToday.setAttribute("aria-selected", "true");
    tabHistory.setAttribute("aria-selected", "false");
    viewToday.classList.remove("hidden");
    viewHistory.classList.add("hidden");
  }

  function showHistory() {
    tabToday.setAttribute("aria-selected", "false");
    tabHistory.setAttribute("aria-selected", "true");
    viewToday.classList.add("hidden");
    viewHistory.classList.remove("hidden");
    renderHistory();
  }

  tabToday.addEventListener("click", showToday);
  tabHistory.addEventListener("click", showHistory);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

renderDate();
renderToday();
setupCounters();
setupTabs();
registerServiceWorker();
