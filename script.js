(function () {
  const config = window.SITE_CONFIG || {};

  const whatsappNumber = String(config.whatsappNumber || "").replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent(config.whatsappMessage || "");
  const instagramUrl = config.instagramUrl || "#";
  const gaMeasurementId = (config.gaMeasurementId || "").trim();

  const whatsappLink = document.getElementById("whatsapp-link");
  const instagramLink = document.getElementById("instagram-link");

  if (whatsappLink && whatsappNumber) {
    whatsappLink.href = "https://wa.me/" + whatsappNumber + "?text=" + whatsappMessage;
  }

  if (instagramLink) {
    instagramLink.href = instagramUrl;
  }

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
