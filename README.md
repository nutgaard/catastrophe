# Catastrophe

## Binomialkoeffisienter

Eks. `T = 3` (tre muligheter for at en katastrofe inntreffer) gir følgende mulighetsrom (hvor 1 tilsier at en katastrofe inntraff):

| |Antall katastrofter (`k`)|
|--|:---------------------:|
|000|0|
|001|1|
|010|1|
|011|2|
|100|1|
|101|2|
|110|2|
|111|3|

For alle `T` kan det skje `k = {0, ..., T}` katastrofter, om vi teller antall muligheter som gir `k` katastrofer ender vi opp med:

|`k`|Antall i mulighetsrommet|
|:---:|:-----:|
|0|1|
|1|3|
|2|3|
|3|1|

Som også er tredje rad i Pascals trekant, eller binomialkoeffisientene ![binomialkoeffisientene][binomialcoef]. Dette holder for alle `T` etter det jeg kan se.


## Skadeomfang
Basert på noe som bel skrevet ned på blokka mi. :/ Litt usikker på hva disse greiene var. 

| | Skadeomfang |
|-|--------------|
|000|0|
|001|`cp`|
|010|`cp`|
|011|`c*(p + p^2)`|
|100|`cp`|
|101|`c*(p + p^2)`|
|110|`c*(p + p^2)`|
|111|`c*(p + p^2 + p^3)`|

|k|Gruppert (og vi antar at de skal summeres sammen) |
|-|-|
|0| `1*0` |
|1| `3*cp`|
|2| `3*c(p + p^2)`|
|3| `1*c(p + p^2 + p^3)` |
|(summert++)| `7*cp + 4*cp^2 + cp^3` |

**NB** For `k = 0` kommer bidraget til totalt alltid til å være `0`. 

Hvis vi videre antar at disse igjen skal summeres sammen (antar egentlig at det er feil. :P) så havner vi opp med: 
![formal][formula]

### Hvorfor/Verifisering?

Gitt `T = 3`

| k | a | formel | 
|---|---|--------|
|0|1| `a < k`, for `k = 0` er bidraget uansett 0 |
|1|1| ![val11][val11] |
|2|1| ![val21][val21] |
|2|2| ![val22][val22] |
|3|1| ![val31][val31] |
|3|2| ![val32][val32] |
|3|3| ![val33][val33] |
|(summert++)||`7cp + 4cp^2 + cp^3`|


[binomialcoef]: binomialcoef.PNG "Binomial koeffisient"
[formula]: formula.PNG "Formula"
[val11]: val11.PNG "val11"
[val21]: val21.PNG "val21"
[val22]: val22.PNG "val22"
[val31]: val31.PNG "val31"
[val32]: val32.PNG "val32"
[val33]: val33.PNG "val33"