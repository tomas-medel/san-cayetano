const chapels = {
  cayetano: {
    name: "San Cayetano",
    location: "Av. Ing. Eduardo Madero 1174",
    image: "/img/sancayetano.jpeg",
    schedule: [
      ["Lunes a viernes", "18:30"],
      ["Sábados", "19:00"],
      ["Domingos", "09:30, 11:00 y 19:00"],
    ],
  },
  lourdes: {
    name: "Nuestra Señora de Lourdes",
    location: "2521 Sta. Margarita",
    image: "/img/lourdes.jpeg",
    schedule: [
      ["Jueves", "17:00"], 
      ["Sábados", "17:00"],
    ],
  },
  carmen: {
    name: "Nuestra Señora del Carmen",
    location: "Juan XXIII 5700, Del Viso",
    image: "/img/carmen.jpeg",
    schedule: [
      ["Miércoles", "18:30"],
      ["Sábados", "18:00"],
      ["Domingos", "09:30"],
    ],
  },
  medalla: {
    name: "Nuestra Señora de la Medalla Milagrosa",
    location: "1198 Abella Caprile",
    image: "/img/medalla.jpeg",
    schedule: [["Domingos", "17:00"]],
  },
  misericordioso: {
    name: "Jesús Misericordioso",
    location: "Sto Domingo 1538",
    mapEmbed: "https://www.google.com/maps?q=Capilla%20Jes%C3%BAs%20Misericordioso%2C%20Sto%20Domingo%201538&output=embed",
    image: "/img/misericordioso.jpeg",
    schedule: [["Sábados", "16:00"]],
  },
};

const groups = {
  scout: {
    title: "Scout",
    time: "Sábados 15:30",
    chapel: "San Cayetano",
    description: "Grupo de encuentro, servicio y formación para niños, adolescentes y jóvenes.",
  },
  moscati: {
    title: "San Giuseppe Moscati",
    time: "Martes 19:00",
    chapel: "San Cayetano",
    description: "Espacio comunitario de formación y servicio inspirado en San Giuseppe Moscati.",
  },
  filomena: {
    title: "Santa Filomena",
    time: "Miércoles 18:30",
    chapel: "San Cayetano",
    description: "Grupo de oración y encuentro dedicado a Santa Filomena.",
  },
  bernardita: {
    title: "Santa Bernardita",
    time: "Sábados 17:00",
    chapel: "Lourdes",
    description: "Grupo parroquial de encuentro, oración y acompañamiento comunitario.",
  },
  sanjose: {
    title: "San José",
    time: "Jueves 19:30",
    chapel: "San Cayetano",
    description: "Comunidad de encuentro fraterno con espacios de oración y acompañamiento.",
  },
  catequesis: {
    title: "Catequesis",
    time: "Sábados 09:00",
    chapel: "San Cayetano",
    description: "Preparación para sacramentos con acompañamiento a niños y familias.",
  },
  piox: {
    title: "San Pio X",
    time: "Viernes 18:30",
    chapel: "San Cayetano",
    description: "Grupo parroquial de formación y vida comunitaria bajo el patronazgo de San Pio X.",
  },
  alcolicosAnonimos: {
    title: "Alcohólicos Anónimos",
    time: "Viernes 18:30",
    chapel: "San Cayetano",
    description: "Espacio de acompañamiento y encuentro para quienes buscan recuperación y contención.",
  },
  narcoticosAnoninos: {
    title: "Narcóticos Anónimos",
    time: "Viernes 18:30",
    chapel: "San Cayetano",
    description: "Grupo de apoyo para el camino de recuperación personal y comunitaria.",
  },
  alanon: {
    title: "Al-Anon",
    time: "Viernes 18:30",
    chapel: "San Cayetano",
    description: "Encuentro de apoyo y escucha para familiares y personas cercanas.",
  },
  redSanar: {
    title: "Red Sanar",
    time: "Viernes 18:30",
    chapel: "San Cayetano",
    description: "Espacio comunitario de acompañamiento, escucha y sanación interior.",
  },
};

function getGroupsByChapel(chapelName) {
  return Object.entries(groups).filter(([, group]) => group.chapel === chapelName);
}

function renderLocationGroups(chapelName) {
  const groupLists = document.querySelectorAll("[data-location-groups]");
  if (!groupLists.length) return;

  const groupsForChapel = getGroupsByChapel(chapelName);

  groupLists.forEach((groupList) => {
    const targetChapel = groupList.getAttribute("data-location-name") || chapelName;
    const locationGroups = targetChapel === chapelName ? groupsForChapel : getGroupsByChapel(targetChapel);

    groupList.innerHTML = locationGroups.length
      ? locationGroups
          .map(
            ([groupKey, group]) => `
              <button class="group-item location-group-item" type="button" data-group="${groupKey}">
                <strong>${group.title}</strong>
              </button>
            `
          )
          .join("")
      : `<p class="location-group-empty">No hay grupos cargados para esta ubicación.</p>`;
  });
}

function renderChapel(chapelKey) {
  const chapel = chapels[chapelKey];
  if (!chapel) return;

  const name = document.querySelector("[data-chapel-name]");
  const schedule = document.querySelector("[data-chapel-schedule]");
  const banner = document.querySelector("[data-chapel-banner]");
  const location = document.querySelector("[data-chapel-location]");
  const map = document.querySelector("[data-chapel-map]");

  if (!name || !schedule || !banner || !location || !map) return;

  name.textContent = chapel.name;
  location.textContent = chapel.location;
  banner.style.backgroundImage = `url('${chapel.image}')`;
  map.src = chapel.mapEmbed || `https://www.google.com/maps?q=${encodeURIComponent(chapel.location)}&output=embed`;
  map.title = `Mapa de ${chapel.name}`;

  schedule.innerHTML = chapel.schedule.map(([day, time]) => `<li><strong>${day}</strong><span>${time}</span></li>`).join("");
  renderLocationGroups(chapel.name);
}

function renderGroup(groupKey) {
  const group = groups[groupKey];
  if (!group) return;

  const title = document.querySelector("[data-group-title]");
  const time = document.querySelector("[data-group-time]");
  const chapel = document.querySelector("[data-group-chapel]");
  const description = document.querySelector("[data-group-description]");

  if (!title || !time || !chapel || !description) return;

  title.textContent = group.title;
  time.textContent = group.time;
  chapel.textContent = `Capilla: ${group.chapel}`;
  description.textContent = group.description;
}

function setupRevealAnimations() {
  const revealSelectors = [
    ".page-hero-card",
    ".hero-main",
    ".hero-card",
    ".latest-news-card",
    ".news-row",
    ".school-card",
    ".chapel-card",
    ".chapel-detail-card",
    ".contact-card",
    ".group-item",
    ".footer-card",
    ".flyer-card",
  ];

  const revealElements = document.querySelectorAll(revealSelectors.join(", "));
  if (!revealElements.length) return;

  revealElements.forEach((element, index) => {
    element.classList.add("reveal-on-scroll");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function setupSocialLinks() {
  const socialLinks = document.querySelectorAll(".footer-socials a");
  if (!socialLinks.length) return;

  socialLinks.forEach((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    let social = "";
    let label = link.textContent.trim();

    if (href.includes("instagram")) social = "instagram";
    if (href.includes("facebook")) social = "facebook";
    if (href.includes("youtube")) social = "youtube";
    if (!social) return;

    link.dataset.social = social;
    link.innerHTML = `<span class="social-icon" aria-hidden="true"></span><span class="social-label">${label}</span>`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  function closeGroupModal() {
    const modal = document.querySelector("[data-group-modal]");
    if (modal) modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menuPanel = document.querySelector("[data-menu-panel]");
  if (menuToggle && menuPanel) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuPanel.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  setupSocialLinks();
  setupRevealAnimations();
  requestAnimationFrame(() => document.body.classList.add("page-ready"));

  const chapelSelect = document.querySelector("[data-chapel-select]");
  if (chapelSelect) {
    renderChapel(chapelSelect.value);
    chapelSelect.addEventListener("change", (event) => {
      renderChapel(event.target.value);
    });
  } else if (document.querySelector("[data-location-groups]")) {
    renderLocationGroups("San Cayetano");
  }

  const groupModal = document.querySelector("[data-group-modal]");
  const groupClose = document.querySelector("[data-group-close]");
  if (groupModal) {
    document.addEventListener("click", (event) => {
      const button = event.target.closest("[data-group]");
      if (!button) return;

      renderGroup(button.getAttribute("data-group"));
      groupModal.hidden = false;
      document.body.classList.add("modal-open");
    });

    if (groupClose) groupClose.addEventListener("click", closeGroupModal);

    groupModal.addEventListener("click", (event) => {
      if (event.target === groupModal) closeGroupModal();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !groupModal.hidden) closeGroupModal();
    });
  }

  const flyerModal = document.querySelector("[data-flyer-modal]");
  const flyerImage = document.querySelector("[data-flyer-image]");
  const flyerCaption = document.querySelector("[data-flyer-caption]");
  const flyerClose = document.querySelector("[data-flyer-close]");
  const flyerTriggers = document.querySelectorAll("[data-flyer-trigger]");

  function closeFlyerModal() {
    if (flyerModal) flyerModal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  if (flyerModal && flyerImage && flyerCaption && flyerTriggers.length) {
    flyerTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        flyerImage.src = trigger.getAttribute("data-flyer-src") || "";
        flyerImage.alt = trigger.getAttribute("data-flyer-alt") || "";
        flyerCaption.textContent = trigger.getAttribute("data-flyer-alt") || "";
        flyerModal.hidden = false;
        document.body.classList.add("modal-open");
      });
    });

    if (flyerClose) flyerClose.addEventListener("click", closeFlyerModal);

    flyerModal.addEventListener("click", (event) => {
      if (event.target === flyerModal) closeFlyerModal();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !flyerModal.hidden) closeFlyerModal();
    });
  }
});
