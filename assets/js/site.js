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
    ["About me", "about.html"],
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

    header.classList.add("home-showcase-header");
    header.innerHTML = `
      <div class="home-showcase-header-shell">
        <a class="home-showcase-brand" href="index.html" aria-label="${p.name} home">
          <span class="home-showcase-avatar"><img src="assets/images/avatar.webp" alt="Portrait of ${p.name}"></span>
          <strong>${p.name}</strong>
        </a>
        <p class="home-showcase-role">Journalist <span>•</span> Presenter <span>•</span> Producer <span>•</span> Video Editor</p>
        <div class="home-showcase-actions" aria-label="Contact links">
          <a class="home-showcase-icon home-showcase-mail" href="mailto:${p.email}" aria-label="Email ${p.name}">${icon("mail")}</a>
          <a class="home-showcase-icon home-showcase-linkedin" href="${p.linkedin}" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><span>in</span></a>
          <button class="menu-button home-showcase-menu" type="button" aria-label="Open navigation" aria-expanded="false" data-menu-open>${icon("menu")}</button>
        </div>
      </div>
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
    const cards = [
      { key: "about", title: "About me", image: "assets/images/about-portrait.webp", url: "about.html" },
      { key: "vietnam", title: "Vietnam", image: "assets/images/home-vietnam.webp", url: "vietnam.html" },
      { key: "world", title: "World", image: "assets/images/home-world.webp", url: "world.html" },
      { key: "languages", title: "Across Languages", image: "assets/images/home-languages.webp", url: "languages.html" },
      { key: "docs", title: "Documentaries", image: "assets/images/home-documentaries.webp", url: "documentaries.html" },
      { key: "camera", title: "On Camera", image: "assets/images/home-on-camera.webp", url: "on-camera.html" }
    ];

    root.innerHTML = `
      <section class="portfolio-index home-portfolio-index" aria-label="Portfolio sections">
        <div class="index-grid home-portfolio-grid">
          ${cards.map((card, index) => `
            <a class="index-card card-${card.key}" href="${card.url}">
              <img src="${card.image}" alt="${card.title}" loading="${index < 4 ? "eager" : "lazy"}">
              <span class="index-shade"></span>
              <span class="index-copy"><strong>${card.title}</strong></span>
              <span class="index-arrow">${icon("arrow")}</span>
            </a>
          `).join("")}
        </div>
      </section>
    `;
  }

  function youtubeVideoId(url = "") {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?[^#]*v=|live\/|shorts\/))([^?&#/]+)/i);
    return match ? match[1] : "";
  }

  function driveFileId(url = "") {
    const match = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
    return match ? match[1] : "";
  }

  function isDirectImageUrl(url = "") {
    try {
      const path = new URL(url, window.location.href).pathname.toLowerCase();
      return /\.(?:avif|gif|jpe?g|png|svg|webp)$/.test(path);
    } catch {
      return false;
    }
  }

  function originalThumbnailCandidates(sourceUrl, categoryCover) {
    const encoded = encodeURIComponent(sourceUrl);
    return [
      `https://api.microlink.io/?url=${encoded}&embed=image.url`,
      `https://image.microlink.io/?url=${encoded}&width=1280&height=720&fit=cover`,
      `https://s.wordpress.com/mshots/v1/${encoded}?w=1280`,
      categoryCover
    ];
  }

  function workThumbnail(item, categoryCover) {
    const customDriveId = driveFileId(item.thumbnail || "");
    if (customDriveId) {
      return {
        src: `https://drive.google.com/thumbnail?id=${customDriveId}&sz=w1600`,
        fallbacks: [categoryCover]
      };
    }

    if (item.thumbnail && isDirectImageUrl(item.thumbnail)) {
      return {
        src: item.thumbnail,
        fallbacks: [item.thumbnailFallback, categoryCover].filter(Boolean)
      };
    }

    const videoId = youtubeVideoId(item.url);
    if (videoId) {
      return {
        src: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        fallbacks: [
          `https://i.ytimg.com/vi/${videoId}/sddefault.jpg`,
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
          categoryCover
        ]
      };
    }

    const sourceUrl = item.thumbnailMode === "original"
      ? (item.thumbnailSource || item.url)
      : item.url;
    const candidates = originalThumbnailCandidates(sourceUrl, categoryCover);

    return {
      src: candidates[0],
      fallbacks: candidates.slice(1)
    };
  }

  window.__portfolioImageFallback = function portfolioImageFallback(img) {
    let fallbacks = [];
    try {
      fallbacks = JSON.parse(decodeURIComponent(img.dataset.fallbacks || "%5B%5D"));
    } catch {
      fallbacks = [];
    }

    const currentIndex = Number(img.dataset.fallbackIndex || "0");
    const nextSource = fallbacks[currentIndex];
    if (!nextSource) {
      img.onerror = null;
      return;
    }

    img.dataset.fallbackIndex = String(currentIndex + 1);
    img.src = nextSource;
  };

  function workCard(item, index, categoryCover) {
    const image = workThumbnail(item, categoryCover);
    const encodedFallbacks = encodeURIComponent(JSON.stringify(image.fallbacks || []));

    return `
      <a class="work-card reveal" href="${item.url}" target="_blank" rel="noreferrer" style="--delay:${(index % 6) * 45}ms">
        <div class="work-image">
          <img
            src="${image.src}"
            data-fallbacks="${encodedFallbacks}"
            data-fallback-index="0"
            alt="${item.title}"
            loading="${index < 6 ? "eager" : "lazy"}"
            referrerpolicy="no-referrer"
            onerror="window.__portfolioImageFallback(this)"
          >
          <span class="work-open">${icon("external")}</span>
        </div>
        <div class="work-copy">
          <h3>${item.title}</h3>
        </div>
      </a>
    `;
  }

  function buildAbout(section, root) {
    root.innerHTML = `
      <section class="about-profile-layout">
        <div class="about-mobile-heading reveal" aria-hidden="true">
          <h1>${section.title}</h1>
        </div>

        <figure class="about-profile-image reveal">
          <img src="${section.cover}" alt="Portrait of Thuong Le">
        </figure>

        <div class="about-profile-content reveal">
          <h1>${section.title}</h1>
          <p class="about-profile-intro">${section.intro}</p>

          <div class="about-biography">
            <span class="eyebrow">Biography</span>
            <div class="about-biography-copy">
              ${section.paragraphs.map(paragraph => `<p>${paragraph}</p>`).join("")}
            </div>
          </div>
        </div>
      </section>

      <section class="gallery-section about-gallery-section" aria-labelledby="about-gallery-title">
        <div class="about-gallery-heading reveal">
          <h2 id="about-gallery-title">Reporting across formats</h2>
        </div>
        <div class="editorial-gallery about-gallery-grid">
          ${section.gallery.map((item, index) => `
            <figure class="reveal gallery-item gallery-item-${index + 1}" style="--delay:${index * 45}ms">
              <img src="${item.image}" alt="${item.alt}" loading="lazy">
            </figure>
          `).join("")}
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
          <h1>${section.title}</h1>
          <p>${section.intro}</p>
        </div>
      </section>

      <section class="works-section category-work-list" aria-label="${section.title} portfolio">
        <div class="work-grid">
          ${section.works.map((item, index) => workCard(item, index, section.cover)).join("")}
        </div>
      </section>
    `;
  }

  function buildFooter() {
    const footer = $("[data-footer]");
    if (!footer) return;
    if (document.body.dataset.page === "home") {
      footer.hidden = true;
      footer.innerHTML = "";
      return;
    }

    footer.hidden = false;
    footer.classList.add("minimal-footer");
    footer.innerHTML = `
      <div class="minimal-footer-shell">
        <a class="minimal-home-button" href="index.html">Back to home ${icon("arrow")}</a>
      </div>
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
