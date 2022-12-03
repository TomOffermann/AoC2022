module Main where

import qualified Data.Text    as Text
import qualified Data.Text.IO as Text

main = do
    ls <- fmap Text.lines (Text.readFile "./files/03.txt")
    print $ "Task 1: " ++ (show $ task1 (map Text.unpack ls))
    print $ "Task 2: " ++ (show $ task2 (map Text.unpack ls))
    --print $ "Task 2: " ++ (show $ task2 (map Text.unpack ls))

task1::[String] -> Int
task1 ls = sum $ map mapChar $ map common $ map halve ls

task2::[String] -> Int
task2 ls = sum $ map mapChar $ map commonThree $ spliceInThirds ls []


has::String -> Char -> Bool
has "" _ = False
has (x:xs) b = x == b || (has xs b)

commonList::(String, String) -> String
commonList ("",_) = []
commonList ((x:xs),ls) = if (has ls x) then (x:commonList (xs,ls)) else (commonList (xs,ls))

commonThree::(String, String, String) -> Char
commonThree (a, b, (c:cs)) = if has (commonList (a,b)) c then c else commonThree (a, b, cs)

common::(String, String) -> Char
common ("",_) = 'Ü'
common ((x:xs),ls) = if (has ls x) then x else (common (xs,ls))

listToTuple::[String] -> (String, String, String)
listToTuple [] = ("", "", "")
listToTuple [a] = (a,a,a)
listToTuple [a,b] = (a,b,b)
listToTuple [a,b,c] = (a,b,c)

spliceInThirds::[String] -> [String] -> [(String,String,String)]
spliceInThirds [] c = if length c == 3 then [listToTuple c] else []
spliceInThirds (l:ls) carry
  | length carry == 3 = (listToTuple carry):(spliceInThirds ls [l])
  | otherwise = spliceInThirds ls (carry ++ [l])

halve :: [a] -> ([a], [a]) 
halve xs = 
    ((take s xs), (drop s xs))
    where
        s = (length xs ) `div` 2

mapChar::Char -> Int 
mapChar 'a' = 1
mapChar 'b' = 2
mapChar 'c' = 3
mapChar 'd' = 4
mapChar 'e' = 5
mapChar 'f' = 6
mapChar 'g' = 7
mapChar 'h' = 8
mapChar 'i' = 9
mapChar 'j' = 10
mapChar 'k' = 11
mapChar 'l' = 12
mapChar 'm' = 13
mapChar 'n' = 14
mapChar 'o' = 15
mapChar 'p' = 16
mapChar 'q' = 17
mapChar 'r' = 18
mapChar 's' = 19
mapChar 't' = 20
mapChar 'u' = 21
mapChar 'v' = 22
mapChar 'w' = 23
mapChar 'x' = 24
mapChar 'y' = 25
mapChar 'z' = 26
mapChar 'A' = 27
mapChar 'B' = 28
mapChar 'C' = 29
mapChar 'D' = 30
mapChar 'E' = 31
mapChar 'F' = 32
mapChar 'G' = 33
mapChar 'H' = 34
mapChar 'I' = 35
mapChar 'J' = 36
mapChar 'K' = 37
mapChar 'L' = 38
mapChar 'M' = 39
mapChar 'N' = 40
mapChar 'O' = 41
mapChar 'P' = 42
mapChar 'Q' = 43
mapChar 'R' = 44
mapChar 'S' = 45
mapChar 'T' = 46
mapChar 'U' = 47
mapChar 'V' = 48
mapChar 'W' = 49
mapChar 'X' = 50
mapChar 'Y' = 51
mapChar 'Z' = 52
