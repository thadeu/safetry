let x = safetry { 1 + 1 }

const [error3, value3] = safetry {
  const x = 10
  const y = 20

  return x * y 
}

const [error4, value4] = safetry {
  const x = 10
  const y = 20

  x * y 
}