const cases = require('./cases');
const n = 8;
const r = 3;
console.log(`n = ${n}, r = ${r}`)
console.log(`Permutation: ${cases.permutation(n, r)}`);
console.log(`Combination: ${cases.combination(n, r)}`);
console.log(`Multi Permutation: ${cases.multiPermutation(n, r)}`);
console.log(`Multi Combination: ${cases.multiCombination(n, r)}`);