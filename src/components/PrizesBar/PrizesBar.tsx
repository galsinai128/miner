// GameBoard.tsx
import React from 'react';
import { GiShamrock } from "react-icons/gi";
import CreditItem from '../CreditItem/CreditItem';
import './PrizesBar.sass';

type PrizesBarProps = {
  numberOfWinningCells: number;
  numberOfFlippedCells: number;
  amountPerWin: number;
  balanceAdded: number,
  slideAnimationVal: number,
};

const PrizesBar: React.FC<PrizesBarProps> = ({ 
    numberOfWinningCells,
    numberOfFlippedCells,
    amountPerWin,
    balanceAdded,
    slideAnimationVal,
}) => {
  const numOfPossiblePrizes = numberOfWinningCells - numberOfFlippedCells;

  return (
    <div>
      <div className='prizes-bar-border-container'>
          <div 
            className='prizes-bar-container-background'
            style={numOfPossiblePrizes === 0 ? {display: 'none'} : {}}
          />
          <div className='prizes-bar-container'>
              {numOfPossiblePrizes > 0 && 
                <div 
                  className='prizes-bar-item'
                  id="current_prize_el"
                >
                  <span style={slideAnimationVal ? {visibility: 'hidden'} : {}}>
                    <CreditItem 
                      dollars={amountPerWin * (numberOfFlippedCells + 1) - balanceAdded} 
                      coins={0}
                    />
                  </span>
                </div>
              }
              {numOfPossiblePrizes > 1 && 
                <div 
                  className='prizes-bar-item'
                  style={slideAnimationVal ? {position: 'relative', left: slideAnimationVal*-1} : {}}
                >
                  <CreditItem 
                    dollars={amountPerWin * (numberOfFlippedCells + 2)} 
                    coins={0}
                  />
                </div>
              }
              {numOfPossiblePrizes > 2 && 
                <div 
                  className='prizes-bar-item'
                  style={slideAnimationVal ? {position: 'relative', left: slideAnimationVal*-1} : {}}
                >
                  <CreditItem 
                    dollars={amountPerWin * (numberOfFlippedCells + 3)} 
                    coins={0}
                  />
                </div>
              }
          </div>
      </div>
      <div className='next-prize-container'>
          <div className='next-prize-title'>NEXT PRIZE</div>
          <div className='next-prize-data'>
              <GiShamrock color="green"/>
              <span className='next-prize-data-bold-number'>{numberOfFlippedCells}</span>/{numberOfWinningCells}
          </div>
      </div>
    </div>
  );
};

export default React.memo(PrizesBar);
