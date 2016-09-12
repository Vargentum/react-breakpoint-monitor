import React, { Component, PropTypes as PT } from 'react';
export { forEach, throttle } from 'lodash';

export function findKey(o, fn) {
  return Object.keys(o).find((key, idx, keys) =>
    fn(o[keys[idx - 1]], o[key], o[keys[idx + 1]])
  );
}

// value -> one two keys[idx-1] keys[idx+1]

export function safeWindow(smth, ...args) {
  return window
    ? typeof window[smth] === 'function'
      ? window[smth](...args)
      : window[smth]
    : console.warn(`No window - No work for ${smth}`);
}
