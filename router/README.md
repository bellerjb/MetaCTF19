# Web Exploitation: "Router: Redux"
I've made a maze of HTTP 302 pages and hid the flag in six parts throughout the
maze. Can you find all the pieces and put them together?

## Problem implementation
The maze is represented as a map between a number and a list of child numbers
and/or a message to display. The maze can be thought of as a directed acyclic
graph that is generated on bootup. To keep the maze generation the same for all
future executions, the randomness is provided with a pre-seeded implementation
of xoroshiro64*. The numbers each page represents are masked from the user with
a SHA-256 HMAC, which is memoized to avoid significant load to the application.

## Solution
Traverse through each page on the website, logging the response body. I
preformed a recursive depth-first search through the website, refreshing if I
had already seen the page I was being redirected to. See `finder.py` for my
implementation of the solution.
