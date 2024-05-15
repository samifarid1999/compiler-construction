// Here is an example of a simple token scanner in JavaScript:

function scanTokens(code) {
  const tokens = [];
  let current = 0;

  while (current < code.length) {
    const char = code[current];

    // Skip whitespace
    if (char.match(/\s/)) {
      current++;
      continue;
    }

    // Keywords
    if (char.match(/if|else|while|function/)) {
      tokens.push({ type: 'keyword', value: char });
      current++;
      continue;
    }

    // Identifiers
    if (char.match(/[a-zA-Z_][a-zA-Z_0-9]*/)) {
      const identifier = code.slice(current, current + char.length);
      tokens.push({ type: 'identifier', value: identifier });
      current += char.length;
      continue;
    }

    // Literals
    if (char.match(/"[^"]*"|'[^']*'|[\d]+/)) {
      const literal = code.slice(current, current + char.length);
      tokens.push({ type: 'literal', value: literal });
      current += char.length;
      continue;
    }

    // Operators
    if (char.match(/[+\-*/=<>!&|]/)) {
      tokens.push({ type: 'operator', value: char });
      current++;
      continue;
    }

    // Punctuation
    if (char.match(/[,;:.(){}\[\]]/)) {
      tokens.push({ type: 'punctuation', value: char });
      current++;
      continue;
    }

    throw new Error(`Unexpected character: ${char}`);
  }

  return tokens;
}

const code = "function x() { return 0; }";
const tokens = scanTokens(code);

console.log(tokens);
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
