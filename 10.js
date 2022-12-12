let lines = require("fs").readFileSync("./files/10.txt", "utf-8").split("\n");

/*
  NOTE: This is not an elegant solution by any means!!!
  (very hacky)
*/

let count = 1;
let task1 = (input) => {
  input = input.map(e => e.split(" "));
  input = input.map(e => {
    if(e.length > 1) {
      return [e[0], parseInt(e[1])];
    } else {
      return [e[0], null];
    }
  });
  let current = 20;
  let res = 0;
  let cycle = 1;
  for(let i = 0; i < input.length; i++) {
    if(input[i][1] == null) {
      cycle++;
      if(cycle % current == 0) {
        res += cycle * count;
        current += 40;
      }
    } else {
      let value = input[i][1];
      //let currCount = count;
      cycle++;
      if(cycle % current == 0) {
        res += cycle * count;
        current += 40;
      }
      cycle++;
      count += value;
      if(cycle % current == 0) {
        res += cycle * count;
        current += 40;
      }
    }
  }
  return res;
}

let task2 = (input) => {
  input = input.map(e => e.split(" "));
  input = input.map(e => {
    if(e.length > 1) {
      return [e[0], parseInt(e[1])];
    } else {
      return [e[0], null];
    }
  });
  let current = 40;
  let row = "";
  let image = [];
  let res = 0;
  let cycle = 1;
  for(let i = 0; i < input.length; i++) {
    if(input[i][1] == null) {
      if(Math.abs((cycle-1)%40 - (count)) <= 1) {
        row += "#";
      } else {
        row += "."
      }
      cycle++;
      if(cycle % 40 == 0) {
        image.push(row);
        row = "";
      }
    } else {
      let v = input[i][1];
      if(cycle === current) {
        res += cycle * count;
        current += 40;
      }
      if(Math.abs((cycle-1)%40 - (count)) <= 1) {
        row += "#";
      } else {
        row += "."
      }
      cycle++;
      if(cycle % 40 == 0) {
        image.push(row);
        row = "";
      }
      if(Math.abs((cycle-1)%40 - (count)) <= 1) {
        row += "#";
      } else {
        row += "."
      }
      cycle++;
      count += v;
      if(cycle % 40 == 0) {
        image.push(row);
        row = "";
      }
    }
    
  }
  return image;
}

console.log("Task 1: ", task1(lines))
count = 1;
console.log("Task 2: ", task2(lines).map((e,i) => {
  if(i > 0) {
    return e.slice(1);
  } else {
    return e;
  }
}));