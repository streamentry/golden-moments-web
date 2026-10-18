import { makeBoard } from './match-engine.js';

const root = document.querySelector('[data-demo]');
if (root) {
  const buttons = Array.from(root.querySelectorAll('[data-card]'));
  const message = root.querySelector('[data-message]');
  const reset = root.querySelector('[data-reset]');
  const kinds = buttons.map(button => button.dataset.kind);
  const board = makeBoard(kinds);

  function render(event = 'reset') {
    const state = board.snapshot();
    buttons.forEach((button, index) => {
      const paired = state.matched.includes(index);
      const selected = state.chosen.includes(index);
      const label = button.dataset.kind === 'teacup' ? 'Tea cup' : 'Sunflower';
      button.dataset.state = paired ? 'matched' : selected ? 'selected' : 'ready';
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
      button.setAttribute(
        'aria-label',
        label + ', picture ' + (index + 1) + (paired ? ', matched' : selected ? ', selected' : '')
      );
      button.disabled = paired;
    });

    const messages = {
      reset: 'Tap any two pictures that match.',
      first: 'Now choose another picture.',
      different: 'Different pictures. That is okay. Tap a picture to continue.',
      pair: 'Those two pictures go together.',
      complete: 'All pairs together. Play again or take a break.'
    };
    if (event !== 'ignored') message.textContent = messages[event] ?? messages.reset;
  }

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => render(board.tap(index)));
  });
  reset.addEventListener('click', () => {
    render(board.reset());
    buttons[0]?.focus();
  });
  render();
}
