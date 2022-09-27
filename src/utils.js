export function uuid() {
  return Math.random().toString(16).slice(2);
}

export function saveStatePlugin({ store }) {
  store.$subscribe((_, state) => {
    if (state.board) state.boards[state.board.id] = state.board
    localStorage.setItem('boards', JSON.stringify(state.boards));
  }, {detached: true });

}

export function lateralScroll() {
  const container = document.querySelector('.board');
  container.addEventListener('wheel', (evt) => {
    evt.preventDefault();
    container.scrollLeft += evt.deltaY * 0.75;
  });
}

export const newHeight = (value, lineLength = 35) => {
  let numberOfLineBreaks = 0;
  let counter = 0;
  let index;
  let newValue = value;
  for (index = 0; index < value.length; index++) {
    counter++;
    if (value[index] === '\n') {
      numberOfLineBreaks++;
      counter = 0;
    }
    if (counter === lineLength) {
      value = [value.slice(0, index), '\n', value.slice(index)].join('');
      numberOfLineBreaks++;
      counter = 0;
    }
  }
  if (value.at(-1) === '\n') {
    newValue = value.slice(0, index - 1);
    numberOfLineBreaks -= 1;
  }
  const height = 20 * numberOfLineBreaks + 24;
  return { height, newValue };
};
export const handleHeight = (e, lineLength = 35) => {
  const { height, newValue } = newHeight(e.value, lineLength);
  e.style.height = height + 'px';
  e.value = newValue;
};
