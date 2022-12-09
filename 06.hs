module Main where

import qualified Data.Text    as Text
import qualified Data.Text.IO as Text

main = do
    ls <- fmap Text.lines (Text.readFile "./files/06.txt")

    print $ "Task 1: " ++ (show $ task1 (map Text.unpack ls))
    print $ "Task 2: " ++ (show $ task2 (map Text.unpack ls))

task1::[String] -> Int
task1 ls = findIndex4 (foldl addChar "" (ls !! 0)) (ls!! 0)  0

task2::[String] -> Int
task2 ls = findIndex14 (foldl addChar "" (ls !! 0)) (ls!! 0)  0


hasChar::String -> Char -> Bool
hasChar [] _ = False
hasChar (x:xs) c = (x == c) || hasChar xs c

spliceList::String -> Char -> String
spliceList [] _ = []
spliceList (x:xs) c
  | x == c = xs
  | otherwise = spliceList xs c

findIndex4::String -> String -> Int -> Int
findIndex4 s (w:x:y:z:rest) a
  | s == [w,x,y,z] = a + 4
  | otherwise = findIndex4 s (x:y:z:rest) (a+1)

findIndex14::String -> String -> Int -> Int
findIndex14 s (a:b:c:d:e:f:g:h:i:j:k:l:m:n:rest) z
  | s == [a,b,c,d,e,f,g,h,i,j,k,l,m,n] = z + 14
  | otherwise = findIndex14 s (b:c:d:e:f:g:h:i:j:k:l:m:n:rest) (z+1)

addChar::String -> Char -> String
addChar str c
  | length str == 4 = str
  | otherwise = if (hasChar str c) then (spliceList str c) ++ [c] else str ++ [c]