# Programming: "Pseudorandom Repetition"
I've been working on a program that needs lots of random numbers, so I wrote a
Linear Congruential Generator to make them. A LCG is a kind of pseudorandom
number generator where the next value n equals a times the previous n, plus c,
mod m. I picked a LCG because it was simple, but LCGs eventually repeat
themselves. Given the values a, c, m, and the initial seed i, compute the period
of the generator, as well as the first value to repeat.

For more information, see `repetition.pdf`.

## Solution
Using a map, keep track of each new value until the next value is already in the
map. Using a list to keep track of previous values will not work as the test
cases are large enough to cause a noticible (multiple hours) slowdown from O(n)
lookup time.
