import html from 'html-literal';
import '../assets/css/components/wall.scss';

const render = (row, column, orientation = 'horizontal', isConfirmed = true) => {
    const isConfirmedClass = isConfirmed ? 'is-confirmed' : '';
    const controls = !isConfirmed ? html`
        <div class="wall-control rotate">
          <nav class="material-symbols-outlined">refresh</nav>
        </div>
        <div class="wall-control confirm">
          <nav class="material-symbols-outlined">check</nav>
        </div>
        <div class="wall-control remove">
          <nav class="material-symbols-outlined">delete</nav>
        </div>
    ` : '';

    return html`
        <div class="wall ${orientation} ${isConfirmedClass}" data-row="${row}" data-col="${column}" data-orient="${orientation}" data-confirmed="${isConfirmed}">
            ${controls}
        </div>
    `;
};

const hooks = {
  before: async (params, state = {}) => {
    // console.log("Component header beforeHook fired");
  },
  after: async (params, state = {}) => {
    const wallElements = document.querySelectorAll(`.wall:not(.is-confirmed)`);
    wallElements.forEach(element => {
      const { row, col, orient } = element.dataset;

      const removeControl = element.querySelector('.remove');
      const confirmControl = element.querySelector('.confirm');
      const rotateControl = element.querySelector('.rotate');

      if (removeControl) {
        removeControl.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();

          store.game.currentState.walls[orient][row][col] = 0;
          router.navigate('/game');
        }, {once: true});
      }

      if (confirmControl) {
        confirmControl.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();

          // Confirm the wall placement
          store.game.currentState.walls[orient][row][col] = 1;

          // Decrement wall count for current player
          const currentPlayer = store.game.getPlayerById(store.game.currentState.turn);
          if (currentPlayer && currentPlayer.walls > 0) {
            currentPlayer.walls -= 1;
          }

          // Advance to next player's turn
          store.game.currentState.turn = store.game.getNextTurn();

          router.navigate('/game');
        }, {once: true});
      }

      if (rotateControl) {
        rotateControl.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();

          // TODO: Add logic to determine whether a wall can be rotated in place
          store.game.currentState.walls[orient][row][col] = 0;
          const newOrent = orient === 'horizontal' ? 'vertical' : 'horizontal';
          store.game.currentState.walls[newOrent][row][col] = 9;
          router.navigate('/game');
        })
      }
    });
  }
};

export default {
  render,
  hooks
};