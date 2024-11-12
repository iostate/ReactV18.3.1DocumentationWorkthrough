import { useState } from 'react';
import React from 'react';
interface ToggleButtonInterface {
  label: string;
  children?: React.ReactNode;
}

const ToggleButton: React.FC<ToggleButtonInterface> = ({ label, ...props }) => {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn(!isOn);
  };

  return (
    <button onClick={toggle}>
      {label} : {isOn ? 'On' : 'Off'}
    </button>
  );
};

export default ToggleButton;
