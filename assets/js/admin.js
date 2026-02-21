const ADMIN_KEY = "clubAdminAuth";
const byId = (id) => document.getElementById(id);

// লগইন guard
if (location.pathname.includes("dashboard") && localStorage.getItem(ADMIN_KEY) !== "ok") {
  location.href = "login.html";
}

const loginForm = byId("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const u = byId("adminUser").value.trim();
    const p = byId("adminPass").value.trim();
    if (u === "admin" && p === "1234") {
      localStorage.setItem(ADMIN_KEY, "ok");
      location.href = "dashboard.html";
    } else {
      byId("loginMsg").textContent = "ভুল ইউজারনেম বা পাসওয়ার্ড";
    }
  });
}

const logout = byId("logoutBtn");
logout?.addEventListener("click", () => {
  localStorage.removeItem(ADMIN_KEY);
  location.href = "login.html";
});

function pushToLocalStorage(key, payload) {
  const arr = JSON.parse(localStorage.getItem(key) || "[]");
  arr.unshift(payload);
  localStorage.setItem(key, JSON.stringify(arr));
}

// নতুন ব্লগ যোগ
byId("blogAdminForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  pushToLocalStorage("blogs", {
    id: Date.now(),
    title: byId("blogTitle").value,
    date: byId("blogDate").value,
    summary: byId("blogSummary").value,
    filePath: byId("blogFile").value
  });
  alert("Blog saved to localStorage. Production-এ JSON/API আপডেট করুন।");
  e.target.reset();
});

// নতুন টুর্নামেন্ট যোগ
byId("eventAdminForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  pushToLocalStorage("tournaments", {
    id: Date.now(),
    name: byId("eventName").value,
    sport: byId("eventSport").value,
    date: byId("eventDate").value,
    teams: byId("eventTeams").value,
    winner: byId("eventWinner").value
  });
  alert("Tournament saved to localStorage.");
  e.target.reset();
});

// নতুন কমিটি সদস্য যোগ
byId("memberAdminForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  pushToLocalStorage("members", {
    id: Date.now(),
    name: byId("memberName").value,
    role: byId("memberRole").value,
    contact: byId("memberContact").value,
    photo: byId("memberPhoto").value
  });
  alert("Member saved to localStorage.");
  e.target.reset();
});
