-- I did not have enough time do complete this exercise in Haskell
-- so i wrote my solution in javascript yikes:
{-
const inputArr = [
  "DLVTMHF",
  "HQGJCTNP",
  "RSDMPH",
  "LBVF",
  "NHGLQ",
  "WBDGRMP",
  "GMNRCHLQ",
  "CLW",
  "RDLQJZMT",
];

let lines = require("fs").readFileSync("./05.txt", "utf-8").split("\n");

let filterNums = (str) => {
  let res = [];
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(parseInt(str[i]))) {
      let num = parseInt(str.split("").slice(i).join(""));
      let numStr = num.toString();
      res.push(num);
      i += numStr.length - 1;
    }
  }
  return res;
};

let moveTask2 = (amount, from, to) => {
  let index = inputArr[from - 1].length - amount;
  let str = "";
  for (let i = inputArr[from - 1].length - 1; i >= index; i--) {
    str += inputArr[from - 1][i];
    inputArr[from - 1] = inputArr[from - 1].slice(0, i);
  }
  str = str.split("").reverse().join("");
  inputArr[to - 1] = inputArr[to - 1] + str;
};

let moveTask1 = (amount, from, to) => {
  let index = inputArr[from - 1].length - amount;
  let str = "";
  for (let i = inputArr[from - 1].length - 1; i >= index; i--) {
    str += inputArr[from - 1][i];
    inputArr[from - 1] = inputArr[from - 1].slice(0, i);
  }
  inputArr[to - 1] = inputArr[to - 1] + str;
};

lines = lines.map((e) => filterNums(e));

for (let i = 0; i < lines.length; i++) {
  moveTask1(...lines[i]); // Or moveTask2 for the second exercise
}

let result = "";

for (let i = 0; i < inputArr.length; i++) {
  result += inputArr[i][inputArr[i].length - 1];
}

console.log(result);
-}

-- Here is my attempt:

module Main where

import qualified Data.Text    as Text
import qualified Data.Text.IO as Text

main = do
    ls <- fmap Text.lines (Text.readFile "./files/05.txt")
    
    print "This does not work"
    --print $ "Task 1: " ++ (show $ task1 (map Text.unpack ls))
    --print $ "Task 2: " ++ (show $ task2 (map Text.unpack ls))

isDigit::Char -> Bool
isDigit '0' = True
isDigit '1' = True
isDigit '2' = True
isDigit '3' = True
isDigit '4' = True
isDigit '5' = True
isDigit '6' = True
isDigit '7' = True
isDigit '8' = True
isDigit '9' = True
isDigit _ = False

inputArr::[String]
inputArr = ["DLVTMHF","HQGJCTNP","RSDMPH","LBVF","NHGLQ","WBDGRMP","GMNRCHLQ","CLW","RDLQJZMT"]

moveValues::[Int] -> [String] -> String
moveValues [0,_,_] input = []
moveValues [a,b,c] input = (last (input !! (b+1))): (moveValues [a-1, b, c] input)

extract::String -> [Int]
extract [] = []
extract (x:xs)
  | isDigit x = (read [x]):(extract xs)
  | otherwise = extract xs