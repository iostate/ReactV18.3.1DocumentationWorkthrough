import { useState } from 'react';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  isWinningSquare?: boolean;
}

// Square component representing a single square on the board.
const Square: React.FC<SquareProps> = ({ value, onSquareClick, isWinningSquare }) => {
  return (
    <button
      className={`square ${isWinningSquare === true ? 'highlight' : ''}`}
      onClick={onSquareClick}
    >
      {value !== null ? value : ''}
    </button>
  );
};

// type is either an Array of strings or null
// null represents the first move
type Squares = Array<string | null>;

interface BoardProps {
  xIsNext: boolean;
  squares: Squares;
  onPlay: (squares: Squares, index: number) => void;
  handleReset: () => void;
}

/**
 * Actual board where the game takes place.
 */
const Board: React.FC<BoardProps> = ({ xIsNext, squares, onPlay, handleReset }) => {
  let status;

  const handleClick = (index: number) => {
    const nextSquares = squares.slice();
    // if square is populated or a winner exists already, return early
    if (squares[index] || calculateWinner(squares)?.winner) return;
    if (xIsNext) {
      nextSquares[index] = 'X';
    } else {
      nextSquares[index] = 'O';
    }
    onPlay(nextSquares, index);
  };

  const winner = calculateWinner(squares);
  if (winner) {
    status = `Winner: ${winner!.winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <>
      <div className='reset'>
        Reset:
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className='status'>Status: {status}</div>
      {Array(3)
        .fill(null)
        .map((_, row) => (
          <div className='board-row'>
            {Array(3)
              .fill(null)
              .map((_, col: number) => {
                const index = row * 3 + col;
                const winningSquare = winner?.winningSquares.includes(index) || false;
                return (
                  <Square
                    isWinningSquare={winningSquare}
                    value={squares[row * 3 + col]}
                    onSquareClick={() => handleClick(index)}
                  />
                );
              })}
          </div>
        ))}
    </>
  );
};

function Game() {
  type SORT_ORDER = 'ASCENDING' | 'DESCENDING';

  // track the history of the game
  interface HistoryEntry {
    squares: Squares;
    location: { row: number; col: number } | null;
  }

  // first element of history is the initial state of the board
  const [history, setHistory] = useState<HistoryEntry[]>([
    { squares: Array(9).fill(null) as Squares, location: null },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove].squares;
  const xIsNext = currentMove % 2 === 0;
  const [orderMoves, setOrderMoves] = useState<SORT_ORDER>('ASCENDING');

  const toggleSortOrder = () => {
    setOrderMoves(orderMoves === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING');
    setHistory([...history].reverse());
  };

  /**
   * Reset the game.
   */
  const handleReset = () => {
    setHistory([{ squares: Array(9).fill(null) as Squares, location: null }]);
    setCurrentMove(0);
  };

  /**
   * Handle the play event.
   * @param nextSquares
   * @param index
   */
  const handlePlay = (nextSquares: Squares, index: number) => {
    // calculate row and column index
    const row = Math.floor(index / 3);
    const col = index % 3;

    const nextHistory: HistoryEntry[] = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location: { row, col } },
    ];

    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpToMove = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    console.log(move);
    let description;
    if (move > 0) {
      description = `Go to move # ${move} [${history[move].location!.row}, ${
        history[move].location!.col
      }]`;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpToMove(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          handleReset={handleReset}
        />
      </div>
      <div className='game-info'>
        <button className='toggle-order-moves' onClick={toggleSortOrder}>
          Toggle Moves to {orderMoves === 'ASCENDING' ? 'DESCENDING' : 'ASCENDING'}
        </button>
        <ol>Current Move # {currentMove}</ol>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
/**
 * Determines the winner in the given squares array by checking possible winning combinations.
 *
 * @param {Squares} squares - An array representing the board state, where each element is 'X', 'O', or null.
 * @returns { { winner: string, winningSquares: number[] } | null } - If there is a winning combination, returns an object with:
 * - `winner`: a string ('X' or 'O') indicating the winning player.
 * - `winningSquares`: an array of indices representing the winning line.
 * If there is no winner, returns `null`.
 */
function calculateWinner(squares: Squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: [a, b, c] };
    }
  }
  return null;
}

export default Game;
