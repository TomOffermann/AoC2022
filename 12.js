let lines = require("fs").readFileSync("./files/12.txt", "utf-8").split("\n");

let mapChar = (char) => {
  if (char == "S") {
    return 0;
  } else if (char == "E") {
    return 27;
  }
  return char.charCodeAt(0) - 96;
};

lines = lines.map((e) => e.split("").map((f) => mapChar(f)));

let inBounds = (x, n) => {
  return x >= 0 && x < n;
};
let seen = []

let neighbors = (x, y, w, h) => {
  let neigh = []
  if(inBounds(x-1, w) && !seen[x-1][y]) {
    neigh.push([x-1, y]);
  }
  if(inBounds(x+1, w)&& !seen[x+1][y]) {
    neigh.push([x+1, y]);
  }
  if(inBounds(y-1, h)&& !seen[x][y-1]) {
    neigh.push([x, y-1]);
  }
  if(inBounds(y+1, h)&& !seen[x][y+1]) {
    neigh.push([x, y+1]);
  }
  return neigh;
};

for(let i = 0; i < lines.length; i++) {
  seen.push([]);
  for(let j = 0; j < lines[0].length; j++) {
    seen[i].push(false);
  }
}

let task1 = (input,x,y) => {
  let currX = x; // Pos-x of S
  let currY = y;  // Pos-y of S
  let c;
  let pQ = [[currX,currY,0]]; // Priority-Q
  while(input[currX][currY] != 27) {
    pQ.sort((a,b) => a[2] - b[2]);
    //console.log(pQ)
    let elem = pQ.shift();
    if (elem === undefined) {
      return Number.MAX_SAFE_INTEGER;
    }
    currX = elem[0];
    currY = elem[1];
    c = elem[2];
    seen[currX][currY] = true;
    let ns = neighbors(currX, currY, input.length, input[0].length);
    for(let i = 0; i < ns.length; i++) {
      let curr = input[currX][currY];
      if(input[ns[i][0]][ns[i][1]] - curr <= 1) {
        if(!seen[ns[i][0]][ns[i][1]]) {
          pQ.push([ns[i][0], ns[i][1], c + 1]);
          seen[ns[i][0]][ns[i][1]] = true;
        }
      }
    }
  }
  return c;
};

let task2 = (input) => {
  let starts = []
  for(let i = 0; i < input.length; i++) {
    for(let j = 0; j< input[0].length; j++) {
      if(input[i][j] <= 1) {
        starts.push([i,j]);
      }
    }
  }
  let res = [];
  for(let j = 0; j < starts.length; j++) {
    for(let i = 0; i < lines.length; i++) {
      seen[i] = [];
      for(let j = 0; j < lines[0].length; j++) {
        seen[i].push(false);
      }
    }
    res.push(task1(input, starts[j][0], starts[j][1]));
  };
  res.sort((a,b) => a-b);
  //console.log(starts);
  return res[0];
};

//console.log(lines.length, lines[0].length)

console.log("Task 1: ", task1(lines, 20, 0));
console.log("Task 2: ", task2(lines));
