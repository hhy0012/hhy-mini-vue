export const extend = Object.assign

export function isObject(obj) {
  return (obj !== null) && (typeof obj === 'object');
}

export function hasChange(newValue, oldValue) {
  return !Object.is(newValue, oldValue);
}