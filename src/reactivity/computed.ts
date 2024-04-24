import { ReavtiveEffect } from "./effect";

class computedRefImpl {
  private _getter: Function;
  private _value: any;
  private _dirty: Boolean;
  private _effect: ReavtiveEffect;
  constructor(getter) {
    this._getter = getter;
    this._dirty = true;
    this._effect = new ReavtiveEffect(getter, () => {
      // 当依赖改变的时候触发trigger，使用 scheduler 修改 _dirty 为 true ，在下一次 get value 的时候用 getter 重新计算
      if (!this._dirty) {
        this._dirty = true;
      }
    })
  }

  get value() {
    if (this._dirty) {
      this._dirty = false;
      this._value = this._effect.run();
    }
    return this._value;
  }
}

export function computed(getter) {
  return new computedRefImpl(getter)
}