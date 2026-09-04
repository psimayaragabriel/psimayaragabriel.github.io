# Site - Mayara Gabriel

Landing page de uma secao para GitHub Pages.

## Configuracao rapida

1. Edite `config.js` para ajustar a mensagem do WhatsApp (`whatsappMessage`), Instagram (`instagramUrl`) ou Google Analytics (`gaMeasurementId`).
2. Para alterar o número do WhatsApp ou lógica de scripts:
   - Edite `src/script.js` (código fonte claro para desenvolvimento).
   - Execute `npm run build` para gerar o `script.js` ofuscado e minificado para proteção contra scrapers/bots.

## Deploy no GitHub Pages

1. Suba estes arquivos para o repositorio (o arquivo `script.js` ofuscado ja fica pronto para produção).
2. Em Settings > Pages, selecione a branch principal e a pasta raiz (`/`).
3. O arquivo `CNAME` ja esta pronto com `psimayaragabriel.com.br`.
4. No provedor de dominio, aponte os DNS para o GitHub Pages.

## Estrutura

- `index.html`: conteudo da pagina.
- `styles.css`: estilo visual responsivo.
- `config.js`: configuracoes de mensagem, Instagram e Google Analytics.
- `src/script.js`: codigo-fonte limpo para desenvolvimento.
- `script.js`: script em producao ofuscado e minificado (gerado pelo build).
- `scripts/build.js`: script de build/ofuscacao usando `javascript-obfuscator`.
- `assets/images`: foto e logotipo.
- `assets/fonts`: fonte da marca.
# psimayaragabriel.github.io
