let lines = require("fs").readFileSync("./files/11.txt", "utf-8").split("\n\n");
let monkeys = [];

// Monkey class
class Monkey {
  items = [];
  count = 0;
  to1 = null;
  to2 = null;
  div = 0;
  op = "";
  v = "";
  // Init a monkey
  constructor(items, to1, to2, operation, div) {
    this.items = items;
    this.to1 = to1;
    this.to2 = to2;
    this.op = operation.split("=")[1].split(" ")[2];
    this.v = operation.split("=")[1].split(" ")[3];
    this.div = div;
  }
  // Throw an item to monkey (v)
  throwTo(v) {
    this.items.push(v);
  }
  round(task1) {
    while (this.items.length > 0) {
      this.count++;
      let old = this.items.shift();
      let vNum = 0;
      if (this.v === "old") {
        vNum = old;
      } else {
        vNum = parseInt(this.v);
      }
      let n = 0;
      if (this.op == "*") {
        n = old * vNum;
      } else {
        n = old + vNum;
      }
      if (task1) {
        n = Math.floor(n / 3);
      }
      // Throw-to conditions:
      if (n % this.div == 0) {
        monkeys[this.to1].throwTo(n);
      } else {
        monkeys[this.to2].throwTo(n);
      }
    }
  }
}

// parseing a monkey from one "chunk" of monkey data
let parseMonkey = (monkey) => {
  let list = monkey.split("\n");
  let items = list[1]
    .split(":")[1]
    .split(",")
    .map((e) => parseInt(e));
  let operation = list[2].split(":")[1];
  let div = parseInt(list[3].split(" ")[list[3].split(" ").length - 1]);
  let to1 = parseInt(list[4].split(" ")[list[4].split(" ").length - 1]);
  let to2 = parseInt(list[5].split(" ")[list[5].split(" ").length - 1]);
  return new Monkey(items, to1, to2, operation, div);
};

monkeys = lines.map((e) => parseMonkey(e));

for(let i = 0; i < 20; i++) {
  for(let j = 0; j < monkeys.length; j++) {
    monkeys[j].round(true);
  }
}

// Find the two most active monkeys
monkeys.sort((a, b) => b.count - a.count);
console.log("Task 1: ", monkeys[0].count * monkeys[1].count);

// Re-parse the monkey to our default
monkeys = lines.map((e) => parseMonkey(e));

for (let i = 0; i < 10000; i++) {
  let mod = 1;
  for (let j = 0; j < monkeys.length; j++) {
    mod *= monkeys[j].div;
    monkeys[j].round(false);
  }
  for (let j = 0; j < monkeys.length; j++) {
    monkeys[j].items = monkeys[j].items.map((e) => e % mod);
  }
}

// Find the two most active monkeys
monkeys.sort((a, b) => b.count - a.count);
console.log("Task 2: ", monkeys[0].count * monkeys[1].count);
