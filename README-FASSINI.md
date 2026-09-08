# Site Fassini Impermeabilizações

Projeto institucional com catálogo de obras, desenvolvido para a Fassini Impermeabilizações.

## Páginas

- `index.html`: página institucional, serviços, apresentação da empresa e perguntas frequentes.
- `obras.html`: catálogo completo de fotos e vídeos, filtros por serviço e clientes atendidos.

## Executar localmente

Abra a pasta no VS Code e abra o arquivo `index.html` no navegador. O projeto usa HTML, CSS e JavaScript puros e não precisa de `npm install`.

## Catálogo do Google Drive

O projeto já inclui as obras que estavam na pasta do Drive em 08/09/2026, por isso as imagens aparecem imediatamente. Para que novas fotos e vídeos entrem sozinhos no site, publique o Google Apps Script incluído no projeto e informe a URL `/exec` no arquivo `script.js`. Consulte `CONFIGURAR-GOOGLE-DRIVE.md`.

Estrutura de pastas recomendada no Drive:

- Lajes e coberturas
- Muros de arrimo
- Piscinas e reservatórios
- Estacionamentos
- Sacadas e terraços
- Manta asfáltica

## Logo e identidade visual

- A logo oficial já está em `assets/images/logo-fassini.png`.
- O visual usa o azul oficial `#3e4095`, extraído da própria logo.
- O cabeçalho mostra somente a imagem oficial; não existe mais uma segunda marca de reserva ao lado.

## Única configuração pendente para atualização automática

- Inserir no `script.js` a URL `/exec` publicada pelo Google Apps Script.
