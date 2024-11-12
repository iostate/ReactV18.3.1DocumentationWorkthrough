import { useState } from 'react';
import MyButton from './MyButton';

const MyButtonDisplay = () => {
  // keep track of button count
  const [count, setCount] = useState(0);

  // increment button count
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <MyButton increment={increment} count={count} />
      <MyButton increment={increment} count={count} />
    </div>
  );
};

export default MyButtonDisplay;
