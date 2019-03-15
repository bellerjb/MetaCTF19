# Recon: "Vandelay Industries"
I heard from my friend George that Vandelay Industries has started to pivot into
the flag generation business (I guess latex sales are declining). Can you get
into their employee portal and send one of their sweet, sweet flags over?

## Problem implementation
The webpage is a basic landing page with a login button that requests an
authorization from the browser. Login is handled purely with HTTP Authorization
and the information is hidden in an external module to avoid leaking the key
even when the website itself is public. Every login request is delayed by one
second to show that the problem is not supposed to be brute-forced.

## Solution
The admin password is stored in plain text in the source code to the website,
which is publically avaliable on my GitHub.
