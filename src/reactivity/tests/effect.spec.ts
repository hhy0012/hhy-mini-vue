import { effect } from "../effect";
import { reactive } from "../reactive";

describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      age: 10,
    });

    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });

    expect(nextAge).toBe(11);

    user.age++;
    expect(nextAge).toBe(12);
  });

  it("show return runner when call effect", () => {
    // 1. effect(fn) -> function(runner) -> fn -> return
    let foo = 10;
    let runner = effect(() => {
      foo++;
      return "Foo";
    });

    expect(foo).toBe(11);
    let r = runner();
    expect(foo).toBe(12);
    expect(r).toBe("Foo");
  });
});
