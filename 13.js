let lines = require("fs").readFileSync("./files/13.txt", "utf-8").split("\n\n");

let parseList = (str, i) => {
  let res = [];
  let string = str.split("");
  i += 1;
  while (string[i] != "]") {
    if (string[i] == "[") {
      let nestedList = parseList(string.join(""), i);
      res.push(nestedList[0]);
      i = nestedList[1] + 1;
    }
    if (!isNaN(parseInt(string.slice(i).join("")))) {
      res.push(parseInt(string.slice(i).join("")));
      i += res[res.length - 1].toString().length;
    } else {
      if (string[i] != "]") {
        while (string[i] != ",") {
          i++;
        }
        i++;
      }
    }
  }
  return [res, i];
};

let rightOrder = [];

let sum = (arr) => {
  let res = 0;
  for (let i = 0; i < arr.length; i++) {
    res += arr[i];
  }
  return res;
};

let compare = (l1, l2) => {
  if(l1?.length >= 0 && l2?.length >= 0) {
    for(let i = 0; i < Math.max(l1.length, l2.length); i++) {
      if(i >= l1.length) return true;
      if(i >= l2.length) return false;
      if(compare(l1[i], l2[i]) !== undefined) {
        return compare(l1[i], l2[i]);
      }
    }
  } else if(l1?.length >= 0) {
    if (compare(l1, [l2]) !== undefined) {
      return compare(l1, [l2]);
    }
  } else if(l2?.length >= 0) {
    if (compare([l1], l2) !== undefined) {
      return compare([l1], l2);
    }
  } else {
    if(l1 > l2) return false;
    if(l1 < l2) return true;
  }
}


let a = [[2]]
let b = [[6]]
let listToSort = [a,b];

for (let i = 0; i < lines.length; i++) {
  let pack = lines[i].split("\n");
  let l1 = parseList(pack[0],0)[0];
  let l2 = parseList(pack[1],0)[0];
  if(compare(l1, l2)) {
    rightOrder.push(i+1)
  }
  listToSort.push(l1,l2);
}

listToSort.sort((a,b) => {
  let res = compare(a,b);
  if(res == true) {
    return -1;
  } else if(res == false) {
    return 1
  }
  return 0;
})

let aIndex = 0;
let bIndex = 0;

for(let i = 0; i < listToSort.length; i++) {
  if(listToSort[i] == a) {
    aIndex = i+1;
  }
  if(listToSort[i] == b) {
    bIndex = i+1;
  }
}

console.log("Task 1: ", sum(rightOrder));
console.log("Task 2: ", aIndex * bIndex);
