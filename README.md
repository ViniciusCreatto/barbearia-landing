# Barbearia Noir

Landing page de uma barbearia masculina em Piracicaba/SP que só atende com hora marcada. O visitante abre o site no celular, vê os serviços e os preços e agenda pelo WhatsApp sem precisar ligar nem enfrentar fila.

**Site no ar:** https://barbearia-landing-tau.vercel.app/

> A Barbearia Noir é um projeto de portfólio. A barbearia, o endereço, os preços e os tempos dos serviços são fictícios. O próprio rodapé do site avisa isso.

## A ideia

A página tem quatro partes:

1. **Hero:** uma frase sobre o que a barbearia faz, o botão de agendar e, logo abaixo, o bairro e o horário de funcionamento.
2. **Serviços:** a lista de preços, como num cardápio, com uma linha curta sobre cada serviço e o tempo que ele leva.
3. **O espaço:** uma foto do ambiente, para o cliente saber o que vai encontrar.
4. **Como funciona:** dois passos. Mandar mensagem e aparecer no horário.

O rodapé reúne o endereço, o horário, o contato e o mapa.

Não tem depoimentos, notas em estrelas nem números de clientes, porque o projeto é fictício e eles seriam inventados.

## Tecnologias

HTML, CSS e um pouco de JavaScript, sem framework, sem build e sem dependências.

O único recurso externo é o mapa do Google Maps, num iframe.

## Estrutura

```
├── index.html          # todo o conteúdo da página
├── css/
│   └── style.css       # tokens, @font-face, seções e, no fim, o breakpoint mobile
├── js/
│   └── main.js         # navbar, menu mobile e ano do rodapé
├── assets/
│   ├── fonts/          # Cormorant e Inter, hospedadas no próprio site
│   └── images/         # fotos do hero e do espaço (versão desktop e mobile)
├── vercel.json         # cabeçalhos de segurança e cache em produção
├── .htaccess           # os mesmos cabeçalhos para o Apache local
├── robots.txt
├── sitemap.xml
├── favicon.svg
└── og-image.jpg        # imagem que aparece ao compartilhar o link
```

## Decisões que tomei

### O conteúdo fica no HTML

Os preços, o endereço e o horário estão escritos direto no `index.html`. A página aparece completa mesmo se o JavaScript falhar, e os buscadores leem tudo de primeira. O `main.js` cuida só do comportamento: muda a navbar ao rolar, abre e fecha o menu no celular e atualiza o ano do copyright, para ninguém precisar trocar à mão todo janeiro.

### Agendamento pelo WhatsApp

É assim que o público dessa barbearia já marca horário, então não fazia sentido criar um formulário. Os botões abrem o WhatsApp com a mensagem pronta. Como o projeto é fictício, o link não tem número e deixa a pessoa escolher o contato. Para usar com uma barbearia de verdade, basta incluir o número nos quatro links.

### Fontes no próprio site

Comecei com o Google Fonts, mas, no primeiro acesso, o título do hero mudava de quebra de linha quando a fonte terminava de carregar. Por isso, a Cormorant (títulos) e a Inter (texto) passaram a ficar em `assets/fonts`, só com os caracteres do português e só nos pesos que o site usa: Cormorant 600 e Inter 500. Os botões também usam o 500, para não baixar 24 KB a mais só pelo texto deles.

Enquanto elas carregam, o navegador usa Times New Roman e Arial com as métricas ajustadas (`Cormorant-Fallback` e `Inter-Fallback`), para o texto quase não sair do lugar na troca.

### Imagens pensadas para o celular

O fundo do hero e a foto do espaço têm uma versão para desktop e outra para mobile. O hero ainda tem `preload` com `media`, então o celular baixa só a imagem dele, e baixa logo no começo.

### Segurança e cache

O site manda cabeçalhos de segurança, entre eles uma CSP bem fechada. Ela só aceita scripts, estilos e fontes do próprio domínio e frames do Google Maps, sem `unsafe-inline`. Por isso não há nenhum `<script>` ou `style=` inline no HTML.

CSS, JS, fontes e imagens ficam em cache por um ano. Para quem já visitou receber as mudanças, cada arquivo leva um `?v=` que sobe a cada alteração.

Os cabeçalhos ficam em dois lugares: no `vercel.json` para a produção e no `.htaccess` para o Apache local. Quando mudo um, mudo o outro.

### Acessibilidade

- Link "pular para o conteúdo" logo no início da página.
- Títulos em ordem e listas semânticas para os preços, os passos e o horário.
- O menu mobile informa se está aberto (`aria-expanded`), leva o foco para o primeiro link ao abrir, trava a rolagem da página e fecha com Esc, devolvendo o foco ao botão.
- A animação do ícone e do menu respeita quem pediu menos movimento ao sistema (`prefers-reduced-motion`).
- Não tem animação de entrada: o conteúdo aparece direto, sem esperar a rolagem.

### Nomes

As classes do CSS estão em inglês (`services`, `price-list`, `steps`). As âncoras da URL ficaram em português (`#servicos`, `#espaco`, `#como-funciona`), porque o visitante as vê na barra de endereço.

## Como rodar

Não precisa instalar nada. Basta abrir o `index.html` no navegador.

Para testar com os mesmos cabeçalhos da produção, sirva a pasta pelo Apache (no XAMPP, por exemplo, em `http://localhost/barbearia-landing/`). O `.htaccess` cuida do resto.

## Publicação

O site está hospedado na Vercel. O `.vercelignore` deixa de fora o que o site não usa, como este README e o `.htaccess`.

Se o domínio mudar, troque a URL em três lugares: nas tags `og:` e `twitter:` do `index.html`, no `robots.txt` e no `sitemap.xml`.

## Como confiro antes de publicar

Não há testes automatizados. Antes de cada mudança subir:

- rodo `node --check js/main.js` para pegar erro de sintaxe;
- abro a página em 375px (celular) e 1440px (desktop);
- quando mexo no layout, confiro também 428px e os limites do breakpoint, 768px e 769px.

## Créditos

As fotos são de Nenad Stojkovic, publicadas no Wikimedia Commons sob a licença [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/deed.pt-br): "Barber cutting hair with comb" e "Young men with trendy haircut at barber shop".
