# Barbearia Noir

Landing page de uma barbearia fictícia em Piracicaba/SP, que atende só com hora marcada pelo WhatsApp. É um projeto de portfólio: a barbearia, o endereço e os preços não existem.

**No ar:** https://barbearia-landing-tau.vercel.app/

HTML, CSS e um pouco de JS puro. Não tem framework nem build. O único recurso de fora é o mapa do Google Maps, num iframe.

## Decisões

- **Conteúdo no HTML.** Contatos, horários e preços estão escritos no `index.html`; o conteúdo não depende de JS. O `js/main.js` cuida só do comportamento: a navbar ao rolar, o menu mobile e o ano do rodapé.
- **Fontes locais.** Cormorant 600 e Inter 500/600 ficam em `assets/fonts`, só com o subset latino. Com o Google Fonts, num cache frio o título do hero mudava de quebra de linha. As `@font-face` de fallback (`Cormorant-Fallback` sobre Times New Roman, `Inter-Fallback` sobre Arial) têm as métricas medidas para reduzir esse salto.
- **Imagem do hero.** O fundo tem versão desktop e mobile, e cada uma tem `preload` com `media`, então o navegador baixa só a que vai usar.
- **Cabeçalhos de segurança e cache.** CSP restrita ao próprio domínio, sem `unsafe-inline`, com exceção só do iframe do Google Maps, além de HSTS, `X-Content-Type-Options` e `Permissions-Policy`. CSS, JS, fontes e imagens saem com `Cache-Control: immutable` de 1 ano, por isso todos levam `?v=`, que sobe a cada mudança. Os cabeçalhos estão em `vercel.json` (produção) e `.htaccess` (Apache local).
- **Acessibilidade.** Link "pular para o conteúdo", títulos em ordem e listas semânticas. O menu mobile usa `aria-expanded` (o ícone vira um X), leva o foco ao primeiro link ao abrir, trava a rolagem da página e fecha com Esc devolvendo o foco ao botão. Fechado, não recebe foco pelo Tab. A animação do ícone e do menu respeita `prefers-reduced-motion`.
- **Nomes.** Classes em inglês; só as âncoras da URL (`#servicos`, `#espaco`, `#como-funciona`) ficam em português, porque o visitante as vê.
- **Sem animação de entrada.** Os preços ficam numa lista com pontilhado, não em cards.

## Rodar localmente

Basta abrir o `index.html` no navegador, ou servir a pasta por qualquer servidor estático. Com o Apache (XAMPP, por exemplo), o `.htaccess` aplica os mesmos cabeçalhos da produção.

## Verificação

Não há testes automatizados. Antes de publicar, rode `node --check js/main.js` e confira a página em 375px (celular) e 1440px (desktop), além dos limites dos breakpoints (768 e 769px).

## Créditos

Fotos de Nenad Stojkovic, no Wikimedia Commons, sob licença [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/deed.pt-br).
