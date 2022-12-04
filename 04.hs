module Main where

import qualified Data.Text    as Text
import qualified Data.Text.IO as Text

main = do
    ls <- fmap Text.lines (Text.readFile "./files/04.txt")
    
    print $ "Task 1: " ++ (show $ task1 (map Text.unpack ls))
    print $ "Task 2: " ++ (show $ task2 (map Text.unpack ls))

task1::[String] -> Int
task1 s = sum $ map mapNum1 $ prepareInput s

task2::[String] -> Int
task2 s = sum $ map mapNum2 $ prepareInput s

mapNum1::[[Int]] -> Int
mapNum1 [[a,b],[c,d]] 
  | (a <= c && b >= d) || (c <= a && d >= b) = 1
  | otherwise = 0

mapNum2::[[Int]] -> Int
mapNum2 [[a,b],[c,d]] 
  | (a >= c && a <= d) || (b >= c && b <= d) || (c >= a && c <= b) || (d >= a && d <= b) = 1
  | otherwise = 0

prepareInput::[String] -> [[[Int]]]
prepareInput [] = []
prepareInput (x:xs) = (spliceInTuple x) : (prepareInput xs)

wordsWhen     :: (Char -> Bool) -> String -> [String]
wordsWhen p s =  case dropWhile p s of
                      "" -> []
                      s' -> w : wordsWhen p s''
                            where (w, s'') = break p s'

spliceInTuple::String ->[[Int]]
spliceInTuple s = map (map read) $ map (wordsWhen (== '-')) $ wordsWhen (== ',') s