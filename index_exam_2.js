function letterCombinations(digits) {
    if (digits.length === 0) {
        return [];
    }

    const dialPad = {
        '1': '',
        '2': 'abc',
        '3': 'def',
        '4': 'ghi',
        '5': 'jkl',
        '6': 'mno',
        '7': 'pqrs',
        '8': 'tuv',
        '9': 'wxyz'
    };

    function computeCombinations(digit) {
        const letters = dialPad[digit];
        return letters.split('');
    }

    let combinations = computeCombinations(digits[0]);

    for (let i = 1; i < digits.length; i++) {
        const currentDigit = digits[i];
        const currentLetters = computeCombinations(currentDigit);
        const newCombinations = [];

        for (let j = 0; j < combinations.length; j++) {
            for (let k = 0; k < currentLetters.length; k++) {
                newCombinations.push(combinations[j] + currentLetters[k]);
            }
        }

        combinations = newCombinations;
    }

   return combinations;

}

console.log('TEST 1 RESULT: ', letterCombinations("23")); // Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log('TEST 2 RESULT: ', letterCombinations(""));  // Output: []
console.log('TEST 3 RESULT: ', letterCombinations("2")); // Output: ["a","b","c"]
