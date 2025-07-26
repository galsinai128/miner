import React from 'react';
import useScreenWidth  from '../../utils/hooks/useScreenWidth'
import {
  MAX_MOBILE_WIDHT,
  CELL_ICON_SIZE_LARGE_SCREEN,
  CELL_ICON_SIZE_MOBILE,
} from '../../utils/constants'
import { Cell } from '../../utils/types';
import { GiShamrock } from "react-icons/gi";
import { FaBomb } from "react-icons/fa";
import './BoardCell.sass';

type BoardCellProps = {
  cell: Cell;
  cellIndex: number;
  rowIndex: number;
  onCellClicked: (rowIndex: number, cellIndex: number) => void;
  isGameEnded: boolean,
};

const BoardCell: React.FC<BoardCellProps> = ({
  cell,
  cellIndex,
  rowIndex,
  onCellClicked,
  isGameEnded,
}) => {

  const screenWidth = useScreenWidth();

  return (
    <div
      className={`cell-container ${cell.isFlipped ? 'flipped' : ''} ${isGameEnded ? 'disabled' : ''}`}
      onClick={() => onCellClicked(rowIndex, cellIndex)}
    >
      <div className="card-inner">
        <div className="card-front"></div>
        <div 
            className={`card-back ${cell.isWinning ? '' : 'bomb'}`}
            style={cell.isFlipped ? {} : {background: 'linear-gradient(to bottom, rgba(253, 203, 83, 1), rgba(254, 158, 24, 1))'}}
        >
            {cell.isFlipped && (
                cell.isWinning ? (
                <GiShamrock size={screenWidth < MAX_MOBILE_WIDHT ? CELL_ICON_SIZE_MOBILE : CELL_ICON_SIZE_LARGE_SCREEN} color="green" />
                ) : (
                <FaBomb size={screenWidth < MAX_MOBILE_WIDHT ? CELL_ICON_SIZE_MOBILE : CELL_ICON_SIZE_LARGE_SCREEN} color="red" />
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(BoardCell);
