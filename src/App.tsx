import React from 'react';
import logo from './logo.svg';
import './App.css';
import './styles.css';
import ToggleList from './components/ToggleList';
import MyButtonDisplay from './components/MyButtonDisplay';
import TicTacToe from './components/TicTacToe';

interface ContainerProps {
  children?: React.ReactNode;
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      style={{
        marginBottom: '20px',
      }}
    >
      {children}
    </div>
  );
};

function App() {
  return (
    <div className='App'>
      <Container>
        <ToggleList />
      </Container>
      <Container>
        <MyButtonDisplay />
      </Container>{' '}
      <Container>
        <TicTacToe />
      </Container>
    </div>
  );
}

export default App;
