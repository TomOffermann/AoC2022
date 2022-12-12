let lines = require("fs").readFileSync("./files/11.txt", "utf-8").split("\n\n");
let monkeys = [];

class Monkey {
  items = [];
  count = 0;
  to1 = null;
  to2 = null;
  div = 0;
  op = "";
  v = "";
  constructor(items, to1, to2, operation, div) {
    this.items = items;
    this.to1 = to1;
    this.to2 = to2;
    this.op = operation.split("=")[1].split(" ")[2];
    this.v = operation.split("=")[1].split(" ")[3];
    this.div = div;
  }
  throwTo(v) {
    this.items.push(v);
  }
  round() {
    while(this.items.length > 0) {
      this.count++;
      let old = this.items.shift();
      let vNum = 0;
      if(this.v === "old") {
        vNum = old;
      } else {
        vNum = parseInt(this.v);
      }
      let n = 0;
      if(this.op == "*") {
        n = old * vNum;
      } else {
        n = old + vNum;
      }
      //n = Math.floor(n / 3);
      if(n % this.div == 0) {
        monkeys[this.to1].throwTo(n);
      } else {
        monkeys[this.to2].throwTo(n);
      }
    }
  }
}

let parseMonkey = (monkey) => {
  let list = monkey.split("\n");
  let items = list[1].split(":")[1].split(",").map(e => parseInt(e));
  let operation = list[2].split(":")[1];
  let div = parseInt(list[3].split(" ")[list[3].split(" ").length - 1]);
  let to1 = parseInt(list[4].split(" ")[list[4].split(" ").length - 1]);
  let to2 = parseInt(list[5].split(" ")[list[5].split(" ").length - 1]);
  return new Monkey(items, to1, to2, operation, div);
}

monkeys = lines.map(e => parseMonkey(e));

for(let i = 0; i < 10000; i++) {
  //console.log(monkeys.map(e => e.items))
  let mod = 1;
  for(let j = 0; j < monkeys.length; j++) {
    mod *= monkeys[j].div;
    monkeys[j].round();
    if(j == 3 && i == 19) {
      console.log(monkeys);
    } 
  }
  for(let j = 0; j < monkeys.length; j++) {
    monkeys[j].items = monkeys[j].items.map(e => e % mod);
  }
}

monkeys.sort((a,b) => b.count - a.count );
console.log(monkeys[0].count * monkeys[1].count);
