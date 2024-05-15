// Here is an example of a simple token scanner in JavaScript:

const fs = require('fs');

// Read the sentence from the file
const filePath = 'function.txt'; // Update the file path accordingly
let sentence;
try {
    sentence = fs.readFileSync(filePath, 'utf-8');
    console.log(sentence)
} catch (err) {
    console.error('File not found or unable to read file.');
    process.exit(1);
}

// Your seven regular expressions
const regexPatterns = [
    /^[a-zA-Z_][a-zA-Z0-9_]*$/, // Identifier
    /^-?\d+(\.\d+)?$/, // Number
    /[!@#$%^&*()_+{}\[\]:;<>,.?/~`|-]/, // Special Character
    /".*?"/, // String
    /[-+*/%=<>!&|^~]/, // Operator
    /\s+/, // Blank Space
    /\/\/.*|\/\*[\s\S]*?\*\// // Comment
];

// Labels corresponding to each regular expression
const labels = [
    'Identifier',
    'Number',
    'Special Character',
    'String',
    'Operator',
    'Blank Space',
    'Comment'
];

// Dictionary to store word specifications
const wordSpecifications = {};

// Split the sentence into words
const words = sentence.split(/[\s,.;:!?]+/).filter(Boolean);

// Iterate over each word
words.forEach(word => {
    for (let i = 0; i < regexPatterns.length; i++) {
        if (regexPatterns[i].test(word)) {
            // If the word matches the pattern, add it to the dictionary with its label
            wordSpecifications[word] = labels[i];
            break; // Move to the next word after finding a match
        }
    }
});

// Print the labels of each word
for (const [word, label] of Object.entries(wordSpecifications)) {
    console.log(`Word: ${word}, Label: ${label}`);
}


// function scanTokens(code) {
//   const tokens = [];
//   let current = 0;

//   while (current < code.length) {
//     const char = code[current];

//     // Skip whitespace
//     if (char.match(/\s/)) {
//       current++;
//       continue;
//     }

//     // Keywords
//     if (char.match(/if|else|while|function/)) {
//       tokens.push({ type: 'keyword', value: char });
//       current++;
//       continue;
//     }

//     // Identifiers
//     if (char.match(/[a-zA-Z_][a-zA-Z_0-9]*/)) {
//       const identifier = code.slice(current, current + char.length);
//       tokens.push({ type: 'identifier', value: identifier });
//       current += char.length;
//       continue;
//     }

//     // Literals
//     if (char.match(/"[^"]*"|'[^']*'|[\d]+/)) {
//       const literal = code.slice(current, current + char.length);
//       tokens.push({ type: 'literal', value: literal });
//       current += char.length;
//       continue;
//     }

//     // Operators
//     if (char.match(/[+\-*/=<>!&|]/)) {
//       tokens.push({ type: 'operator', value: char });
//       current++;
//       continue;
//     }

//     // Punctuation
//     if (char.match(/[,;:.(){}\[\]]/)) {
//       tokens.push({ type: 'punctuation', value: char });
//       current++;
//       continue;
//     }

//     throw new Error(`Unexpected character: ${char}`);
//   }

//   return tokens;
// }

// const code = "function x() { return 0; }";
// const tokens = scanTokens(code);

// console.log(tokens);
// Output:
// [
//   { type: 'keyword', value: 'if' },
//   { type: 'punctuation', value: '(' },
//   { type: 'identifier', value: 'x' },
//   { type: 'operator', value: '>' },
//   { type: 'literal', value: '5' },
//   { type: 'punctuation', value: ')' },
//   { type: 'punctuation', value: '{' },
//   { type: 'keyword', value: 'console' },
//   { type: 'punctuation', value: '.' },
//   { type: 'identifier', value: 'log' },
//   { type: 'punctuation', value: '(' },
//   { type: 'literal', value: '"Hello"' },
//   { type: 'punctuation', value: ')' },
//   { type: 'punctuation', value: '}' },
// ]
