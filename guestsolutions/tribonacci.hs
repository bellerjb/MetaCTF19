main :: IO ()
main = do
    input <- getLine
    let n = (read input :: Int)
    print $ tribonacci n

tribonacci :: Int -> Integer
tribonacci n = fibs !! (n - 1)
    where fibs = 1 : 1 : 2 : next fibs
          next (a : t@(b : c : _)) = (a + b + c) : next t
