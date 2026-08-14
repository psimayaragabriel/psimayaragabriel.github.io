(function () {
  const config = window.SITE_CONFIG || {};

  const whatsappNumberEncoded = String(config.whatsappNumberEncoded || "");
  const whatsappMessage = encodeURIComponent(config.whatsappMessage || "");
  const instagramUrl = config.instagramUrl || "#";
  const gaMeasurementId = (config.gaMeasurementId || "").trim();

  // WhatsApp Decoding & Event Handling
  function decodeWhatsappNumber(encodedValue) {
    try {
      const decoded = atob(encodedValue);
      return decoded.replace(/\D/g, "");
    } catch (error) {
      return "";
    }
  }

  function handleWhatsappClick(event) {
    event.preventDefault();
    const whatsappNumber = decodeWhatsappNumber(whatsappNumberEncoded);
    if (!whatsappNumber) return;

    const url = "https://wa.me/" + whatsappNumber + "?text=" + whatsappMessage;
    window.open(url, "_blank", "noopener");
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

