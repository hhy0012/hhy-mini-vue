import { reactive, isReactive } from '../reactive'

describe("reactive", () => {
  it("happy path", () => {
    const original = { foo: 1 };

    const observed = reactive(original);

    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1);
    expect(isReactive(observed)).toBe(true);
    expect(isReactive(original)).toBe(false);
  });

  it("nested reactive", () => {
    const original = {
      foo: 1,
      boo: {
        bar: {
          baz: 2,
        },
      },
    }

    const observed = reactive(original);
    expect(isReactive(observed.boo)).toBe(true);
    expect(isReactive(observed.boo.bar)).toBe(true);
  });
});