const useTry0 = () => {
  return safetry { 1 >= 1 }
}
let [error0, value0]: SafetryResult<boolean> = safetry { 1 >= 1 };
console.log(value0)

const [error1, value1]: SafetryResult<number> = safetry { 1 }
console.log(value1);

// Expression
const [error2, value2] = safetry { 2 + 2 }
console.log(value2);

// Multiple lines with last expression
const [error3, value3] = safetry {
  const x = 10;
const y = 20;

return x * y 
}
console.log(value3);

// Async usage
async function calc() {
  const [err, value] = await safetry {
    const x = 10;
  const y = 20;

  return x + y
}

if (err) {
  return err
}

return value
}

calc1().then(res => console.log(`foi async ${res}`))

// With generics
function safeOperation(operation) {
  return safetry {
    return operation()
  }
}

const [err4, val4] = safeOperation(() => 42)
console.log(val4)

// // Array operations
const [error5, value5] = safetry {
  const arr = [1, 2, 3];

return arr.map(x => x * 2);
}

console.debug([error5, value5]); // null, [2, 4, 6]

// // JSON parsing
const [error6, value6] = safetry {
  const invalidJson = '{invalid:json}';

return JSON.parse(invalidJson);
}
console.log(error6.message); // true, undefined

// // Complex calculations
const [error7, value7] = safetry {
  const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
const average = sum / numbers.length;

return {
  sum,
  average,
  squared: sum * average
}
}
console.log(error7, value7); // null, { sum: 15, average: 3, squared: 9 }

// // Function calls
function riskyFunction(shouldThrow) {
  if (shouldThrow) throw new Error('Risky business!');

  return 'Ok!';
}

const [error8, value8] = safetry { riskyFunction(false) }
console.log(error8?.message, value8); // "Risky business!", undefined

const [error9, value9] = safetry {
  if (1 == 1) {
  return 1
} else {
  return 2
}
}
console.debug([error9, value9]);

// // With generics
export async function fetchAsync(): Promise<any> {
  const [error, response]: AsyncSafetryResult<any> = await safetry {
    return fetch('https://dummyjson.com/test').then(res => res.json())
}

return [error, response]
}

fetchAsync().then(([err, val10]) => console.log(val10))