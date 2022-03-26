"use strict";

const game4096 = {
  playerName: undefined,
  isGameOver: undefined,
  isGamePaused: undefined,
  currentScore: 0,
  bestScore: 0,
  mileStone: 8,
  didMove: false,
  randomPoll: [2, 4],
  spawnSound: new Audio("audios/spawn-sound.wav"),
  mergeSound: new Audio("audios/merge-sound.mp3"),
  mileStoneHitSound: new Audio("audios/milestone-hit-sound.wav"),
  matrix: [
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""],
  ],
  // matrix: [
  //   [16, 128, 32, ""],
  //   [8, 32, 4096, ""],
  //   [2, 512, 1024, ""],
  //   [8, 16384, 8192, 64],
  // ],

  init: () => {
    $(window).keydown(e => {
      switch (e.key) {
        case "ArrowLeft":
        case "A":
        case "a":
          if (!game4096.isGameOver && !game4096.isGamePaused) {
            game4096.commandLeft();
            if (game4096.didMove) {
              game4096.randomPopulate();
              game4096.updateGridDOM();
              game4096.updateScoreboard();
            }
            game4096.checkGameOver();
            if (game4096.isGameOver) {
              console.log("game over");
              game4096.updateGameOverScores();

              setTimeout(() => {
                $("#section-in-game").hide();
                $("#section-end-screen").show();
              }, 2500);
            }
          }

          break;

        case "ArrowRight":
        case "D":
        case "d":
          if (!game4096.isGameOver && !game4096.isGamePaused) {
            game4096.commandRight();
            if (game4096.didMove) {
              game4096.randomPopulate();
              game4096.updateGridDOM();
              game4096.updateScoreboard();
            }
            game4096.checkGameOver();
            if (game4096.isGameOver) {
              console.log("game over");
              game4096.updateGameOverScores();

              setTimeout(() => {
                $("#section-in-game").hide();
                $("#section-end-screen").show();
              }, 2500);
            }
          }

          break;

        case "ArrowUp":
        case "W":
        case "w":
          if (!game4096.isGameOver && !game4096.isGamePaused) {
            game4096.commandUp();
            if (game4096.didMove) {
              game4096.randomPopulate();
              game4096.updateGridDOM();
              game4096.updateScoreboard();
            }
            game4096.checkGameOver();
            if (game4096.isGameOver) {
              console.log("game over");
              game4096.updateGameOverScores();

              setTimeout(() => {
                $("#section-in-game").hide();
                $("#section-end-screen").show();
              }, 2500);
            }
          }

          break;

        case "ArrowDown":
        case "S":
        case "s":
          if (!game4096.isGameOver && !game4096.isGamePaused) {
            game4096.commandDown();
            if (game4096.didMove) {
              game4096.randomPopulate();
              game4096.updateGridDOM();
              game4096.updateScoreboard();
            }
            game4096.checkGameOver();
            if (game4096.isGameOver) {
              console.log("game over");
              game4096.updateGameOverScores();

              setTimeout(() => {
                $("#section-in-game").hide();
                $("#section-end-screen").show();
              }, 2500);
            }
          }

          break;
        default:
      }
    });

    $("form").submit(e => {
      e.preventDefault();
      console.log("shaking 1");

      if (!$("#user-name").val()) {
        $("input[type='text']").addClass("shaking");
        setTimeout(() => {
          $("input[type='text']").removeClass("shaking");
        }, 200);
        $("label")
          .text("Sorry, please enter a name to start")
          .css("color", "#bf0d00");
      } else {
        game4096.playerName = $("#user-name").val();
        $("#section-start-screen").hide();
        $("#section-in-game").show();
        game4096.randomPopulate();
        game4096.randomPopulate();
        game4096.populateGridDOM();
        game4096.updateScoreboard();
      }
    });

    $(".newGameBtn").click(() => {
      game4096.resetGame();
      game4096.randomPopulate();
      game4096.randomPopulate();
      game4096.updateGridDOM();
      game4096.updateScoreboard();
      game4096.isGameOver = false;
    });

    $(".quitBtn").click(() => {
      game4096.resetGame();
      game4096.updateGridDOM();
      game4096.isGameOver = false;
      $("#section-in-game").hide();
      $("#section-start-screen").show();
    });

    $(".instructionBtn").click(() => {
      game4096.isGamePaused = true;
      $("#section-instruction-screen").show();
      console.log("show");
    });

    $(".closeBtn").click(() => {
      game4096.isGamePaused = false;
      $("#section-instruction-screen").hide();
    });

    $(".restartBtn").click(() => {
      game4096.resetGame();
      game4096.randomPopulate();
      game4096.randomPopulate();
      game4096.updateGridDOM();
      game4096.updateScoreboard();
      game4096.isGameOver = false;
      $("#section-end-screen").hide();
      $("#section-in-game").show();
    });

    $(".homeBtn").click(() => {
      game4096.resetGame();
      game4096.updateGridDOM();
      game4096.isGameOver = false;
      $("#section-end-screen").hide();
      $("#section-start-screen").show();
    });

    // Due to CSS implementation, HTML inline attributes "hidden" not valid
    $("#section-instruction-screen").hide();
  },

  resetGame: () => {
    game4096.mileStone = 8;
    game4096.currentScore = 0;
    game4096.matrix.forEach((item, rowIndex) => {
      item.forEach((subitem, colIndex) => {
        game4096.matrix[rowIndex][colIndex] = "";
      });
    });
  },

  checkGameOver: () => {
    const matrix = game4096.matrix;
    let rowCount = 0;
    let matrixFull = false;

    matrix.forEach(item => {
      if (item.includes("") === false) {
        rowCount++;
        if (rowCount === matrix.length) {
          matrixFull = true;
        }
      }
    });

    if (matrixFull) {
      console.log("matrix full reached");
      // loop through rows
      for (let i = 0; i < matrix.length; i++) {
        // loop through items in each row
        for (let j = 0; j < matrix[0].length - 1; j++) {
          if (matrix[i][j] != matrix[i][j + 1]) {
            console.log(matrix[i][j], matrix[i][j + 1]);
            game4096.isGameOver = true;
          } else if (matrix[i][j] === matrix[i][j + 1]) {
            game4096.isGameOver = false;
            // terminate the entire checkGameOver function
            return;
          }
        }
      }

      // check row items (vertical sweep)
      // col index uses first row length
      for (let i = 0; i <= matrix[0].length - 1; i++) {
        // row index
        for (let j = 0; j <= matrix.length - 2; j++) {
          if (matrix[j][i] != matrix[j + 1][i]) {
            game4096.isGameOver = true;
          } else if (matrix[j][i] === matrix[j + 1][i]) {
            game4096.isGameOver = false;
            // terminate the entire checkGameOver function
            return;
          }
        }
      }
    }
  },

  populateGridDOM: () => {
    if (!$(".grid").children().length > 0) {
      game4096.matrix.forEach((item, rowIndex) => {
        item.forEach((subItem, colIndex) => {
          let index = rowIndex * 4 + colIndex;
          $(".grid").append(
            `<div class="grid-number"><p id="grid-${index}">${subItem}</p></div>`
          );
          const cell = $(`#grid-${index}`);
          game4096.numberCellColorSelector(cell);
        });
      });
    } else {
      // if the grid is not empty, update the grid for the initial two random blocks to show up
      game4096.updateGridDOM();
    }
  },

  updateGridDOM: () => {
    game4096.matrix.forEach((item, rowIndex) => {
      item.forEach((subItem, colIndex) => {
        let index = rowIndex * 4 + colIndex;
        $(`#grid-${index}`).text(subItem);
        const cell = $(`#grid-${index}`);
        game4096.numberCellColorSelector(cell);
      });
    });
  },

  updateScoreboard: () => {
    const matrix = game4096.matrix;
    $(".current-score p").text(game4096.currentScore);
    $(".best-score p").text(game4096.bestScore);
    $(".milestone-message").text(
      `Hi ${game4096.playerName}, slide to unlock ${game4096.mileStone}`
    );

    if (game4096.currentScore > game4096.bestScore) {
      game4096.bestScore = game4096.currentScore;
      $(".best-score p").text(game4096.bestScore);
    }

    matrix.forEach(oneRow => {
      oneRow.forEach(item => {
        if (item >= game4096.mileStone) {
          game4096.mileStone = 2 * game4096.mileStone;
          game4096.mileStoneHitSound.play();
          $(".milestone-message").text(
            `Hi ${game4096.playerName}, slide to unlock ${game4096.mileStone}`
          );
          if (game4096.mileStone > 32768) {
            $(".milestone-message").css("font-size", "1.1rem");
          }
        }
      });
    });
  },

  updateGameOverScores: () => {
    $(".end-scores p:nth-child(1)").text(`Score: ${game4096.currentScore}`);
    $(".end-scores p:nth-child(2)").text(`Best: ${game4096.bestScore}`);
  },

  numberCellColorSelector: cell => {
    const number = cell.text();
    switch (number) {
      case "":
        cell.parent().removeClass("add-transition");
        cell.parent().css("background-color", "#8f8577");
        break;
      case "2":
        cell.parent().addClass("add-transition");
        cell.parent().css("background-color", "#d9c9bd");
        cell.css({ color: "#3d3a37", "font-size": "2.85rem" });
        break;
      case "4":
        cell.parent().addClass("add-transition");
        cell.parent().css("background-color", "#e6c7ae");
        cell.css({ color: "#3d3a37", "font-size": "2.85rem" });
        break;
      case "8":
        cell.parent().addClass("add-transition");
        cell.parent().css("background-color", "#f0a669");
        cell.css({ color: "#f2ede9", "font-size": "2.85rem" });
        break;
      case "16":
        cell.parent().addClass("add-transition");
        cell.parent().css("background-color", "#f08e3e");
        cell.css({ color: "#f2ede9", "font-size": "2.75rem" });
        break;
      case "32":
        cell.parent().addClass("add-transition");
        cell.parent().css("background-color", "#e8705a");
        cell.css({ color: "#f2ede9", "font-size": "2.6rem" });
        break;
      case "64":
        cell.parent().addClass("add-transition");
        cell.parent().css("background-color", "#de543c");
        cell.css({ color: "#f2ede9", "font-size": "2.55rem" });
        break;
      case "128":
        cell.parent().addClass("add-transition");
        cell.parent().css("background-color", "#f5c66e");
        cell.css({ color: "#f2ede9", "font-size": "2.35rem" });
        break;
      case "256":
        cell.parent().addClass("add-transition");
        cell.parent().css("background-color", "#e8b256");
        cell.css({ color: "#f2ede9", "font-size": "2.25rem" });
        break;
      case "512":
        cell.parent().addClass("add-transition");
        cell.parent().css("background-color", "#e6a637");
        cell.css({ color: "#f2ede9", "font-size": "2.25rem" });
        break;
      case "1024":
        cell.parent().addClass("add-transition");
        cell.parent().css("background-color", "#e39b20");
        cell.css({ color: "#f2ede9", "font-size": "1.8rem" });
        break;
      case "2048":
        cell.parent().addClass("add-transition");
        cell.parent().css("background-color", "#d68a06");
        cell.css({ color: "#f2ede9", "font-size": "1.7rem" });
        break;
      case "4096":
        cell.parent().addClass("add-transition");
        cell.parent().css("background-color", "#8516b5");
        cell.css({ color: "#f2ede9", "font-size": "1.65rem" });
        break;
      case "8192":
        cell.parent().addClass("add-transition");
        cell.parent().css("background-color", "#b516ad");
        cell.css({ color: "#f2ede9", "font-size": "1.65rem" });
        break;
      case "16384":
        cell.parent().addClass("add-transition");
        cell.parent().css("background-color", "#b51640");
        cell.css({ color: "#f2ede9", "font-size": "1.4rem" });
        break;
      default:
        cell.parent().addClass("add-transition");
        cell.parent().css("background-color", "#630000");
        cell.css({ color: "#f2ede9", "font-size": "1.4rem" });
    }
  },

  randomGenerator: () => {
    let randNumber = game4096.randomPoll[Math.round(Math.random() * 1)];
    // console.log(randNumber);
    let randColIndex = Math.floor(Math.random() * 4);
    let randRowIndex = Math.floor(Math.random() * 4);

    if (game4096.matrix[randRowIndex][randColIndex]) {
      [randNumber, randRowIndex, randColIndex] = game4096.randomGenerator();
    }
    return [randNumber, randRowIndex, randColIndex];
  },

  randomPopulate: () => {
    let [randNumber, randRowIndex, randColIndex] = game4096.randomGenerator();

    if (game4096.matrix[randRowIndex].includes("")) {
      game4096.matrix[randRowIndex][randColIndex] = randNumber;
      game4096.spawnSound.currentTime = 0; // to cut off the previous unfinished sound playback
      game4096.spawnSound.play();
    }
  },

  commandLeft: () => {
    game4096.didMove = false;
    game4096.matrix.forEach(oneRow => {
      // merge
      for (let i = 0; i <= oneRow.length - 1; i++) {
        for (let j = i + 1; j <= oneRow.length - 1; j++) {
          if (oneRow[i] && oneRow[j] && oneRow[i] != oneRow[j]) {
            // break out the current inner loop so the outer loop can continue
            break;
          } else if (oneRow[i] && oneRow[i] === oneRow[j]) {
            oneRow[i] += oneRow[j];
            oneRow[j] = "";
            game4096.currentScore += oneRow[i];
            game4096.didMove = true;
            game4096.mergeSound.currentTime = 0;
            game4096.mergeSound.play();
            // break out the current inner loop so the outer loop can continue
            break;
          }
        }
      }
      // shift
      for (let i = 0; i <= oneRow.length - 1; i++) {
        for (let j = i + 1; j <= oneRow.length - 1; j++) {
          if (!oneRow[i] && oneRow[j]) {
            oneRow[i] = oneRow[j];
            oneRow[j] = "";
            game4096.didMove = true;
          }
        }
      }
    });
  },

  commandRight: () => {
    game4096.didMove = false;
    game4096.matrix.forEach(oneRow => {
      //merge
      for (let i = oneRow.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
          if (oneRow[i] && oneRow[j] && oneRow[i] != oneRow[j]) {
            // break out the current inner loop so the outer loop can continue
            break;
          } else if (oneRow[i] && oneRow[i] === oneRow[j]) {
            oneRow[i] += oneRow[j];
            oneRow[j] = "";
            game4096.currentScore += oneRow[i];
            game4096.didMove = true;
            game4096.mergeSound.currentTime = 0;
            game4096.mergeSound.play();
            // break out the current inner loop so the outer loop can continue
            break;
          }
        }
      }
      // shift
      for (let i = oneRow.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
          if (!oneRow[i] && oneRow[j]) {
            oneRow[i] = oneRow[j];
            oneRow[j] = "";
            game4096.didMove = true;
          }
        }
      }
    });
  },

  commandUp: () => {
    game4096.didMove = false;
    const matrix = game4096.matrix;

    // col index uses first row length
    for (let i = 0; i <= matrix[0].length - 1; i++) {
      // row index
      for (let j = 0; j <= matrix.length - 1; j++) {
        // row index comparison
        for (let k = j + 1; k <= matrix.length - 1; k++) {
          // merge
          if (matrix[j][i] && matrix[k][i] && matrix[j][i] != matrix[k][i]) {
            break;
          } else if (matrix[j][i] && matrix[j][i] === matrix[k][i]) {
            matrix[j][i] += matrix[k][i];
            matrix[k][i] = "";
            game4096.currentScore += matrix[j][i];
            game4096.didMove = true;
            game4096.mergeSound.currentTime = 0;
            game4096.mergeSound.play();
            break;
          }
        }
      }
    }

    // col index uses first row length
    for (let i = 0; i <= matrix[0].length - 1; i++) {
      // row index
      for (let j = 0; j <= matrix.length - 1; j++) {
        // row index comparison
        for (let k = j + 1; k <= matrix.length - 1; k++) {
          // shift
          if (!matrix[j][i] && matrix[k][i]) {
            matrix[j][i] = matrix[k][i];
            matrix[k][i] = "";
            game4096.didMove = true;
          }
        }
      }
    }
  },

  commandDown: () => {
    game4096.didMove = false;
    const matrix = game4096.matrix;

    // col index uses first row length
    for (let i = matrix[0].length - 1; i >= 0; i--) {
      // row index
      for (let j = matrix.length - 1; j >= 0; j--) {
        // row index comparison
        for (let k = j - 1; k >= 0; k--) {
          // merge
          if (matrix[j][i] && matrix[k][i] && matrix[j][i] != matrix[k][i]) {
            break;
          } else if (matrix[j][i] && matrix[j][i] === matrix[k][i]) {
            matrix[j][i] += matrix[k][i];
            matrix[k][i] = "";
            game4096.currentScore += matrix[j][i];
            game4096.didMove = true;
            game4096.mergeSound.currentTime = 0;
            game4096.mergeSound.play();
            break;
          }
        }
      }
    }

    // col index uses first row length
    for (let i = matrix[0].length - 1; i >= 0; i--) {
      // row index
      for (let j = matrix.length - 1; j >= 0; j--) {
        // row index comparison
        for (let k = j - 1; k >= 0; k--) {
          // shift
          if (!matrix[j][i] && matrix[k][i]) {
            matrix[j][i] = matrix[k][i];
            matrix[k][i] = "";
            game4096.didMove = true;
          }
        }
      }
    }
  },
};

game4096.init();
