module Main where

import qualified Data.Text    as Text
import qualified Data.Text.IO as Text

main = do
    ls <- fmap Text.lines (Text.readFile "./files/02.txt")
    print ("Task 1: " ++ (show (sum (map mapToScore1 (map Text.unpack ls)))))
    print ("Task 2: " ++ (show (sum (map mapToScore2 (map Text.unpack ls)))))

mapToScore1::String -> Int
mapToScore1 "A X" = 4
mapToScore1 "A Y" = 8
mapToScore1 "A Z" = 3
mapToScore1 "B X" = 1
mapToScore1 "B Y" = 5
mapToScore1 "B Z" = 9
mapToScore1 "C X" = 7
mapToScore1 "C Y" = 2
mapToScore1 "C Z" = 6

mapToScore2::String -> Int
mapToScore2 "A X" = 3
mapToScore2 "A Y" = 4
mapToScore2 "A Z" = 8
mapToScore2 "B X" = 1
mapToScore2 "B Y" = 5
mapToScore2 "B Z" = 9
mapToScore2 "C X" = 2
mapToScore2 "C Y" = 6
mapToScore2 "C Z" = 7