let lines = require("fs").readFileSync("./files/08.txt", "utf-8").split("\n");

let lines1 = `30373
25512
65332
33549
35390`.split("\n");

let curr = lines;

let dp = [];
for (let i = 0; i < curr.length; i++) {
  dp.push([]);
  for (let j = 0; j < curr.length; j++) {
    dp[i].push(0);
  }
}

let inBounds = (x) => {
  return x >= 0 && x < curr.length;
};

let countVisibleFrom = (x, y) => {
  if (x == 0 || y == 0 || x == curr.length - 1 || y == curr.length - 1) {
    return 0;
  }
  let a = 0;
  let b = 0;
  let c = 0;
  let d = 0;

  let i = y - 1;
  while (inBounds(i) && curr[x][i] < curr[x][y]) {
    a++;
    i--;
  }
  if (inBounds(i) && curr[x][i] >= curr[x][y]) {
    a++;
  }

  let j = y + 1;
  while (inBounds(j) && curr[x][j] < curr[x][y]) {
    b++;
    j++;
  }
  if (inBounds(j) && curr[x][j] >= curr[x][y]) {
    b++;
  }

  let k = x - 1;
  while (inBounds(k) && curr[k][y] < curr[x][y]) {
    c++;
    k--;
  }
  if (inBounds(k) && curr[k][y] >= curr[x][y]) {
    c++;
  }

  let l = x + 1;
  while (inBounds(l) && curr[l][y] < curr[x][y]) {
    d++;
    l++;
  }
  if (inBounds(l) && curr[l][y] >= curr[x][y]) {
    d++;
  }
  return a * b * c * d;
};

let countVisible = (trees) => {
  for (let i = 0; i < trees.length; i++) {
    let currentMaxHeight = trees[i][0];
    let counter = 0;
    for (let j = 0; j < trees.length; j++) {
      if (
        i === 0 ||
        i === trees.length - 1 ||
        j === 0 ||
        j === trees.length - 1
      ) {
        dp[i][j] += 0;
      }
      if (trees[i][j] > currentMaxHeight) {
        counter++;
        dp[i][j] = counter;
        currentMaxHeight = trees[i][j];
      } else if (trees[i][j] === currentMaxHeight) {
        counter++;
        dp[i][j] = counter;
        currentMaxHeight = trees[i][j];
        counter = 0;
      } else {
      }
    }
    currentMaxHeight = trees[i][trees.length - 1];
    for (let j = trees.length - 1; j >= 0; j--) {
      if (
        i === 0 ||
        i === trees.length - 1 ||
        j === 0 ||
        j === trees.length - 1
      ) {
        dp[i][j] = 1;
      }
      if (trees[i][j] > currentMaxHeight) {
        dp[i][j] = 1;
        currentMaxHeight = trees[i][j];
      }
    }
  }
  for (let i = 0; i < trees.length; i++) {
    let currentMaxHeight = trees[0][i];
    for (let j = 0; j < trees.length; j++) {
      if (
        i === 0 ||
        i === trees.length - 1 ||
        j === 0 ||
        j === trees.length - 1
      ) {
        dp[j][i] = 1;
      }
      if (trees[j][i] > currentMaxHeight) {
        dp[j][i] = 1;
        currentMaxHeight = trees[j][i];
      }
    }
    currentMaxHeight = trees[trees.length - 1][i];
    for (let j = trees.length - 1; j >= 0; j--) {
      if (
        i === 0 ||
        i === trees.length - 1 ||
        j === 0 ||
        j === trees.length - 1
      ) {
        dp[j][i] = 1;
      }
      if (trees[j][i] > currentMaxHeight) {
        dp[j][i] = 1;
        currentMaxHeight = trees[j][i];
      }
    }
  }
};

countVisible(curr.map((e) => e.split("").map((f) => parseInt(f))));
let count = 0;
for(let i = 0; i < curr.length; i++) {
  for(let j = 0; j < curr.length; j++) {
    count += dp[i][j];
  }
}
console.log("Task 1: ", count);

let max = 0;
for (let i = 0; i < curr.length; i++) {
  for (let j = 0; j < curr.length; j++) {
    dp[i][j] = countVisibleFrom(i, j);
    if (dp[i][j] > max) {
      max = dp[i][j];
    }
  }
}


console.log("Task 2: ", max);
