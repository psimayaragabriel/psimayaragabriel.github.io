(function () {
  const config = window.SITE_CONFIG || {};

  // WhatsApp Configuration
  // Dynamic assembly prevents basic crawler regex harvesting while keeping code clean & trusted
  const WHATSAPP_PHONE = ["55", "81", "99999", "0457"].join("");

  const defaultMessage = "Olá, Mayara! Vim pelo site e gostaria de mais informações sobre atendimento.";
  const rawMessage = config.whatsappMessage || defaultMessage;
  const whatsappMessage = encodeURIComponent(rawMessage);

  const instagramUrl = config.instagramUrl || "https://www.instagram.com/psimayaragabrieloliveira";
  const gaMeasurementId = (config.gaMeasurementId || "").trim();

  // WhatsApp Direct Navigation in a new tab without URL encoding the phone number
  function handleWhatsappClick(event) {
    if (event) {
      event.preventDefault();
    }
    const directUrl = "https://wa.me/" + WHATSAPP_PHONE + "?text=" + whatsappMessage;
    window.open(directUrl, "_blank", "noopener,noreferrer");
  }

  const whatsappIds = ["whatsapp-link", "whatsapp-link-nav", "whatsapp-link-cta"];
  whatsappIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", handleWhatsappClick);
    }
  });

  // Instagram Links
  const instagramIds = ["instagram-link", "instagram-link-cta"];
  instagramIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.href = instagramUrl;
    }
  });

  // Fixed Navbar Scroll Effect
  const navbar = document.getElementById("main-header");
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when clicking a nav link
    const navLinks = mainNav.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll Reveal Observer (Bidirecional)
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver support
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // Active Link ScrollSpy
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink, { passive: true });

  // Privacy Modal & Anchor (#privacidade) Handling
  const privacyModal = document.getElementById("modal-privacidade");
  const openPrivacyBtn = document.getElementById("open-privacy-modal");
  const closePrivacyBtn = document.getElementById("modal-privacidade-close");
  const confirmPrivacyBtn = document.getElementById("modal-privacidade-confirm");
  const backdropPrivacy = document.getElementById("modal-privacidade-backdrop");

  function openPrivacyModal() {
    if (!privacyModal) return;
    privacyModal.classList.add("is-open");
    privacyModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (closePrivacyBtn && typeof closePrivacyBtn.focus === "function") {
      closePrivacyBtn.focus();
    }
  }

  function closePrivacyModal() {
    if (!privacyModal) return;
    privacyModal.classList.remove("is-open");
    privacyModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (window.location.hash === "#privacidade") {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
      } else {
        window.location.hash = "";
      }
    }

    if (openPrivacyBtn && typeof openPrivacyBtn.focus === "function") {
      openPrivacyBtn.focus();
    }
  }

  if (openPrivacyBtn) {
    openPrivacyBtn.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.hash = "privacidade";
      openPrivacyModal();
    });
  }

  if (closePrivacyBtn) {
    closePrivacyBtn.addEventListener("click", closePrivacyModal);
  }
  if (confirmPrivacyBtn) {
    confirmPrivacyBtn.addEventListener("click", closePrivacyModal);
  }
  if (backdropPrivacy) {
    backdropPrivacy.addEventListener("click", closePrivacyModal);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && privacyModal && privacyModal.classList.contains("is-open")) {
      closePrivacyModal();
    }
  });

  function checkPrivacyHash() {
    if (window.location.hash === "#privacidade") {
      openPrivacyModal();
    }
  }

  window.addEventListener("hashchange", function () {
    if (window.location.hash === "#privacidade") {
      openPrivacyModal();
    } else if (privacyModal && privacyModal.classList.contains("is-open")) {
      closePrivacyModal();
    }
  });

  checkPrivacyHash();

  // Google Analytics setup
  if (gaMeasurementId && gaMeasurementId !== "G-XXXXXXXXXX") {
    const gaScript = document.createElement("script");
    gaScript.async = true;
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=" + gaMeasurementId;
    document.head.appendChild(gaScript);

    gaScript.onload = function () {
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", gaMeasurementId);
    };
  }
})();
