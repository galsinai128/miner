// GameBoard.tsx
import React from 'react';
import { Board, Cell } from '../../utils/types';
import PrizesBar from '../PrizesBar/PrizesBar'
import BoardCell from '../BoardCell/BoardCell'
import './GameBoard.sass';

type GameBoardProps = {
  gameBoard: Board | null;
  onCellClicked: (rowIndex: number, cellIndex: number)=>void,
  numberOfWinningCells: number,
  numberOfFlippedCells: number,
  amountPerWin: number,
  balanceAdded: number,
  isGameEnded: boolean,
  slideAnimationVal: number,
  isCellDisabled: boolean,
};

const GameBoard: React.FC<GameBoardProps> = ({ 
  gameBoard, 
  onCellClicked, 
  numberOfWinningCells, 
  numberOfFlippedCells,
  amountPerWin,
  balanceAdded,
  isGameEnded,
  slideAnimationVal,
  isCellDisabled,
}) => {
  if (!gameBoard) return null;

  return (
    <div>
      <div className="game-board">
        {gameBoard.map((row: Cell[], rowIndex: number) => (
          <div key={rowIndex} className="row">
            {row.map((cell: Cell, cellIndex: number) => (
              <div key={cellIndex} className="cell">
                <BoardCell 
                  onCellClicked={()=>{onCellClicked(rowIndex,cellIndex)}} 
                  cell={cell} 
                  cellIndex={cellIndex} 
                  rowIndex={rowIndex}
                  isGameEnded={isGameEnded}
                  isCellDisabled={isCellDisabled}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <PrizesBar 
        numberOfWinningCells={numberOfWinningCells}
        numberOfFlippedCells={numberOfFlippedCells}
        amountPerWin={amountPerWin}
        balanceAdded={balanceAdded}
        slideAnimationVal={slideAnimationVal}
      />
    </div>
  );
};

export default React.memo(GameBoard);
