(() => {
  "use strict";

  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);

  const assetVersion = "20260802-responsive";
  const versionedAsset = src => /^assets\//.test(src) ? `${src}?v=${assetVersion}` : src;

  const localImageManifest = {"assets/images/about-drive-01.webp":{"width":1900,"height":1425,"variants":[{"src":"assets/images/about-drive-01-480.webp","width":480},{"src":"assets/images/about-drive-01-960.webp","width":960},{"src":"assets/images/about-drive-01-1600.webp","width":1600},{"src":"assets/images/about-drive-01.webp","width":1900}]},"assets/images/about-drive-02.webp":{"width":960,"height":1280,"variants":[{"src":"assets/images/about-drive-02-480.webp","width":480},{"src":"assets/images/about-drive-02.webp","width":960}]},"assets/images/about-drive-03.webp":{"width":1900,"height":1424,"variants":[{"src":"assets/images/about-drive-03-480.webp","width":480},{"src":"assets/images/about-drive-03-960.webp","width":960},{"src":"assets/images/about-drive-03-1600.webp","width":1600},{"src":"assets/images/about-drive-03.webp","width":1900}]},"assets/images/about-drive-04.webp":{"width":1900,"height":1425,"variants":[{"src":"assets/images/about-drive-04-480.webp","width":480},{"src":"assets/images/about-drive-04-960.webp","width":960},{"src":"assets/images/about-drive-04-1600.webp","width":1600},{"src":"assets/images/about-drive-04.webp","width":1900}]},"assets/images/about-drive-05.webp":{"width":1425,"height":1900,"variants":[{"src":"assets/images/about-drive-05-480.webp","width":480},{"src":"assets/images/about-drive-05-960.webp","width":960},{"src":"assets/images/about-drive-05.webp","width":1425}]},"assets/images/about-drive-06.webp":{"width":1116,"height":623,"variants":[{"src":"assets/images/about-drive-06-480.webp","width":480},{"src":"assets/images/about-drive-06-960.webp","width":960},{"src":"assets/images/about-drive-06.webp","width":1116}]},"assets/images/about-drive-07.webp":{"width":1900,"height":1068,"variants":[{"src":"assets/images/about-drive-07-480.webp","width":480},{"src":"assets/images/about-drive-07-960.webp","width":960},{"src":"assets/images/about-drive-07-1600.webp","width":1600},{"src":"assets/images/about-drive-07.webp","width":1900}]},"assets/images/about-drive-08.webp":{"width":1900,"height":1074,"variants":[{"src":"assets/images/about-drive-08-480.webp","width":480},{"src":"assets/images/about-drive-08-960.webp","width":960},{"src":"assets/images/about-drive-08-1600.webp","width":1600},{"src":"assets/images/about-drive-08.webp","width":1900}]},"assets/images/about-drive-09.webp":{"width":1900,"height":1022,"variants":[{"src":"assets/images/about-drive-09-480.webp","width":480},{"src":"assets/images/about-drive-09-960.webp","width":960},{"src":"assets/images/about-drive-09-1600.webp","width":1600},{"src":"assets/images/about-drive-09.webp","width":1900}]},"assets/images/about-drive-10.webp":{"width":1386,"height":840,"variants":[{"src":"assets/images/about-drive-10-480.webp","width":480},{"src":"assets/images/about-drive-10-960.webp","width":960},{"src":"assets/images/about-drive-10.webp","width":1386}]},"assets/images/about-drive-11.webp":{"width":591,"height":1280,"variants":[{"src":"assets/images/about-drive-11-480.webp","width":480},{"src":"assets/images/about-drive-11.webp","width":591}]},"assets/images/about-drive-12.webp":{"width":960,"height":1280,"variants":[{"src":"assets/images/about-drive-12-480.webp","width":480},{"src":"assets/images/about-drive-12.webp","width":960}]},"assets/images/about-drive-13.webp":{"width":1280,"height":960,"variants":[{"src":"assets/images/about-drive-13-480.webp","width":480},{"src":"assets/images/about-drive-13-960.webp","width":960},{"src":"assets/images/about-drive-13.webp","width":1280}]},"assets/images/about-drive-14.webp":{"width":1280,"height":960,"variants":[{"src":"assets/images/about-drive-14-480.webp","width":480},{"src":"assets/images/about-drive-14-960.webp","width":960},{"src":"assets/images/about-drive-14.webp","width":1280}]},"assets/images/about-drive-15.webp":{"width":1280,"height":960,"variants":[{"src":"assets/images/about-drive-15-480.webp","width":480},{"src":"assets/images/about-drive-15-960.webp","width":960},{"src":"assets/images/about-drive-15.webp","width":1280}]},"assets/images/about-gallery-01.webp":{"width":1200,"height":1680,"variants":[{"src":"assets/images/about-gallery-01-480.webp","width":480},{"src":"assets/images/about-gallery-01-960.webp","width":960},{"src":"assets/images/about-gallery-01.webp","width":1200}]},"assets/images/about-gallery-02.webp":{"width":960,"height":1600,"variants":[{"src":"assets/images/about-gallery-02-480.webp","width":480},{"src":"assets/images/about-gallery-02.webp","width":960}]},"assets/images/about-gallery-03.webp":{"width":1280,"height":1600,"variants":[{"src":"assets/images/about-gallery-03-480.webp","width":480},{"src":"assets/images/about-gallery-03-960.webp","width":960},{"src":"assets/images/about-gallery-03.webp","width":1280}]},"assets/images/about-gallery-04.webp":{"width":2100,"height":900,"variants":[{"src":"assets/images/about-gallery-04-480.webp","width":480},{"src":"assets/images/about-gallery-04-960.webp","width":960},{"src":"assets/images/about-gallery-04-1600.webp","width":1600},{"src":"assets/images/about-gallery-04.webp","width":2100}]},"assets/images/about-gallery-05.webp":{"width":1400,"height":1400,"variants":[{"src":"assets/images/about-gallery-05-480.webp","width":480},{"src":"assets/images/about-gallery-05-960.webp","width":960},{"src":"assets/images/about-gallery-05.webp","width":1400}]},"assets/images/about-gallery-06.webp":{"width":2100,"height":1200,"variants":[{"src":"assets/images/about-gallery-06-480.webp","width":480},{"src":"assets/images/about-gallery-06-960.webp","width":960},{"src":"assets/images/about-gallery-06-1600.webp","width":1600},{"src":"assets/images/about-gallery-06.webp","width":2100}]},"assets/images/about-portrait.webp":{"width":1367,"height":2048,"variants":[{"src":"assets/images/about-portrait-480.webp","width":480},{"src":"assets/images/about-portrait-960.webp","width":960},{"src":"assets/images/about-portrait.webp","width":1367}]},"assets/images/avatar.webp":{"width":647,"height":647,"variants":[{"src":"assets/images/avatar-480.webp","width":480},{"src":"assets/images/avatar.webp","width":647}]},"assets/images/home-documentaries.webp":{"width":1024,"height":480,"variants":[{"src":"assets/images/home-documentaries-480.webp","width":480},{"src":"assets/images/home-documentaries-960.webp","width":960},{"src":"assets/images/home-documentaries.webp","width":1024}]},"assets/images/home-languages.webp":{"width":2047,"height":1365,"variants":[{"src":"assets/images/home-languages-480.webp","width":480},{"src":"assets/images/home-languages-960.webp","width":960},{"src":"assets/images/home-languages-1600.webp","width":1600},{"src":"assets/images/home-languages.webp","width":2047}]},"assets/images/home-on-camera.webp":{"width":1366,"height":768,"variants":[{"src":"assets/images/home-on-camera-480.webp","width":480},{"src":"assets/images/home-on-camera-960.webp","width":960},{"src":"assets/images/home-on-camera.webp","width":1366}]},"assets/images/home-vietnam.webp":{"width":2048,"height":1365,"variants":[{"src":"assets/images/home-vietnam-480.webp","width":480},{"src":"assets/images/home-vietnam-960.webp","width":960},{"src":"assets/images/home-vietnam-1600.webp","width":1600},{"src":"assets/images/home-vietnam.webp","width":2048}]},"assets/images/home-world.webp":{"width":2048,"height":1365,"variants":[{"src":"assets/images/home-world-480.webp","width":480},{"src":"assets/images/home-world-960.webp","width":960},{"src":"assets/images/home-world-1600.webp","width":1600},{"src":"assets/images/home-world.webp","width":2048}]},"assets/images/interview-event.webp":{"width":640,"height":480,"variants":[{"src":"assets/images/interview-event-480.webp","width":480},{"src":"assets/images/interview-event.webp","width":640}]},"assets/images/language-mundo-south-china-sea.webp":{"width":261,"height":217,"variants":[{"src":"assets/images/language-mundo-south-china-sea.webp","width":261}]},"assets/images/production-studio.webp":{"width":672,"height":896,"variants":[{"src":"assets/images/production-studio-480.webp","width":480},{"src":"assets/images/production-studio.webp","width":672}]},"assets/images/profile-bbc.webp":{"width":534,"height":800,"variants":[{"src":"assets/images/profile-bbc-480.webp","width":480},{"src":"assets/images/profile-bbc.webp","width":534}]},"assets/images/reporting-bbc-building.webp":{"width":480,"height":640,"variants":[{"src":"assets/images/reporting-bbc-building.webp","width":480}]},"assets/images/reporting-field.webp":{"width":665,"height":373,"variants":[{"src":"assets/images/reporting-field-480.webp","width":480},{"src":"assets/images/reporting-field.webp","width":665}]},"assets/images/reporting-sydney.webp":{"width":665,"height":376,"variants":[{"src":"assets/images/reporting-sydney-480.webp","width":480},{"src":"assets/images/reporting-sydney.webp","width":665}]},"assets/images/world-fire-horse.webp":{"width":282,"height":223,"variants":[{"src":"assets/images/world-fire-horse.webp","width":282}]}};

  const icons = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z"/><path d="m4 7 8 6 8-6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-9 9"/><path d="M19 13v6H5V5h6"/></svg>'
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

  function imageAttributes(src, options = {}) {
    const {
      alt = "",
      sizes = "100vw",
      priority = false,
      lazy = true,
      className = ""
    } = options;
    const information = localImageManifest[src];
    const attributes = [
      `src="${escapeHtml(versionedAsset(src))}"`,
      `alt="${escapeHtml(alt)}"`,
      `decoding="async"`,
      `loading="${priority || !lazy ? "eager" : "lazy"}"`
    ];

    if (className) attributes.push(`class="${escapeHtml(className)}"`);
    if (priority) attributes.push('fetchpriority="high"');
    if (information) {
      attributes.push(`width="${information.width}"`, `height="${information.height}"`);
      if (information.variants?.length > 1) {
        attributes.push(
          `srcset="${information.variants.map(item => `${versionedAsset(item.src)} ${item.width}w`).join(", ")}"`,
          `sizes="${escapeHtml(sizes)}"`
        );
      }
    }
    return attributes.join(" ");
  }

  function buildHeader() {
    const profile = data.profile;
    const header = $("[data-site-header]");
    if (!header) return;

    header.classList.add("home-showcase-header");
    header.innerHTML = `
      <div class="home-showcase-header-shell">
        <a class="home-showcase-brand" href="index.html" aria-label="${escapeHtml(profile.name)} home">
          <span class="home-showcase-avatar"><img ${imageAttributes("assets/images/avatar.webp", { alt: `Portrait of ${profile.name}`, sizes: "44px", priority: true })}></span>
          <strong>${escapeHtml(profile.name)}</strong>
        </a>
        <p class="home-showcase-role">Journalist <span>•</span> Presenter <span>•</span> Producer <span>•</span> Video Editor</p>
        <div class="home-showcase-actions" aria-label="Contact links">
          <a class="home-showcase-icon home-showcase-mail" href="mailto:${escapeHtml(profile.email)}" aria-label="Email ${escapeHtml(profile.name)}">${icon("mail")}</a>
          <a class="home-showcase-icon home-showcase-linkedin" href="${escapeHtml(profile.linkedin)}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"><span>in</span></a>
          <button class="menu-button home-showcase-menu" type="button" aria-label="Open navigation" aria-expanded="false" data-menu-open>${icon("menu")}</button>
        </div>
      </div>
    `;
  }

  function buildMenu() {
    const profile = data.profile;
    const menu = $("[data-menu]");
    if (!menu) return;

    menu.setAttribute("aria-hidden", "true");
    menu.innerHTML = `
      <div class="menu-panel" role="dialog" aria-modal="true" aria-label="Portfolio navigation">
        <div class="menu-topline">
          <span>${escapeHtml(profile.name)}</span>
          <button type="button" class="menu-button menu-close" aria-label="Close navigation" data-menu-close>${icon("close")}</button>
        </div>
        <nav class="overlay-nav">
          ${categoryLinks.map(([label, url], index) => `
            <a href="${url}"><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(label)}</strong>${icon("arrow")}</a>
          `).join("")}
        </nav>
        <div class="menu-foot">
          <p>${escapeHtml(profile.substatement)}</p>
          <div>
            <a href="mailto:${escapeHtml(profile.email)}">${escapeHtml(profile.email)}</a>
            <a href="${escapeHtml(profile.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ${icon("external")}</a>
          </div>
        </div>
      </div>
    `;

    const openButton = $("[data-menu-open]");
    const closeButton = $("[data-menu-close]");
    const panel = $(".menu-panel", menu);
    let previousFocus = null;

    const open = () => {
      previousFocus = document.activeElement;
      menu.classList.add("is-open");
      menu.setAttribute("aria-hidden", "false");
      document.body.classList.add("menu-open");
      openButton?.setAttribute("aria-expanded", "true");
      closeButton?.focus();
    };
    const close = () => {
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      document.body.classList.remove("menu-open");
      openButton?.setAttribute("aria-expanded", "false");
      (previousFocus || openButton)?.focus();
    };

    openButton?.addEventListener("click", open);
    closeButton?.addEventListener("click", close);
    menu.addEventListener("click", event => { if (event.target === menu) close(); });
    document.addEventListener("keydown", event => {
      if (!menu.classList.contains("is-open")) return;
      if (event.key === "Escape") close();
      if (event.key !== "Tab") return;
      const focusable = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', panel);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
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
      <section class="home-portfolio-index" aria-label="Portfolio sections">
        <div class="home-portfolio-grid">
          ${cards.map((card, index) => `
            <a class="index-card card-${card.key}" href="${card.url}">
              <img ${imageAttributes(card.image, {
                alt: card.title,
                sizes: "(max-width: 767px) calc(100vw - 24px), (max-width: 1099px) calc(50vw - 24px), 60vw",
                priority: index === 0,
                lazy: index !== 0
              })}>
              <span class="index-shade"></span>
              <span class="index-copy"><strong>${escapeHtml(card.title)}</strong></span>
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
      return { src: `https://drive.google.com/thumbnail?id=${customDriveId}&sz=w1600`, fallbacks: [categoryCover] };
    }
    if (item.thumbnail && isDirectImageUrl(item.thumbnail)) {
      return { src: item.thumbnail, fallbacks: [item.thumbnailFallback, categoryCover].filter(Boolean) };
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
    const sourceUrl = item.thumbnailMode === "original" ? (item.thumbnailSource || item.url) : item.url;
    const candidates = originalThumbnailCandidates(sourceUrl, categoryCover);
    return { src: candidates[0], fallbacks: candidates.slice(1) };
  }

  window.__portfolioImageFallback = function portfolioImageFallback(img) {
    let fallbacks = [];
    try { fallbacks = JSON.parse(decodeURIComponent(img.dataset.fallbacks || "%5B%5D")); } catch { fallbacks = []; }
    const currentIndex = Number(img.dataset.fallbackIndex || "0");
    const nextSource = fallbacks[currentIndex];
    if (!nextSource) { img.onerror = null; return; }
    img.dataset.fallbackIndex = String(currentIndex + 1);
    img.removeAttribute("srcset");
    img.removeAttribute("sizes");
    img.src = versionedAsset(nextSource);
  };

  function workCard(item, index, categoryCover) {
    const image = workThumbnail(item, categoryCover);
    const encodedFallbacks = encodeURIComponent(JSON.stringify(image.fallbacks || []));
    const localInfo = localImageManifest[image.src];
    const responsive = localInfo
      ? `srcset="${localInfo.variants.map(entry => `${versionedAsset(entry.src)} ${entry.width}w`).join(", ")}" sizes="(max-width: 767px) calc(100vw - 24px), (max-width: 1099px) 50vw, (max-width: 1499px) 33vw, 25vw" width="${localInfo.width}" height="${localInfo.height}"`
      : "";

    return `
      <a class="work-card reveal" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer" style="--delay:${(index % 5) * 35}ms">
        <div class="work-image">
          <img
            src="${escapeHtml(versionedAsset(image.src))}"
            ${responsive}
            data-fallbacks="${encodedFallbacks}"
            data-fallback-index="0"
            alt="${escapeHtml(item.title)}"
            loading="lazy"
            decoding="async"
            referrerpolicy="no-referrer"
            onerror="window.__portfolioImageFallback(this)"
          >
          <span class="work-open">${icon("external")}</span>
        </div>
        <div class="work-copy"><h3>${escapeHtml(item.title)}</h3></div>
      </a>
    `;
  }

  function buildAbout(section, root) {
    root.innerHTML = `
      <section class="about-profile-layout">
        <div class="about-mobile-heading" aria-hidden="true"><h1>${escapeHtml(section.title)}</h1></div>
        <figure class="about-profile-image">
          <img ${imageAttributes(section.cover, {
            alt: "Portrait of Thuong Le",
            sizes: "(max-width: 767px) calc(100vw - 24px), min(34vw, 670px)",
            priority: true
          })}>
        </figure>
        <div class="about-profile-content">
          <h1>${escapeHtml(section.title)}</h1>
          <p class="about-profile-intro">${escapeHtml(section.intro)}</p>
          <div class="about-biography">
            <span class="eyebrow">Biography</span>
            <div class="about-biography-copy">${section.paragraphs.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div>
          </div>
        </div>
      </section>
      <section class="about-gallery-section" aria-labelledby="about-gallery-title">
        <div class="about-gallery-heading"><h2 id="about-gallery-title">Reporting across formats</h2></div>
        <div class="editorial-gallery about-gallery-grid">
          ${section.gallery.map((item, index) => `
            <figure class="reveal gallery-item gallery-item-${index + 1}" style="--delay:${(index % 6) * 35}ms">
              <img ${imageAttributes(item.image, {
                alt: item.alt,
                sizes: "(max-width: 559px) calc(100vw - 24px), (max-width: 767px) 50vw, (max-width: 1499px) 33vw, 25vw"
              })}>
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
    if (key === "about") { buildAbout(section, root); return; }

    root.innerHTML = `
      <section class="category-masthead">
        <img ${imageAttributes(section.cover, {
          alt: `${section.title} portfolio cover`,
          sizes: "(max-width: 767px) calc(100vw - 24px), min(100vw - 48px, 2200px)",
          priority: true
        })}>
        <span class="category-overlay"></span>
        <div class="category-heading">
          <h1>${escapeHtml(section.title)}</h1>
          <p>${section.intro}</p>
        </div>
      </section>
      <section class="category-work-list" aria-label="${escapeHtml(section.title)} portfolio">
        <div class="work-grid">${section.works.map((item, index) => workCard(item, index, section.cover)).join("")}</div>
      </section>
    `;
  }

  function buildFooter() {
    const footer = $("[data-footer]");
    if (!footer) return;
    if (document.body.dataset.page === "home") { footer.hidden = true; footer.innerHTML = ""; return; }
    footer.hidden = false;
    footer.classList.add("minimal-footer");
    footer.innerHTML = `<div class="minimal-footer-shell"><a class="minimal-home-button" href="index.html">Back to home ${icon("arrow")}</a></div>`;
  }

  function revealOnScroll() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) { items.forEach(item => item.classList.add("is-visible")); return; }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.01, rootMargin: "180px 0px" });
    items.forEach(item => observer.observe(item));
  }

  buildHeader();
  buildMenu();
  buildHome();
  buildCategory();
  buildFooter();
  revealOnScroll();
})();
