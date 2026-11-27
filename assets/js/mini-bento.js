const portfolio = new URL('../../', import.meta.url);
const home = new URL('index.html', portfolio);
const guide = new URL('case-studies/buddhify-guide.html', portfolio);
const curriculum = new URL('cv.html', portfolio);

const hamburger = '<path d="M3 6h18M3 12h18M3 18h18"/>';
const house = '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>';
const cross = '<path d="m6 6 12 12M18 6 6 18"/>';

function icon(path) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${path}</svg>`;
}

const menu = document.querySelector('.mini-bento');
if (menu && typeof window.HTMLDialogElement?.prototype.showModal === 'function') {
  menu.innerHTML = `
    <button class="mini-bento__trigger" type="button" aria-label="Apri la navigazione"
      aria-haspopup="dialog" aria-expanded="false" aria-controls="mini-bento-dialog">${icon(hamburger)}</button>
    <dialog id="mini-bento-dialog" class="mini-bento__dialog" aria-label="Navigazione del portfolio">
      <div class="mini-bento__shell">
        <nav class="mini-bento__panel" aria-label="Portfolio">
          <a class="mini-bento__home" href="${home}" aria-label="Home" autofocus>${icon(house)}</a>
          <section class="mini-bento__projects" aria-labelledby="mini-bento-projects">
            <h2 id="mini-bento-projects">Progetti</h2>
            <ul>
              <li><a href="${guide}" data-project="buddhify-guide"><span>Buddhify Guide</span></a></li>
              <li><a href="${new URL('case-studies/buddhify-redesign.html', portfolio)}" data-project="buddhify"><span>Buddhify</span></a></li>
              <li><a href="${new URL('case-studies/meditactive.html', portfolio)}" data-project="meditactive"><span>Meditactive</span></a></li>
            </ul>
          </section>
          <a class="mini-bento__about" href="https://francesca-cudemo.framer.website/about">
            <span>Sbircia nel<br>mio mondo</span>
            <svg class="mini-bento__star" viewBox="0 -12 440 244" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <defs>
                <clipPath id="mini-bento-eye-a"><ellipse cx="190" cy="168" rx="25" ry="31" transform="rotate(10 190 168)"/></clipPath>
                <clipPath id="mini-bento-eye-b"><ellipse cx="255" cy="158" rx="25" ry="31" transform="rotate(10 255 158)"/></clipPath>
              </defs>
              <g transform="translate(0,-11)">
                <path d="M-50 285 C-14 239 34 209 103 174 C53 130 17 89 29 74 C42 55 131 80 192 104 C215 42 233 0 248 0 C274 -2 280 66 287 108 C332 76 398 36 412 49 C437 72 388 132 338 177 C410 198 455 224 490 285 Z"/>
                <ellipse cx="190" cy="168" rx="25" ry="31" transform="rotate(10 190 168)" class="mini-bento__eye"/>
                <ellipse cx="255" cy="158" rx="25" ry="31" transform="rotate(10 255 158)" class="mini-bento__eye"/>
                <ellipse cx="201" cy="149" rx="19" ry="21" class="mini-bento__pupil" clip-path="url(#mini-bento-eye-a)"/>
                <ellipse cx="266" cy="139" rx="19" ry="21" class="mini-bento__pupil" clip-path="url(#mini-bento-eye-b)"/>
                <path class="mini-bento__smile" d="M216 199 Q229 225 242 197" stroke-width="5.4" stroke-linecap="round"/>
              </g>
            </svg>
          </a>
          <div class="mini-bento__contacts" role="group" aria-label="Contatti">
            <a href="mailto:francesca.cudemo@icloud.com" aria-label="Scrivimi un'email">
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/>
                <path d="m3 7 7.9 5.4a2 2 0 0 0 2.2 0L21 7"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/francesca-cudemo-a488b8225/" target="_blank" rel="noopener" aria-label="Profilo LinkedIn (si apre in una nuova scheda)">
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
                <rect x="2.5" y="2.5" width="19" height="19" rx="4"/>
                <path d="M8 10.5v6M8 7.5v.01M12 16.5v-6M12 13.25a2.75 2.75 0 0 1 5.5 0v3.25"/>
              </svg>
            </a>
            <a href="tel:+393477106813" aria-label="Chiamami al numero +39 347 710 6813">
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
                <path d="M21 16.4v2.8a1.9 1.9 0 0 1-2.07 1.9 18.8 18.8 0 0 1-8.2-2.92 18.5 18.5 0 0 1-5.7-5.7A18.8 18.8 0 0 1 2.1 4.24 1.9 1.9 0 0 1 4 2.17h2.8a1.9 1.9 0 0 1 1.9 1.63c.12.9.34 1.79.66 2.65a1.9 1.9 0 0 1-.43 2L7.73 9.65a15.2 15.2 0 0 0 5.7 5.7l1.2-1.2a1.9 1.9 0 0 1 2-.43c.86.32 1.75.54 2.65.66A1.9 1.9 0 0 1 21 16.4z"/>
              </svg>
            </a>
          </div>
          <a class="mini-bento__cv" href="${curriculum}"><span>Curriculum</span></a>
        </nav>
        <button class="mini-bento__close" type="button" aria-label="Chiudi la navigazione">${icon(cross)}</button>
      </div>
    </dialog>`;

  const trigger = menu.querySelector('.mini-bento__trigger');
  const dialog = menu.querySelector('dialog');
  const shell = menu.querySelector('.mini-bento__shell');
  const homeLink = menu.querySelector('.mini-bento__home');
  const closeButton = menu.querySelector('.mini-bento__close');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let animations = [];
  let closing = false;
  const currentProject = [...menu.querySelectorAll('[data-project]')]
    .find(link => link.dataset.project === menu.dataset.currentProject);
  currentProject?.setAttribute('aria-current', 'page');

  function openMotion() {
    const timing = { duration: 280, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'both' };
    return [
      shell.animate([
        { opacity: 0, transform: 'translateY(-8px) scale(.98)' },
        { opacity: 1, transform: 'none' }
      ], timing),
      dialog.animate([
        { backgroundColor: 'transparent' },
        { backgroundColor: 'var(--menu-backdrop)' }
      ], timing)
    ];
  }

  trigger.addEventListener('click', () => {
    dialog.showModal();
    dialog.scrollTop = 0;
    trigger.setAttribute('aria-expanded', 'true');
    if (!reduceMotion.matches) animations = openMotion();
    homeLink.focus({ preventScroll: true });
  });

  async function closeMenu() {
    if (!dialog.open || closing) return;

    closing = true;
    if (!reduceMotion.matches) {
      animations.forEach(animation => animation.reverse());
      await Promise.allSettled(animations.map(animation => animation.finished));
    }
    dialog.close();
    animations.forEach(animation => animation.cancel());
    animations = [];
    closing = false;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.focus({ preventScroll: true });
  }

  closeButton.addEventListener('click', closeMenu);
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    closeMenu();
  });

  let pressedOutside = false;
  dialog.addEventListener('pointerdown', event => {
    pressedOutside = event.target === dialog;
  });
  dialog.addEventListener('click', event => {
    if (pressedOutside && event.target === dialog) closeMenu();
  });
}
