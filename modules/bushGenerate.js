export default function initBush() {
  const numBushes = 20;
  const game = document.querySelector(".game");

  function bushGenerator() {
    for (let i = 0; i < numBushes; i++) {
      const div = document.createElement("div");
      div.classList.add("bush");
      div.style.left = Math.random() * 95 + "%";
      div.style.top = Math.random() * 90 + "%";
      game.appendChild(div);
    }
  }
  bushGenerator();
}
