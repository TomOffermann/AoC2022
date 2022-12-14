let lines = require("fs").readFileSync("./files/14.txt", "utf-8").split("\n");
lines = lines.map((e) =>
  e.split("->").map((f) => f.split(",").map((g) => parseInt(g)))
);

let tiles = (points) => {
  let res = [];
  for (let i = 0; i < points.length - 1; i++) {
    let pointA = points[i];
    let pointB = points[i + 1];
    if (pointA[0] == pointB[0]) {
      let from;
      let to;
      if (pointA[1] <= pointB[1]) {
        from = pointA;
        to = pointB;
      } else {
        to = pointA;
        from = pointB;
      }
      for (let y = from[1]; y <= to[1]; y++) {
        res.push([from[0], y]);
      }
    } else if (pointA[1] == pointB[1]) {
      let from;
      let to;
      if (pointA[0] <= pointB[0]) {
        from = pointA;
        to = pointB;
      } else {
        to = pointA;
        from = pointB;
      }
      for (let x = from[0]; x <= to[0]; x++) {
        res.push([x, from[1]]);
      }
    }
  }
  return res;
};

let findMaxY = (lines) => {
  let currMax = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j][1] > currMax) {
        currMax = lines[i][j][1];
      }
    }
  }
  return currMax;
};

let height = findMaxY(lines) + 3;
let width = height * 4 + 500;
let M = [];
for (let i = 0; i < height; i++) {
  M.push([]);
  for (let j = 0; j < width; j++) {
    M[i].push(0);
  }
}

let coll = (x, y) => {
  return M[y][x] == 1;
};

let tripleDown = (x, y, max) => {
  if (y >= max) {
    return null;
  }
  if (coll(x, y + 1) && coll(x - 1, y + 1) && coll(x + 1, y + 1)) {
    return [x, y];
  } else if (coll(x, y + 1) && coll(x - 1, y + 1)) {
    return tripleDown(x + 1, y + 1, max);
  } else if (coll(x, y + 1)) {
    return tripleDown(x - 1, y + 1, max);
  }
  return tripleDown(x, y + 1, max);
};

let tripleDown2 = (x, y, max) => {
  if (y >= max - 1) {
    return [x, y];
  }
  if (coll(x, y + 1) && coll(x - 1, y + 1) && coll(x + 1, y + 1)) {
    return [x, y];
  } else if (coll(x, y + 1) && coll(x - 1, y + 1)) {
    return tripleDown2(x + 1, y + 1, max);
  } else if (coll(x, y + 1)) {
    return tripleDown2(x - 1, y + 1, max);
  }
  return tripleDown2(x, y + 1, max);
};

let task1 = (input) => {
  let start = [500, 0];
  // Initialize map with rocks
  for (let i = 0; i < input.length; i++) {
    let t = tiles(input[i]);
    for (let j = 0; j < t.length; j++) {
      M[t[j][1]][t[j][0]] = 1;
    }
  }

  let count = 0;
  let maxY = findMaxY(input) + 2;

  while (true) {
    let res = tripleDown(start[0], start[1], maxY);
    if (res == null) break;
    count++;
    M[res[1]][res[0]] = 1;
  }

  return count;
};

let task2 = (input) => {
  let start = [500, 0];
  // Initialize map with rocks
  for (let i = 0; i < input.length; i++) {
    let t = tiles(input[i]);
    for (let j = 0; j < t.length; j++) {
      M[t[j][1]][t[j][0]] = 1;
    }
  }
  let count = 0;
  let maxY = findMaxY(input) + 2;
  let test = [];
  while (true) {
    let res = tripleDown2(start[0], start[1], maxY);
    test.push(res);
    count++;
    if (res[0] == 500 && res[1] == 0) break;
    M[res[1]][res[0]] = 1;
  }
  return count;
};

console.log("Task 1: ", task1(lines));

// Reset board
M = [];
for (let i = 0; i < height; i++) {
  M.push([]);
  for (let j = 0; j < width; j++) {
    M[i].push(0);
  }
}

console.log("Task 2: ", task2(lines));
