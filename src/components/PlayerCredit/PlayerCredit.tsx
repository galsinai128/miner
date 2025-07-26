import React from 'react';
import CreditItem from '../CreditItem/CreditItem';
import './PlayerCredit.sass';

type PlayerCreditProps = {
    currentDollarBalance: number;
    maxPrize: number;
};
  

const PlayerCredit: React.FC<PlayerCreditProps> = ({currentDollarBalance, maxPrize}) => {

  return (
    <div className='player-credit-container'>
        <div className='player-credit-item left'>
            <div className='player-credit-item-title'>BALANCE</div>
            <div className='player-credit-item-data'>
                <CreditItem dollars={currentDollarBalance} coins={0}/>
            </div>
        </div>
        <div className='player-credit-item right'>
            <div className='player-credit-item-title'>MAX PRIZE</div>
            <div className='player-credit-item-data'>
                <CreditItem dollars={maxPrize} coins={0}/>
            </div>
        </div>
    </div>
  );
}

export default React.memo(PlayerCredit);