# Elite Sports Club Starter Template + Master Plan

## 1) Directory ও File Structure

```text
Index.html/
├── index.html                    # Home page
├── README.md                     # Master plan + setup + deploy guide
├── assets/
│   ├── css/
│   │   └── style.css             # Premium UI, animation, responsive rules
│   └── js/
│       ├── script.js             # Public pages dynamic rendering + validation
│       └── admin.js              # Admin login + dashboard data management
├── data/
│   ├── blogs.json                # Blog data source
│   ├── tournaments.json          # Tournament data source
│   └── members.json              # Committee members data source
└── pages/
    ├── contact.html              # Contact form (Netlify ready)
    ├── about/
    │   └── about.html            # About + members + donor info
    ├── blogs/
    │   ├── blogs.html            # Blog listing page
    │   └── post-1.html           # Sample HTML blog post
    ├── events/
    │   └── events.html           # Event listing + optional registration
    └── admin/
        ├── login.html            # Demo admin login
        └── dashboard.html        # Add blog/tournament/member (localStorage)
```

## 2) File Manager / Directory সাজানোর নির্দেশনা

- `assets/` এ শুধু static file রাখুন (CSS, JS, images, icons)।
- `data/` এ JSON data রাখুন, যাতে non-developer-ও সহজে update করতে পারে।
- `pages/` এ feature অনুযায়ী sub-folder করুন (`blogs`, `about`, `events`, `admin`)।
- Future feature (gallery, achievements, payments) যোগ করলে `pages/<feature>/` + `data/<feature>.json` pattern follow করুন।

## 3) Dynamic Content কাজের Flow

1. `script.js` প্রথমে `localStorage` data চেক করে (Admin এডিট থাকলে সেটি পাবে)।
2. যদি local data না থাকে, `data/*.json` fetch করে content render করে।
3. Home page তে latest 3 blog এবং upcoming events render হয়।
4. About page তে committee members render হয়।

## 4) CSS Animation + Hover (Mobile Friendly)

- `fade-in` class দিয়ে smooth entrance animation।
- `.card:hover` এ lift effect + glow shadow (desktop এ premium অনুভূতি)।
- `@media (max-width: 768px)` এ nav collapse হয়ে mobile menu হয়।

## 5) VS Code এ Run করার ধাপ

1. VS Code খুলুন -> `File > Open Folder` -> `Index.html` folder open করুন।
2. Recommended extensions install করুন:
   - **Live Server** (Ritwick Dey)
   - **Prettier - Code formatter**
   - **JSON Crack / JSON Viewer** (যেকোনো একটি)
3. `index.html` ওপেন করে **Go Live** চাপুন।
4. Browser এ Home, About, Blogs, Events, Contact, Admin flow test করুন।

## 6) Windows settings / best practice

- VS Code setting: `Format On Save` enable করুন।
- Terminal encoding UTF-8 রাখুন (বাংলা comment ঠিকমতো দেখানোর জন্য)।
- Chrome DevTools দিয়ে mobile view test করুন (375px, 768px breakpoint)।

## 7) Future-proof architecture plan

- **Stage-1 (Current):** Static + JSON + LocalStorage admin demo
- **Stage-2:** Netlify Functions / Google Apps Script API যুক্ত করে server-side JSON update
- **Stage-3:** Auth (JWT/Firebase), image upload, role-based access
- **Stage-4:** Analytics + SEO + performance optimization

## 8) Free Hosting Deploy Guide

### Netlify (Recommended)
1. GitHub repo push করুন।
2. Netlify -> Add new site -> Import from Git।
3. Build command empty, Publish directory `/`.
4. Deploy সম্পন্ন হলে URL পাবেন।
5. Custom domain যুক্ত করতে Domain settings থেকে connect করুন।

### InfinityFree
1. InfinityFree account open করুন।
2. Control panel থেকে domain/subdomain তৈরি করুন।
3. File Manager/FTP দিয়ে সব file `htdocs` এ upload করুন।
4. `index.html` root এ আছে কি না নিশ্চিত করুন।

> নোট: বর্তমান demo admin client-side localStorage ব্যবহার করে। Multi-user production এর জন্য backend/API দরকার।
