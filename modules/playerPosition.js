export default function initPlayer() {
  const red = document.querySelector(".red");
  const blue = document.querySelector(".blue");
  let [numRed, numBlue] = [0, 0];
  const numBall = 7;
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
  const welcome = document.querySelector(".welcome");
  const btn = document.querySelector(".start");
  btn.addEventListener("click", handleClick);
  function handleClick(event) {
    let cont = 4;
    event.preventDefault();
    btn.style.display = "none";
    btn.removeEventListener("click", handleClick);
    const timer = setInterval(() => {
      cont--;
      welcome.innerText = `The game will start in ${cont} seconds`;
    }, 1000);
    setTimeout(function createBall() {
      clearInterval(timer);
      welcome.innerText = `THE GAME STARTED`;
      for (let i = 0; i < numBall; i++) {
        ballGenerator();
      }
    }, 5000);
  }

  const sound = new Audio("./sound/coin.mp3");
  const playerOne = document.getElementById("playerOne");
  const playerTwo = document.getElementById("playerTwo");
  const playerOne_pos = {
    x: parseInt(830 / 2),
    y: parseInt(550 / 2),
  };
  const playerTwo_pos = {
    x: parseInt(1000 / 2),
    y: parseInt(550 / 2),
  };
  const playerOne_vel = {
    x: 0,
    y: 0,
  };
  const playerTwo_vel = {
    x: 0,
    y: 0,
  };
  function toWalk() {
    playerOne_pos.x += playerOne_vel.x;
    playerOne_pos.y += playerOne_vel.y;
    playerOne.style.left = playerOne_pos.x + "px";
    playerOne.style.bottom = playerOne_pos.y + "px";

    playerOne_pos.x = Math.max(
      0,
      Math.min(1000 - playerOne.clientWidth, playerOne_pos.x)
    );
    playerOne_pos.y = Math.max(
      0,
      Math.min(600 - playerOne.clientHeight, playerOne_pos.y)
    );

    playerTwo_pos.x = Math.max(
      0,
      Math.min(1000 - playerTwo.clientWidth, playerTwo_pos.x)
    );
    playerTwo_pos.y = Math.max(
      0,
      Math.min(600 - playerTwo.clientHeight, playerTwo_pos.y)
    );

    playerTwo_pos.x += playerTwo_vel.x;
    playerTwo_pos.y += playerTwo_vel.y;
    playerTwo.style.left = playerTwo_pos.x + "px";
    playerTwo.style.bottom = playerTwo_pos.y + "px";
    checkCollisions();
    requestAnimationFrame(toWalk);
  }
  toWalk();

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

  window.addEventListener("keydown", (press) => {
    switch (press.key) {
      case "w":
        playerOne_vel.y = 3;
        playerOne.style.backgroundImage = 'url("./images/player_front.png")';
        playerOne.classList.add("active");
        break;
      case "s":
        playerOne_vel.y = -3;
        playerOne.style.backgroundImage = 'url("./images/player_back.png")';
        playerOne.classList.add("active");
        break;
      case "a":
        playerOne_vel.x = -3;
        playerOne.style.backgroundImage = 'url("./images/player_left.png")';
        playerOne.classList.add("active");
        break;
      case "d":
        playerOne_vel.x = 3;
        playerOne.style.backgroundImage = 'url("./images/player_right.png")';
        playerOne.classList.add("active");
        break;
      case "ArrowUp":
        playerTwo_vel.y = 3;
        playerTwo.style.backgroundImage = 'url("./images/player_front.png")';
        playerTwo.classList.add("active");
        break;
      case "ArrowDown":
        playerTwo_vel.y = -3;
        playerTwo.style.backgroundImage = 'url("./images/player_back.png")';
        playerTwo.classList.add("active");
        break;
      case "ArrowLeft":
        playerTwo_vel.x = -3;
        playerTwo.style.backgroundImage = 'url("./images/player_left.png")';
        playerTwo.classList.add("active");
        break;
      case "ArrowRight":
        playerTwo_vel.x = 3;
        playerTwo.style.backgroundImage = 'url("./images/player_right.png")';
        playerTwo.classList.add("active");
        break;
    }
  });
  window.addEventListener("keyup", (notPress) => {
    if (
      notPress.key == "ArrowUp" ||
      notPress.key == "ArrowDown" ||
      notPress.key == "ArrowLeft" ||
      notPress.key == "ArrowRight"
    ) {
      playerTwo_vel.x = 0;
      playerTwo_vel.y = 0;
      playerTwo.classList.remove("active");
    }
    if (
      notPress.key == "w" ||
      notPress.key == "a" ||
      notPress.key == "s" ||
      notPress.key == "d"
    ) {
      playerOne_vel.x = 0;
      playerOne_vel.y = 0;
      playerOne.classList.remove("active");
    }
  });

  function checkCollisions() {
    balls.forEach((ball) => {
      if (collision(ball.ball, playerOne)) {
        sound.play();
        ball.ball.remove();
        ballGenerator();
        numRed += 1;
        red.innerText = `Red collected: ${numRed} Pokéballs.`;
        if (numRed === 20) {
          welcome.innerText = `RED WIN!`;
          createResetButton();
        }
      }
      if (collision(ball.ball, playerTwo)) {
        sound.play();
        ball.ball.remove();
        ballGenerator();
        numBlue += 1;
        blue.innerText = `Blue collected: ${numBlue} Pokéballs.`;

        if (numBlue === 20) {
          welcome.innerText = `BLUE WIN!`;
          createResetButton();
        }
      }
    });
  }

  function collision($div1, $div2) {
    var x1 = $div1.getBoundingClientRect().left;
    var y1 = $div1.getBoundingClientRect().top;
    var h1 = $div1.clientHeight;
    var w1 = $div1.clientWidth;
    var b1 = y1 + h1;
    var r1 = x1 + w1;

    var x2 = $div2.getBoundingClientRect().left;
    var y2 = $div2.getBoundingClientRect().top;
    var h2 = $div2.clientHeight;
    var w2 = $div2.clientWidth;
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
  }

  function createResetButton() {
    btn.style.display = "block";
    btn.innerText = "reset";
    btn.addEventListener("click", endGame);
  }
  function endGame() {
    let cont = 4;
    btn.style.display = "none";
    const timer = setInterval(() => {
      cont--;
      welcome.innerText = `the game will reset in ${cont} seconds`;
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      window.location.reload();
    }, 5000);
  }
}
