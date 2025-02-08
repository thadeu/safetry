export async function fetchAsync(): Promise<any> {
  const [error, response]: AsyncSafetryResult<any> = await safetry {
    return fetch('https://dummyjson.com/test').then(res => res.json())
}

return [error, response]
}

fetchAsync().then(([err, val10]) => console.log(val10))