let lines = require("fs").readFileSync("./files/07.txt", "utf-8").split("\n");

class Directory {
  children = [];
  parent = null;
  dir = null;
  files = [];
  size = 0;
  constructor(children, dir, parent, files, size) {
    this.size = size;
    this.children = children;
    this.dir = dir;
    this.parent = parent;
    this.files = files;
  }
}

let top = null;
let directory = new Directory([], null, null, [], 0);
top = directory;

// Update the filesizes of all parents of a given file/dir
let updateParents = (directory, size) => {
  if (directory.parent == null) {
    return;
  }
  directory.parent.size += size;
  updateParents(directory.parent, size);
};

for (let i = 0; i < lines.length; i++) {
  let parts = lines[i].split(" ");
  if (lines[i][0] == "$" && lines[i][2] == "c") {
    if (directory.dir == null) {
      directory.dir = parts[2];
    } else {
      if (parts[2] == "..") {
        directory = directory.parent;
      } else {
        let newChild = directory.children.find((e) => e.dir == parts[2]);
        directory = newChild;
      }
    }
  } else if (parts[0] == "dir") {
    let newChild = new Directory([], parts[1], directory, [], 0);
    directory.children.push(newChild);
  } else if (!isNaN(parseInt(parts[0]))) {
    let newFile = parseInt(parts[0]);
    //console.log(directory);
    directory.size += newFile;
    directory.files.push(newFile);
    updateParents(directory, newFile);
  }
}

// simple dfs:
let recurse = (dir) => {
  let count = 0;
  if (dir.size <= 100000) {
    count += dir.size;
  }
  //console.log(count, dir)
  for (let i = 0; i < dir.children.length; i++) {
    count += recurse(dir.children[i]);
  }
  return count;
};

// find best-fitting dir:
let findDir = (dir, space) => {
  if (dir.size >= space) {
    let min = dir.size;
    for (let i = 0; i < dir.children.length; i++) {
      let res = findDir(dir.children[i], space);
      //console.log(space)
      if (res < min) {
        min = res;
      }
    }
    return min;
  }
  return Number.MAX_SAFE_INTEGER;
};

let usedSpace = top.size;
let fileSize = 30000000 - (70000000 - usedSpace);

console.log("Task 1: ", recurse(top));
console.log("Task 2: ", findDir(top, fileSize));
