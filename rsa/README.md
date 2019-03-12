# Cryptography: "Cracking RSA?"
n = 1012507844500600185959897393293308058450981501, e = 65538, c
= 872504627408654417593657062924385962103340788. Good luck.

## Solution
Factoring n is trivial. p = 14155814724681487857983, and q =
71525932218880610126147. However progress is quickly stopped by the realization
that d does not exist, as e is not coprime with λ(n). As c is congruent m^e (mod
n), c must also be congruent to m^e (mod p) and m^e (mod q). As p and q are
prime, we can find m using the Chinese Remainder Theorem. There are multiple
solutions for m to the congruence, however one solution,
156151143145137143157156147162165145156143145, is quite different from the rest.
When split every three and decoded from octal, the message reads:
"nice_congruence".
