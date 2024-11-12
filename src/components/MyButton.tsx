interface MyButtonProps {
  increment: () => void;
  count: number;
}
const MyButton: React.FC<MyButtonProps> = ({ count, ...props }) => {
  return <button onClick={props.increment}>Count: {count}</button>;
};

export default MyButton;
