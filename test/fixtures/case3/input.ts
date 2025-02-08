export async function calc1() {
  const [err, value] = await safetry {
    const x = 10
    const y = 20

    return x + y
}

if (err) {
  return err
}

return value
}