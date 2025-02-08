var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// examples/index.ts
var index_exports = {};
__export(index_exports, {
  fetchAsync: () => fetchAsync
});
module.exports = __toCommonJS(index_exports);
var [error0, value0] = (() => {
  let $$__error__ = null, $$__value__ = null;
  try {
    $$__value__ = /* @__PURE__ */ (() => {
      return 1 >= 1;
    })();
  } catch (err) {
    $$__error__ = err;
  }
  return [$$__error__, $$__value__];
})();
console.log(value0);
var [error1, value1] = (() => {
  let $$__error__ = null, $$__value__ = null;
  try {
    $$__value__ = /* @__PURE__ */ (() => {
      return 1;
    })();
  } catch (err) {
    $$__error__ = err;
  }
  return [$$__error__, $$__value__];
})();
console.log(value1);
var [error2, value2] = (() => {
  let $$__error__ = null, $$__value__ = null;
  try {
    $$__value__ = (() => {
      return 2 + 2;
    })();
  } catch (err) {
    $$__error__ = err;
  }
  return [$$__error__, $$__value__];
})();
console.log(value2);
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
console.log(value3);
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
calc1().then((res) => console.log(`foi async ${res}`));
function safeOperation(operation) {
  return (() => {
    let $$__error__ = null, $$__value__ = null;
    try {
      $$__value__ = (() => {
        return operation();
      })();
    } catch (err) {
      $$__error__ = err;
    }
    return [$$__error__, $$__value__];
  })();
}
var [err4, val4] = safeOperation(() => 42);
console.log(val4);
var [error5, value5] = (() => {
  let $$__error__ = null, $$__value__ = null;
  try {
    $$__value__ = (() => {
      const arr = [1, 2, 3];
      return arr.map((x) => x * 2);
    })();
  } catch (err) {
    $$__error__ = err;
  }
  return [$$__error__, $$__value__];
})();
console.debug([error5, value5]);
var [error6, value6] = (() => {
  let $$__error__ = null, $$__value__ = null;
  try {
    $$__value__ = (() => {
      const invalidJson = "{invalid:json}";
      return JSON.parse(invalidJson);
    })();
  } catch (err) {
    $$__error__ = err;
  }
  return [$$__error__, $$__value__];
})();
console.log(error6.message);
var [error7, value7] = (() => {
  let $$__error__ = null, $$__value__ = null;
  try {
    $$__value__ = (() => {
      const numbers = [1, 2, 3, 4, 5];
      const sum = numbers.reduce((acc, curr) => acc + curr, 0);
      const average = sum / numbers.length;
      return {
        sum,
        average,
        squared: sum * average
      };
    })();
  } catch (err) {
    $$__error__ = err;
  }
  return [$$__error__, $$__value__];
})();
console.log(error7, value7);
function riskyFunction(shouldThrow) {
  if (shouldThrow) throw new Error("Risky business!");
  return "Ok!";
}
var [error8, value8] = (() => {
  let $$__error__ = null, $$__value__ = null;
  try {
    $$__value__ = (() => {
      return riskyFunction(false);
    })();
  } catch (err) {
    $$__error__ = err;
  }
  return [$$__error__, $$__value__];
})();
console.log(error8?.message, value8);
var [error9, value9] = (() => {
  let $$__error__ = null, $$__value__ = null;
  try {
    $$__value__ = (() => {
      if (true) {
        return 1;
      } else {
        return 2;
      }
    })();
  } catch (err) {
    $$__error__ = err;
  }
  return [$$__error__, $$__value__];
})();
console.debug([error9, value9]);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fetchAsync
});
