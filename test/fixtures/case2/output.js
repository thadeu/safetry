// test/fixtures/case2/input.js
var [error3, value3] = (() => {
  let $$__error__ = null, $$__value__ = null;
  try {
    $$__value__ = (() => {
      const x = 10;
      const y = 20;
      return x * y;
    })();
  } catch (err) {
    $$__error__ = err;
  }
  return [$$__error__, $$__value__];
})();