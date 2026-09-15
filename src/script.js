(function () {
  // WhatsApp Configuration (hardcoded, no external config)
  var WHATSAPP_PHONE = "5581999990457";
  var defaultMessage = "Olá, Mayara! Vim pelo site e gostaria de mais informações sobre atendimento.";
  var whatsappMessage = encodeURIComponent(defaultMessage);
  var instagramUrl = "https://www.instagram.com/psimayaragabrieloliveira";

  // WhatsApp Direct Navigation configured on native links
  var directWhatsappUrl = "https://wa.me/" + WHATSAPP_PHONE + "?text=" + whatsappMessage;
  var whatsappIds = ["whatsapp-link", "whatsapp-link-nav", "whatsapp-link-cta"];
  whatsappIds.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.href = directWhatsappUrl;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    }
  });

  // Instagram Links
  var instagramIds = ["instagram-link", "instagram-link-cta"];
  instagramIds.forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.href = instagramUrl;
    }
  });

  // Fixed Navbar Scroll Effect
  var navbar = document.getElementById("main-header");
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
  var menuToggle = document.getElementById("menu-toggle");
  var mainNav = document.getElementById("main-nav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu when clicking a nav link
    mainNav.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Scroll Reveal Observer (Bidirecional)
  var revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
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

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }

  // Active Link ScrollSpy
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(function (current) {
      var sectionHeight = current.offsetHeight;
      var sectionTop = current.offsetTop - 120;
      var sectionId = current.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });
  }, { passive: true });
})();
