import { hasChange, isObject } from "../shared";
import { isTracking, trackEffect, triggerEffect } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
  private _value: any;
  public dep;
  private _rawValue: any;
  public __v_isRef = true;
  constructor(value) {
    this._rawValue = value;
    this._value = convert(value);
    this.dep = new Set();
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newValue) {
    // 修改了value才会调用
    if (hasChange(newValue, this._rawValue)) {
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffect(this.dep);
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffect(ref.dep);
  }
}

export function ref(value) {
  return new RefImpl(value);
}

export function isRef(ref) {
  return !!ref.__v_isRef;
}

export function unRef(ref) {
  return isRef(ref) ? ref.value : ref;
}

export function proxyRefs(objectWithRefs) {
  return new Proxy(objectWithRefs, {
    get(target, key) {
      // target[key] -> ref return .value
      //                no ref return value
      return unRef(Reflect.get(target, key));
    },
    set(target, key, value) {
      // target[key] -> ref && value -> no ref
      //                         set -> .value
      // target[key] -> no ref || value -> ref
      //                         set -> Reflect.set
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value);
      } else {
        return Reflect.set(target, key, value);
      }
    }
  })
}