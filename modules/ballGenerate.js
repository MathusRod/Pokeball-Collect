export default function initPokeball() {
  const numBall = 5;
  const game = document.querySelector(".game");
  const balls = [];
  function ballGenerator() {
    const div = document.createElement("div");
    div.classList.add("pokeball");
    let x = Math.random() * 95 + "%";
    let y = Math.random() * 90 + "%";
    div.style.left = x;
    div.style.top = y;
    balls.push({
      ball: div,
      pos: {
        x,
        y,
      },
    });
    game.appendChild(div);
  }
  function createBall() {
    for (let i = 0; i < numBall; i++) {
      ballGenerator();
    }
  }
  createBall();
}
