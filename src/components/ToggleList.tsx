/**
 * React Hooks, such as useState, cannot be called conditionally or within loops in a component. This is because Hooks rely on the order in which they are called to manage the component state correctly. However, you can create a new component and place the useState hook there to handle conditional or repeated rendering cases.

Let’s go through an example. Suppose we want to create a list of toggle buttons, where each button has its own state that determines whether it is "on" or "off." Instead of attempting to use useState in a loop, we can create a separate component for each toggle button.

Here's how you can extract a new component to handle individual useState for each item in a list:
 */

import { useState } from 'react';
import ToggleButton from './ToggleButton';

interface ListItem {
  id: number;
  name: string;
}

const ToggleList = () => {
  const items: ListItem[] = [
    { id: 1, name: 'Button 1' },
    { id: 2, name: 'Button 2' },
    { id: 3, name: 'Button 3' },
  ];

  return (
    <div>
      {items.map(({ id, name }) => (
        <ToggleButton label={name} key={id}>
          {name}
        </ToggleButton>
      ))}
    </div>
  );
};

export default ToggleList;
