# Portfolio HTML e CSS

Ciao, sono **Francesca Cudemo**, Junior UX/UI Designer. Questo è il mio portfolio personale, realizzato per l'esame con HTML, CSS (Sass) e Bootstrap.

🔗 **Sito online:** https://francescacudemo-tech.github.io/portfolio-html-css/

## Il design

La home è una **griglia bento**: card di dimensioni diverse, angoli molto arrotondati e una navigazione a pillola. Ogni card ha un ruolo preciso: presentazione, concept "Osservo. Mi chiedo. Progetto.", foto, strumenti, i tre progetti con i mockup e il link al case study, chi sono, tema scuro e contatti.

## Pagine

- `index.html`: home a griglia bento, con i tre verbi, le competenze e il design system
- `cv.html`: curriculum vitae scritto in HTML, stampabile in PDF
- `contattami.html`: form di contatto

## Tecnologie

- HTML5 e CSS3
- Sass: partial, variabili, mixin e `color.mix()` per le tinte
- Bootstrap 5: base CSS, classi del form, `.stretched-link` per le card cliccabili, utility
- CSS Grid con `grid-template-areas`: 1 colonna su mobile, 2 su tablet, 4 su desktop
- Flexbox per header, card e allineamenti interni
- Tema scuro automatico con `prefers-color-scheme`, senza JavaScript
- JavaScript solo per l'invio del form di contatto

## Struttura del progetto

```text
├── index.html
├── cv.html
├── contattami.html
├── scss/
│   ├── main.scss         # punto d'ingresso
│   ├── _variables.scss   # design token: colori, font, spazi, breakpoint
│   ├── _mixins.scss      # card, pill, flex, focus
│   ├── _base.scss        # variabili CSS, tema scuro, tipografia
│   ├── _layout.scss      # header, griglia bento, footer, pagine
│   └── _components.scss  # bottoni, card, progetti, form
├── css/main.css          # CSS compilato da Sass
└── assets/
    ├── img/              # foto, favicon, anteprima social
    │   └── progetti/     # mockup dei tre progetti
    └── js/contact.js     # invio del form
```

## Compilare il Sass

Con Dart Sass installato (per esempio `brew install dart-sass`):

```bash
sass --no-source-map scss/main.scss css/main.css
```

In alternativa, con Node.js: `npm install` e poi `npm run sass`.

Dopo ogni modifica al CSS, aumenta il numero in `css/main.css?v=…` nelle tre pagine, così i browser scaricano la versione nuova.

## Contatti

- LinkedIn: https://www.linkedin.com/in/francesca-cudemo-a488b8225/
- GitHub: https://github.com/francescacudemo-tech
- Portfolio Framer: https://francesca-cudemo.framer.website/
