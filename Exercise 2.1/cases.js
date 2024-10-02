const factorial = number =>{
    let answer = 1;
    for(let i = 1; i <= number; i++) {
        answer *= i;
    }
    return answer;
};

const permutation = (n, r) => {
    return (factorial(n) / factorial(n - r)); 
};

const combination = (n, r) => {
    return (factorial(n) / (factorial(n - r) * factorial(r)));
};

const multiPermutation = (n, r) => {
    let answer = 1;
    for(let i = 0; i < r; i++) {
        answer *= n;
    }
    return answer;
};

const multiCombination = (n, r) => {
    return (factorial(n + r -1) / (factorial(n - 1) * factorial(r)));
};

module.exports = {
    permutation: permutation,
    combination: combination,
    multiPermutation: multiPermutation,
    multiCombination: multiCombination
};