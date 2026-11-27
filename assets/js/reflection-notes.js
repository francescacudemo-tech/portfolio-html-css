const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const ease = 'cubic-bezier(.22, 1, .36, 1)';
const formatCount = value => String(value).padStart(2, '0');

function createDeck(deck) {
  const track = deck.querySelector('.reflection-notes__track');
  const notes = [...track.children];
  const controls = deck.querySelector('.reflection-notes__controls');
  const count = controls.querySelector('[role="status"]');
  const previous = controls.querySelector('[data-notes-prev]');
  const next = controls.querySelector('[data-notes-next]');
  let active = 0;
  let animating = false;
  let animations = [];

  function render(stacked) {
    deck.toggleAttribute('data-notes-stacked', stacked);
    controls.hidden = !stacked;

    notes.forEach((note, index) => {
      const depth = (index - active + notes.length) % notes.length;
      note.dataset.depth = Math.min(depth, 2);
      note.toggleAttribute('inert', stacked && depth !== 0);
      if (stacked && depth !== 0) note.setAttribute('aria-hidden', 'true');
      else note.removeAttribute('aria-hidden');
    });
    count.textContent = `${formatCount(active + 1)} / ${formatCount(notes.length)}`;
  }

  async function turn(direction) {
    if (animating || notes.length < 2) return;

    const before = notes.map(note => {
      const { transform, backgroundColor } = getComputedStyle(note);
      return { transform, backgroundColor };
    });
    const outgoing = notes[active];
    active = (active + direction + notes.length) % notes.length;
    render(true);

    if (reducedMotion.matches || typeof outgoing.animate !== 'function') return;

    animating = true;
    outgoing.dataset.exiting = '';
    const lifted = direction > 0 ? outgoing : notes[active];
    const forward = direction > 0;
    const front = { zIndex: 4, backgroundColor: getComputedStyle(deck).getPropertyValue('--note-front').trim() };

    animations = notes.map((note, index) => {
      const { transform, backgroundColor } = getComputedStyle(note);
      const after = { transform, backgroundColor };
      const slide = 'translate(28px, -18px)';
      if (note !== lifted) return note.animate([before[index], after], { duration: 540, easing: ease });

      const back = { zIndex: 1, backgroundColor: forward ? after.backgroundColor : before[index].backgroundColor };
      const start = forward ? front : back;
      const end = forward ? back : front;
      return note.animate([
        { ...before[index], ...start, easing: ease },
        { transform: slide, ...start, offset: 0.42 },
        { transform: slide, ...end, offset: 0.44, easing: ease },
        { ...after, ...end }
      ], { duration: 540 });
    });

    animations.push(outgoing.querySelector('.reflection-notes__content').animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 180, easing: ease, fill: 'forwards' }
    ));

    await Promise.allSettled(animations.map(animation => animation.finished));
    delete outgoing.dataset.exiting;
    animations.forEach(animation => animation.cancel());
    animations = [];
    animating = false;
  }

  previous.addEventListener('click', () => turn(-1));
  next.addEventListener('click', () => turn(1));
  for (const button of [previous, next]) button.setAttribute('aria-controls', track.id);
  render(true);
  return {
    setStacked(stacked) {
      animations.forEach(animation => animation.finish());
      render(stacked);
    },
    track
  };
}

for (const section of document.querySelectorAll('.reflection-notes')) {
  const decks = [...section.querySelectorAll('[data-notes-deck]')].map(createDeck);
  const toggle = section.querySelector('[data-notes-all]');
  let expanded = false;

  toggle.hidden = false;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', decks.map(({ track }) => track.id).join(' '));
  toggle.addEventListener('click', () => {
    expanded = !expanded;
    decks.forEach(deck => deck.setStacked(!expanded));
    toggle.setAttribute('aria-expanded', String(expanded));
    toggle.textContent = expanded ? 'Torna ai mazzi' : 'Leggi tutti gli appunti';
  });
}
