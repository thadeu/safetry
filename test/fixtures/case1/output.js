// test/fixtures/case1/input.js
var x = (() => {
  let $$__error__ = null, $$__value__ = null;
  try {
    $$__value__ = (() => {
      return 1 + 1;
    })();
  } catch (err) {
    $$__error__ = err;
  }
  return [$$__error__, $$__value__];
})();
var [error3, value3] = (() => {
  let $$__error__ = null, $$__value__ = null;
  try {
    $$__value__ = (() => {
      const x2 = 10;
      const y = 20;
      return x2 * y;
    })();
  } catch (err) {
    $$__error__ = err;
  }
  return [$$__error__, $$__value__];
})();
var [error4, value4] = (() => {
  let $$__error__ = null, $$__value__ = null;
  try {
    $$__value__ = (() => {
      const x2 = 10;
      const y = 20;
      x2 * y;
    })();
  } catch (err) {
    $$__error__ = err;
  }
  return [$$__error__, $$__value__];
})();