const byId = (id) => document.getElementById(id);

// সাধারণ fetch helper: localStorage override থাকলে সেটি আগে ব্যবহার করবে
async function loadData(key, fallbackPath) {
  const saved = localStorage.getItem(key);
  if (saved) return JSON.parse(saved);
  const res = await fetch(fallbackPath);
  return res.json();
}

function cardTemplate(title, body, extra = "") {
  return `<article class="card"><h4>${title}</h4><p>${body}</p>${extra}</article>`;
}

async function renderLatestBlogs() {
  const wrap = byId("latestBlogs") || byId("blogList");
  if (!wrap) return;
  const blogs = await loadData("blogs", "../../data/blogs.json").catch(() => loadData("blogs", "data/blogs.json"));
  const list = wrap.id === "latestBlogs" ? blogs.slice(0, 3) : blogs;
  wrap.innerHTML = list
    .map(
      (b) =>
        cardTemplate(
          b.title,
          `${b.date} • ${b.summary}`,
          `<a class="btn" href="${wrap.id === "latestBlogs" ? b.filePath : "../" + b.filePath.split("pages/")[1]}">Read Article</a>`
        )
    )
    .join("");
}

async function renderEvents() {
  const wrap = byId("upcomingEvents") || byId("eventList");
  if (!wrap) return;
  const events = await loadData("tournaments", "../../data/tournaments.json").catch(() => loadData("tournaments", "data/tournaments.json"));
  if (!events.length) {
    wrap.innerHTML = cardTemplate("No Tournament Available", "বর্তমানে কোনো টুর্নামেন্ট নির্ধারিত নেই।");
    return;
  }
  wrap.innerHTML = events
    .map((e) => cardTemplate(e.name, `${e.sport} | ${e.date} | ${e.teams} | Winner: ${e.winner || "TBD"}`))
    .join("");
}

async function renderMembers() {
  const wrap = byId("memberList");
  if (!wrap) return;
  const members = await loadData("members", "../../data/members.json");
  wrap.innerHTML = members
    .map(
      (m) => `<article class="card"><img src="${m.photo}" alt="${m.name}" style="width:100%;border-radius:10px"/>
      <h4>${m.name}</h4><p>${m.role}</p><p>${m.contact}</p></article>`
    )
    .join("");
}

function setupContactValidation() {
  const form = byId("contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    const name = byId("name").value.trim();
    const email = byId("email").value.trim();
    const msg = byId("message").value.trim();
    const box = byId("contactMsg");
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || msg.length < 10) {
      e.preventDefault();
      box.textContent = "সঠিক তথ্য দিন (মেসেজ কমপক্ষে ১০ অক্ষর)।";
      box.style.color = "#f87171";
      return;
    }
    box.textContent = "Validation passed. Netlify/Google Form এ submit হবে।";
    box.style.color = "#42d392";
  });
}

function setupMenu() {
  const btn = byId("menuBtn");
  const nav = byId("mainNav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => nav.classList.toggle("show"));
}

function setupEventRegistration() {
  const form = byId("eventRegisterForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Registration received (Demo)");
    form.reset();
  });
}

byId("year") && (byId("year").textContent = new Date().getFullYear());
setupMenu();
setupContactValidation();
setupEventRegistration();
renderLatestBlogs();
renderEvents();
renderMembers();
