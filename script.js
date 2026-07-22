(function () {
  const config = window.SITE_CONFIG || {};

  const whatsappNumberEncoded = String(config.whatsappNumberEncoded || "");
  const whatsappMessage = encodeURIComponent(config.whatsappMessage || "");
  const instagramUrl = config.instagramUrl || "#";
  const gaMeasurementId = (config.gaMeasurementId || "").trim();

  const whatsappLink = document.getElementById("whatsapp-link");
  const instagramLink = document.getElementById("instagram-link");
  const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
  const tabPanel = document.getElementById("tab-panel");
  const tabTitle = document.getElementById("tab-title");
  const tabTexts = document.getElementById("tab-texts");

  if (tabPanel) {
    tabPanel.style.height = "auto";
  }

  const tabsContent = {
    inicio: {
      title: "Seja bem-vinda ao seu espaço de cuidado.",
      paragraphs: [
        "Aqui você encontra um ambiente seguro de acolhimento, escuta atenta e presença genuína para cuidar da sua saúde emocional, sempre com muito respeito ao seu tempo, aos seus limites e à sua história.",
        "Sinta-se à vontade para explorar as abas deste site. Conheça um pouco mais sobre mim, entenda de forma simples como a Gestalt-terapia funciona e descubra como o processo terapêutico pode apoiar o momento de vida que você está atravessando agora."
      ]
    },
    "quem-sou-eu": {
      title: "Prazer, eu sou Mayara Gabriel Oliveira.",
      paragraphs: [
        "Sou psicóloga e apaixonada por histórias reais. Atuei durante dezoito anos na área de Recursos Humanos e foi durante a pandemia que o meu interesse pela clínica floresceu. Desde então, venho me especializando para integrar a psicologia clínica, a experiência humana e o meu olhar organizacional, pois cuidar de pessoas sempre esteve presente na minha trajetória.",
        "Ouvir histórias humanas sempre me emocionou, especialmente as de outras mulheres. Entendo aquelas que sustentam dores em silêncio, vivem grandes sobrecargas, recomeçam muitas vezes e tentam ser fortes o tempo inteiro. Escolhi a psicologia porque acredito profundamente no poder dos recomeços e que toda mulher merece um espaço seguro para existir com autenticidade e se reconectar consigo mesma.",
        "Além da profissão, sou alguém que cresceu na praia e tem o mar como lugar de pertencimento. Amo estar ao ar livre, viajar com minha família e acredito que uma boa conversa é um verdadeiro espaço de troca e cura. É com essa leveza, ética e presença que ofereço meu atendimento psicológico online, pronta para caminhar ao seu lado."
      ]
    },
    "o-que-e-gestalt": {
      title: "O que é a Gestalt-terapia?",
      paragraphs: [
        "A Gestalt-terapia é uma abordagem da psicologia focada no momento presente, ou seja, no 'aqui e agora'. Mais do que apenas olhar para o passado de forma distante, ela nos convida a compreender como as suas vivências e memórias refletem na forma como você sente, age e se relaciona no dia de hoje.",
        "É um processo profundo de autoconhecimento que ajuda você a enxergar a si mesma por inteiro, integrando seus pensamentos, seu corpo e as suas emoções. Juntas, trabalhamos para identificar padrões de comportamento que talvez estejam te sobrecarregando, abrindo espaço para que você encontre formas mais leves e saudáveis de lidar com os seus desafios diários.",
        "Na prática, a terapia não busca entregar fórmulas prontas ou 'consertar' ninguém. O foco é oferecer um lugar seguro para você acolher suas vulnerabilidades, resgatar a sua força interna e fortalecer a sua capacidade de fazer escolhas mais autênticas, alinhadas com o que realmente faz sentido para a sua vida."
      ]
    },
    "como-posso-ajudar": {
      title: "Como posso te apoiar na sua jornada.",
      paragraphs: [
        "No nosso espaço terapêutico, o foco principal é você e o seu bem-estar. Eu estou aqui para te ajudar a lidar com a ansiedade, com a sobrecarga do dia a dia e com aquelas angústias que muitas vezes você acaba silenciando na tentativa de dar conta de tudo sozinha.",
        "Através de uma escuta atenta e sem julgamentos, trabalharemos juntas para que você consiga estabelecer limites mais saudáveis, fortalecer a sua autoestima e navegar com mais clareza por transições de vida — sejam elas na carreira, nos relacionamentos ou na forma como você enxerga a si mesma.",
        "Lembre-se de que você não precisa ser forte o tempo inteiro e não precisa lidar com tudo isso sem apoio. Meu papel é caminhar ao seu lado para que você desenvolva seus próprios recursos emocionais, reconectando-se com a sua essência e construindo uma vida muito mais leve e autêntica."
      ]
    }
  };

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

  function renderTab(tabKey) {
    const content = tabsContent[tabKey];
    if (!content || !tabPanel || !tabTitle || !tabTexts) {
      return;
    }

    tabPanel.style.height = "auto";

    tabButtons.forEach((button) => {
      const isActive = button.dataset.tab === tabKey;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
    });

    tabTitle.textContent = content.title;
    tabTexts.innerHTML = content.paragraphs
      .map(function (paragraph) {
        return '<p class="hero__text">' + paragraph + "</p>";
      })
      .join("");

    tabPanel.classList.remove("is-switching");
    void tabPanel.offsetWidth;
    tabPanel.classList.add("is-switching");
  }

  if (tabButtons.length > 0) {
    if (tabPanel) {
      tabPanel.addEventListener("transitionend", function (event) {
        if (event.propertyName === "opacity" || event.propertyName === "transform") {
          tabPanel.classList.remove("is-switching");
        }
      });
    }

    tabButtons.forEach((button) => {
      button.setAttribute("role", "tab");
      button.addEventListener("click", function () {
        renderTab(button.dataset.tab);
      });
    });

    renderTab("inicio");
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
