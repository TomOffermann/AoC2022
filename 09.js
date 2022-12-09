let lines = require("fs").readFileSync("./files/09.txt", "utf-8").split("\n");

let test1 = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`.split("\n");

let test2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`.split("\n");

let test3 = ["R 5", "U 8"]

let moveTo = (x,y, tx,ty) => {
  if(!((Math.abs(tx - x) == 1 && Math.abs(ty - y) == 1) ||
  (x == tx && y == ty) ||
  (Math.abs(tx - x) == 1 && y == ty) ||
  (Math.abs(ty - y) == 1 && x == tx))) {

    if(x > tx) {
      tx++;
    } else if (tx > x) {
      tx--;
    }
    if(y > ty) {
      ty++;
    } else if (ty > y) {
      ty--;
    }
  }
  return [tx,ty]
} 

let curr = lines; //lines.slice(0,20);
curr = curr.map((e) => e.split(" "));
curr = curr.map((e) => [e[0], parseInt(e[1])]);

let chaseAfter = (x, y, tx, ty, dir) => {
  if (
    (Math.abs(tx - x) == 1 && Math.abs(ty - y) == 1) ||
    (x == tx && y == ty) ||
    (Math.abs(tx - x) == 1 && y == ty) ||
    (Math.abs(ty - y) == 1 && x == tx)
  ) {
    return [tx, ty];
  }
  switch (dir) {
    case "R":
      return [x - 1, y];
    case "L":
      return [x + 1, y];
    case "U":
      return [x, y - 1];
    case "D":
      return [x, y + 1];
  }
};

let task1 = (input) => {
  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;
  let visited = new Set();
  for (let i = 0; i < input.length; i++) {
    let dir = input[i][0];
    let amount = input[i][1];
    if (dir == "R") {
      for (let j = 1; j <= amount; j++) {
        x++;
        [tx, ty] = moveTo(x, y, tx, ty, dir);
        visited.add([tx, ty].join(","));
      }
    }
    if (dir == "L") {
      for (let j = 1; j <= amount; j++) {
        x--;
        [tx, ty] = chaseAfter(x, y, tx, ty, dir);
        visited.add([tx, ty].join(","));
      }
    }
    if (dir == "U") {
      for (let j = 1; j <= amount; j++) {
        y++;
        [tx, ty] = chaseAfter(x, y, tx, ty, dir);
        visited.add([tx, ty].join(","));
      }
    }
    if (dir == "D") {
      for (let j = 1; j <= amount; j++) {
        y--;
        [tx, ty] = chaseAfter(x, y, tx, ty, dir);
        visited.add([tx, ty].join(","));
      }
    }
  }
  return visited.size;
};

let task2 = (input) => {
  let snake = [];
  for (let i = 0; i < 9; i++) {
    snake.push([0, 0]);
  }
  let x = 0;
  let y = 0;
  let visited = new Set();
  for (let i = 0; i < input.length; i++) {
    let dir = input[i][0];
    let amount = input[i][1];
    if (dir == "R") {
      for (let j = 1; j <= amount; j++) {
        x++;
        for (let k = 0; k < 9; k++) {
          if(k == 0) {
            snake[k] = chaseAfter(k == 0 ? x : snake[k - 1][0], k == 0 ? y : snake[k - 1][1], snake[k][0], snake[k][1], dir);
          } else {
            snake[k] = moveTo(snake[k-1][0],snake[k-1][1], snake[k][0], snake[k][1]);
          }
          //console.log(snake[k]);
          if (k == 8) {
            visited.add(snake[k].join(","));
          }
        }
        //console.log("------");
      }
    }
    if (dir == "L") {
      for (let j = 1; j <= amount; j++) {
        x--;
        for (let k = 8; k >= 0; k--) {
          if(k == 0) {
            snake[k] = chaseAfter(k == 0 ? x : snake[k - 1][0], k == 0 ? y : snake[k - 1][1], snake[k][0], snake[k][1], dir);
          } else {
            snake[k] = moveTo(snake[k-1][0],snake[k-1][1], snake[k][0], snake[k][1]);
          }
          if (k == 8) {
            visited.add(snake[k].join(","));
          }
        }
      }
    }
    if (dir == "U") {
      for (let j = 1; j <= amount; j++) {
        y++;
        for (let k = 0; k < 9; k++) {
          if(k == 0) {
            snake[k] = chaseAfter(k == 0 ? x : snake[k - 1][0], k == 0 ? y : snake[k - 1][1], snake[k][0], snake[k][1], dir);
          } else {
            snake[k] = moveTo(snake[k-1][0],snake[k-1][1], snake[k][0], snake[k][1]);

          }
          //console.log(snake[k]);
          if (k == 8) {
            visited.add(snake[k].join(","));
          }
        }
        //console.log("------");
      }
    }
    if (dir == "D") {
      for (let j = 1; j <= amount; j++) {
        y--;
        for (let k = 8; k >= 0; k--) {
          if(k == 0) {
            snake[k] = chaseAfter(k == 0 ? x : snake[k - 1][0], k == 0 ? y : snake[k - 1][1], snake[k][0], snake[k][1], dir);
          } else {
            snake[k] = moveTo(snake[k-1][0],snake[k-1][1], snake[k][0], snake[k][1]);
          }
          if (k == 8) {
            visited.add(snake[k].join(","));
          }
        }
      }
    }
  }
  //console.log(visited);
  return visited.size;
};

console.log("Task 1: ", task1(curr));
console.log("Task 2: ", task2(curr));
