(() => {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const icons = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m6 6-6-6 6-6"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z"/><path d="m4 7 8 6 8-6"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9v10M6 5v.01M10 19v-6a4 4 0 0 1 8 0v6M10 9v10"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-9 9"/><path d="M19 13v6H5V5h6"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 7 8 5-8 5z"/></svg>'
  };
  const icon = name => icons[name] || "";

  const categoryLinks = [
    ["About", "about.html"],
    ["Vietnam", "vietnam.html"],
    ["World", "world.html"],
    ["On Camera", "on-camera.html"],
    ["Documentaries", "documentaries.html"],
    ["Across Languages", "languages.html"]
  ];

  function buildHeader() {
    const p = data.profile;
    const header = $("[data-site-header]");
    if (!header) return;
    const home = document.body.dataset.page === "home";

    header.innerHTML = `
      <div class="header-shell">
        <a class="brand" href="index.html" aria-label="${p.name} home">
          <span class="brand-mark">TL</span>
          <span class="brand-copy"><strong>${p.name}</strong><small>${p.shortRole}</small></span>
        </a>
        <nav class="header-nav" aria-label="Main navigation">
          <a href="vietnam.html">Reporting</a>
          <a href="documentaries.html">Documentaries</a>
          <a href="about.html">About</a>
        </nav>
        <div class="header-actions">
          <a class="header-contact" href="mailto:${p.email}">Contact</a>
          <button class="menu-button" type="button" aria-label="Open navigation" aria-expanded="false" data-menu-open>${icon("menu")}</button>
        </div>
      </div>
      ${home ? "" : `<a class="back-home" href="index.html">${icon("back")}<span>Portfolio index</span></a>`}
    `;
  }

  function buildMenu() {
    const p = data.profile;
    const menu = $("[data-menu]");
    if (!menu) return;

    menu.innerHTML = `
      <div class="menu-panel" role="dialog" aria-modal="true" aria-label="Portfolio navigation">
        <div class="menu-topline">
          <span>${p.name}</span>
          <button type="button" class="menu-button menu-close" aria-label="Close navigation" data-menu-close>${icon("close")}</button>
        </div>
        <nav class="overlay-nav">
          ${categoryLinks.map(([label, url], index) => `
            <a href="${url}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${label}</strong>${icon("arrow")}</a>
          `).join("")}
        </nav>
        <div class="menu-foot">
          <p>${p.substatement}</p>
          <div>
            <a href="mailto:${p.email}">${p.email}</a>
            <a href="${p.linkedin}" target="_blank" rel="noreferrer">LinkedIn ${icon("external")}</a>
          </div>
        </div>
      </div>
    `;

    const openButton = $("[data-menu-open]");
    const closeButton = $("[data-menu-close]");
    const open = () => {
      menu.classList.add("is-open");
      document.body.classList.add("menu-open");
      openButton?.setAttribute("aria-expanded", "true");
      closeButton?.focus();
    };
    const close = () => {
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      openButton?.setAttribute("aria-expanded", "false");
      openButton?.focus();
    };
    openButton?.addEventListener("click", open);
    closeButton?.addEventListener("click", close);
    menu.addEventListener("click", event => { if (event.target === menu) close(); });
    document.addEventListener("keydown", event => { if (event.key === "Escape" && menu.classList.contains("is-open")) close(); });
  }

  function buildHome() {
    const root = $("[data-home]");
    if (!root) return;
    const p = data.profile;
    const cards = [
      { key: "about", title: "About", note: "Profile and editorial perspective", image: "assets/images/about-portrait.webp", url: "about.html" },
      { key: "vietnam", title: "Vietnam", note: "Politics, society, culture, and economy", image: "assets/images/home-vietnam.webp", url: "vietnam.html" },
      { key: "world", title: "World", note: "Regional stories in global context", image: "assets/images/home-world.webp", url: "world.html" },
      { key: "camera", title: "On Camera", note: "Presenting, explainers, and field reporting", image: "assets/images/home-on-camera.webp", url: "on-camera.html" },
      { key: "docs", title: "Documentaries", note: "Research-led long-form storytelling", image: "assets/images/home-documentaries.webp", url: "documentaries.html" },
      { key: "languages", title: "Across Languages", note: "Stories reaching audiences across cultures", image: "assets/images/home-languages.webp", url: "languages.html" }
    ];

    root.innerHTML = `
      <section class="editorial-hero">
        <div class="hero-copy reveal">
          <span class="eyebrow">${p.scholarshipLabel}</span>
          <h1>${p.statement}</h1>
          <p class="hero-role">${p.role}</p>
          <p class="hero-intro">${p.substatement}</p>
          <div class="hero-actions">
            <a class="button button-dark" href="#portfolio">Explore selected work ${icon("arrow")}</a>
            <a class="button button-quiet" href="mailto:${p.email}">Get in touch</a>
          </div>
        </div>
        <div class="hero-collage reveal" aria-label="Selected portfolio imagery">
          <figure class="hero-image hero-image-main"><img src="assets/images/about-portrait.webp" alt="Portrait of Thuong Le"></figure>
          <figure class="hero-image hero-image-top"><img src="assets/images/home-on-camera.webp" alt="Thuong Le presenting and reporting"></figure>
          <figure class="hero-image hero-image-bottom"><img src="assets/images/home-vietnam.webp" alt="Vietnam reporting"></figure>
          <span class="hero-caption">Reporting · Presenting · Producing · Editing</span>
        </div>
      </section>

      <section class="credentials reveal" aria-label="Professional highlights">
        <div><strong>10+</strong><span>years of international media experience</span></div>
        <div><strong>BBC</strong><span>news, audio, documentary, and digital video</span></div>
        <div><strong>SEA</strong><span>Vietnam and Southeast Asia through a global lens</span></div>
      </section>

      <section class="portfolio-index" id="portfolio" aria-labelledby="portfolio-title">
        <div class="index-heading reveal">
          <span class="eyebrow">Selected portfolio</span>
          <h2 id="portfolio-title">A body of work across formats and borders.</h2>
        </div>
        <div class="index-grid">
          ${cards.map((card, index) => `
            <a class="index-card card-${card.key} reveal" href="${card.url}" style="--delay:${index * 55}ms">
              <img src="${card.image}" alt="${card.title}" loading="${index < 3 ? "eager" : "lazy"}">
              <span class="index-shade"></span>
              <span class="index-number">${String(index + 1).padStart(2, "0")}</span>
              <span class="index-copy"><strong>${card.title}</strong><small>${card.note}</small></span>
              <span class="index-arrow">${icon("arrow")}</span>
            </a>
          `).join("")}
        </div>
      </section>

      <section class="fellowship-statement reveal">
        <span class="eyebrow">Editorial purpose</span>
        <blockquote>“I want to make complex regional stories clear, human, and meaningful to audiences beyond borders.”</blockquote>
        <a href="about.html">Read the profile ${icon("arrow")}</a>
      </section>
    `;
  }

  function workCard(item, index) {
    const featured = index === 0 ? " is-featured" : "";
    return `
      <a class="work-card${featured} reveal" href="${item.url}" target="_blank" rel="noreferrer" style="--delay:${(index % 6) * 55}ms">
        <div class="work-image">
          <img src="${item.image}" alt="${item.title}" loading="${index < 2 ? "eager" : "lazy"}">
          <span class="work-index">${String(index + 1).padStart(2, "0")}</span>
          <span class="work-open">${icon("external")}</span>
        </div>
        <div class="work-copy">
          <span class="work-meta">${item.meta}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <span class="work-link">${item.linkLabel} ${icon("arrow")}</span>
        </div>
      </a>
    `;
  }

  function buildAbout(section, root) {
    root.innerHTML = `
      <section class="about-masthead">
        <div class="about-image reveal"><img src="${section.cover}" alt="Portrait of Thuong Le"></div>
        <div class="about-title reveal">
          <span class="eyebrow">${section.eyebrow}</span>
          <h1>${section.title}<em>${section.accent}</em></h1>
          <p>${section.intro}</p>
          <div class="about-actions">
            <a class="button button-dark" href="mailto:${data.profile.email}">Contact ${icon("arrow")}</a>
            <a class="button button-quiet" href="${data.profile.linkedin}" target="_blank" rel="noreferrer">LinkedIn ${icon("external")}</a>
          </div>
        </div>
      </section>

      <section class="about-editorial">
        <div class="about-prose reveal">
          <span class="eyebrow">Biography</span>
          ${section.paragraphs.map(p => `<p>${p}</p>`).join("")}
        </div>
        <aside class="about-focus reveal">
          <span class="eyebrow">Areas of focus</span>
          <div class="focus-list">${section.focus.map(item => `<span>${item}</span>`).join("")}</div>
          <blockquote>Journalism grounded in evidence, strengthened by empathy, and designed to travel across cultures.</blockquote>
        </aside>
      </section>

      <section class="metrics-grid">
        ${section.metrics.map(([number, label], index) => `
          <div class="metric reveal" style="--delay:${index * 80}ms"><strong>${number}</strong><span>${label}</span></div>
        `).join("")}
      </section>

      <section class="gallery-section">
        <div class="section-intro reveal">
          <span class="eyebrow">In the field</span>
          <h2>Reporting across formats.</h2>
          <p>Studio presentation, interviews, production, and international field reporting.</p>
        </div>
        <div class="editorial-gallery">
          ${section.gallery.map((item, index) => `<figure class="reveal gallery-${index + 1}" style="--delay:${index * 45}ms"><img src="${item.image}" alt="${item.alt}" loading="lazy"></figure>`).join("")}
        </div>
      </section>
    `;
  }

  function buildCategory() {
    const root = $("[data-category-page]");
    if (!root) return;
    const key = document.body.dataset.category;
    const section = data.categories[key];
    if (!section) return;

    document.title = `${section.title} — ${data.profile.name}`;
    if (key === "about") {
      buildAbout(section, root);
      return;
    }

    root.innerHTML = `
      <section class="category-masthead reveal">
        <img src="${section.cover}" alt="${section.title} portfolio cover">
        <span class="category-overlay"></span>
        <div class="category-heading">
          <span class="eyebrow">${section.eyebrow}</span>
          <h1>${section.title}</h1>
          <p>${section.intro}</p>
        </div>
        <span class="category-count">${String(section.works.length).padStart(2, "0")} selected works</span>
      </section>

      <section class="works-section" aria-labelledby="selected-work-title">
        <div class="section-intro reveal">
          <span class="eyebrow">Portfolio</span>
          <h2 id="selected-work-title">Selected work.</h2>
          <p>Articles, audio, documentaries, interviews, and presenter-led video.</p>
        </div>
        <div class="work-grid">${section.works.map(workCard).join("")}</div>
      </section>
    `;
  }

  function buildFooter() {
    const footer = $("[data-footer]");
    if (!footer) return;
    const p = data.profile;
    footer.innerHTML = `
      <div class="footer-shell">
        <div class="footer-title">
          <span class="eyebrow">Get in touch</span>
          <h2>Stories worth telling.</h2>
          <p>Available for scholarship, fellowship, journalism, production, and speaking opportunities.</p>
        </div>
        <div class="footer-links">
          <a href="mailto:${p.email}"><span>Email</span><strong>${p.email}</strong>${icon("arrow")}</a>
          <a href="${p.linkedin}" target="_blank" rel="noreferrer"><span>Professional profile</span><strong>LinkedIn</strong>${icon("external")}</a>
        </div>
      </div>
      <div class="footer-bottom"><span>${p.copyright}</span><span>${p.location}</span><a href="index.html">Back to home</a></div>
    `;
  }

  function revealOnScroll() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(item => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
    items.forEach(item => observer.observe(item));
  }

  buildHeader();
  buildMenu();
  buildHome();
  buildCategory();
  buildFooter();
  revealOnScroll();
})();
