# Poisson

Realization of poisson distribution probability function that works for big numbers. Most known libraries don't work with expected value greater than 170 because of naive realization. This one works with really big numbers.

You can provide MAX number while importing this function to set up the cache size to optimal value. If it is not provided, it sets up to 1000.  

Example of usage:

```javascript
const poisson = require('poisson');
poisson.setCacheSize(777); 

let expected = 2.75;
let target = 3;

let probability = poisson(expected, target);
console.log(probability); // 0.22158328975554106

expected = 500;
target = 450;

probability = poisson(expected, target);
console.log(probability); // 0.0014137416119834906
```
