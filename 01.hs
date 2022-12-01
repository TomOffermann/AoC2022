module Main where

import qualified Data.Text    as Text
import qualified Data.Text.IO as Text

main = do
    ls <- fmap Text.lines (Text.readFile "./files/01.txt")
    print (task2 (map Text.unpack ls))

task1::[String] -> Int -> Int
task1 [] a = a
task1 (x:xs) a
  | x == "" = max a (task1 xs 0)
  | otherwise = task1 xs (a + read x)

qSort::[Int] -> [Int]
qSort [] = []
qSort (x:xs) = qSort(filter (< x) xs) ++ [x] ++ qSort(filter (> x) xs)

sumOflastThree::[Int] -> Int
sumOflastThree [] = 0
sumOflastThree [a] = a
sumOflastThree [a,b] = a + b
sumOflastThree [a, b, c] = a + b + c
sumOflastThree ls = ls !! ((length ls) - 1) + ls !! ((length ls) - 2) + ls !! ((length ls) - 3)

task2::[String] -> Int
task2 l = sumOflastThree (qSort (map sum (map (map read) (splitList l []))))

splitList::[String] -> [String] -> [[String]]
splitList [] s = [s]
splitList (x:xs) s
  | x == "" = [s] ++ splitList xs []
  | otherwise = splitList xs (s ++ [x])
