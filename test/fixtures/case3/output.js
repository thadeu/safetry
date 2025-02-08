// test/fixtures/case3/input.ts
async function calc1() {
  const [err, value] = await (async () => {
    let $$__error__ = null, $$__value__ = null;
    try {
      $$__value__ = await (async () => {
        const x = 10;
        const y = 20;
        return x + y;
      })();
    } catch (err2) {
      $$__error__ = err2;
    }
    return [$$__error__, $$__value__];
  })();
  if (err) {
    return err;
  }
  return value;
}
export {
  calc1
};