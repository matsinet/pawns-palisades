import html from 'html-literal';
import '../assets/css/components/wall.scss';

const render = (row, column, orientation = 'horizontal', isConfirmed = true) => {
    const isConfirmedClass = isConfirmed ? 'is-confirmed' : '';
    return html`
        <div class="wall ${orientation} ${isConfirmedClass}" data-row="${row}" data-col="${column}" data-orient="${orientation}">
            <div class="wall-control rotate">
              <nav class="material-symbols-outlined">refresh</nav>
            </div>
            <div class="wall-control confirm">
              <nav class="material-symbols-outlined">check</nav>
            </div>
            <div class="wall-control remove">
              <nav class="material-symbols-outlined">delete</nav>
            </div>
        </div>
    `;
};

const hooks = {
  before: async (params, state = {}) => {
    // console.log("Component header beforeHook fired");
  },
  after: async (params, state = {}) => {
    console.log("Component wall afterHook fired");
    const wallElements = document.querySelectorAll(`.wall`);
    wallElements.forEach(element => {
      const { row, col, orient } = element.dataset;
      element.querySelector('.remove').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        store.game.currentState.walls[orient][row][col] = 0;
        router.navigate('/game');
      })
      element.querySelector('.confirm').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        console.log('matsinet-element', element);
        element.classList.add('is-confirmed')
        store.game.currentState.walls[orient][row][col] = 1;
        router.navigate('/game');
      })
      element.querySelector('.rotate').addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();

        // TODO: Add logic to determine whether a wall can be rotated in place
        store.game.currentState.walls[orient][row][col] = 0;
        const newOrent = orient === 'horizontal' ? 'vertical' : 'horizontal';
        store.game.currentState.walls[newOrent][row][col] = 9;
        router.navigate('/game');
      })
    });
  }
};

export default {
  render,
  hooks
};