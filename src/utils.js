export function uuid() {
  return Math.random().toString(16).slice(2);
}

export function saveStatePlugin({ store }) {
  store.$subscribe((_, state) => {
    localStorage.setItem('board', JSON.stringify(state.board));
  });
}

export function lateralScroll() {
  const container = document.querySelector(".board")
  container.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    container.scrollLeft += (evt.deltaY * 0.75 );
});
}