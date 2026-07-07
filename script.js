(function () {
  const config = window.SITE_CONFIG || {};

  const whatsappNumberEncoded = String(config.whatsappNumberEncoded || "");
  const whatsappMessage = encodeURIComponent(config.whatsappMessage || "");
  const instagramUrl = config.instagramUrl || "#";
  const gaMeasurementId = (config.gaMeasurementId || "").trim();

  const whatsappLink = document.getElementById("whatsapp-link");
  const instagramLink = document.getElementById("instagram-link");

  function decodeWhatsappNumber(encodedValue) {
    try {
      const decoded = atob(encodedValue);
      return decoded.replace(/\D/g, "");
    } catch (error) {
      return "";
    }
  }

  if (whatsappLink && whatsappNumberEncoded) {
    whatsappLink.href = "#";
    whatsappLink.addEventListener("click", function (event) {
      event.preventDefault();

      const whatsappNumber = decodeWhatsappNumber(whatsappNumberEncoded);
      if (!whatsappNumber) {
        return;
      }

      const url = "https://wa.me/" + whatsappNumber + "?text=" + whatsappMessage;
      window.open(url, "_blank", "noopener");
    });
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
