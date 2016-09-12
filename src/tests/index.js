import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
const { describe, it } = global;

import * as u from '../utils';
import BreakpointMonitor from '../index';


/* -----------------------------
  Utils
----------------------------- */
describe('u.findKey', () => {
  const val = { one: 1, two: 2, three: 3 };
  const callback = (prev, current, next) => prev === 1 && current === 2 && next === 3;
  const expected = 'two';

  it('should return first occurrence when callback returns truthy.', () => {
    expect(u.findKey(val, callback)).to.equal(expected);
  });
});


/* -----------------------------
  BreakpointMonitor
----------------------------- */

// describe('BreakpointMonitor', () => {
//   const defaultBp = BreakpointMonitor.defaultBp

//   function testEquality(width, label, ...props) {
//     const wrapper = mount(<BreakpointMonitor __windowWidth={width} {...props} />);
//     expect(wrapper.text()).to.equal(label);
//   }

//   it(`should show the current breakpoint`, () => {
//     testEquality(110, 'xs')
//     testEquality(430, 'xs')
//     testEquality(480, 'sm')
//     testEquality(515, 'sm')
//     testEquality(768, 'md')
//     testEquality(960, 'lg')
//     testEquality(1960, 'lg')
//   });
// });
