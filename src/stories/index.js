import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import BreakpointMonitor from '../index';

storiesOf('BreakpointMonitor', module)
  .add('default view', () => (
    <BreakpointMonitor />
  ));
