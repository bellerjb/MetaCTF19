# Programming: "This Before That"
An important step to getting things done is identifying what actually needs to
be done. An important part of MetaCTF strategy is budgeting your time wisely.
Even though we are the omnipotent problem writers, we still need some order so
we can get our tasks done. Many of our tasks rely on other tasks, so we need to
plan how to go about making the event run smoothly. For future competitions, can
you write a program to help organize our timing for us?

For more information, see `thisbeforethat.pdf`.

## Solution
Perform a topological sort on the given graph. Depth-first may be a bit slow,
but should work.
