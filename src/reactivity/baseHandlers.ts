import { track, trigger } from "./effect";
import { ReactiveFlags } from "./reactive";

function createGetter(isReadonly = false) {
  return function get(target, key) {
    const res = Reflect.get(target, key);

    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    }

    if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }
    // TODO 依赖收集
    if (!isReadonly) {
      track(target, key);
    }
    return res;
  }
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value);

    // TODO 触发依赖
    trigger(target, key);
    return res;
  }
}

export const mutableHandlers = {
  get: createGetter(),
  set: createSetter(),
}

export const readonlyHandlers = {
  get: createGetter(true),
  set(target, key, value) {
    console.warn(`key:${key} cant set, target: ${target} is readonly!`)
    return true; 
  },
}