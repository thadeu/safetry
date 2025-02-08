// test/fixtures/case4/input.ts
async function fetchAsync() {
  const [error, response] = await (async () => {
    let $$__error__ = null, $$__value__ = null;
    try {
      $$__value__ = await (async () => {
        return fetch("https://dummyjson.com/test").then((res) => res.json());
      })();
    } catch (err) {
      $$__error__ = err;
    }
    return [$$__error__, $$__value__];
  })();
  return [error, response];
}
fetchAsync().then(([err, val10]) => console.log(val10));
export {
  fetchAsync
};