import React from 'react';
import { CiDollar } from "react-icons/ci";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import './CreditItem.sass';

type CreditItemProps = {
    dollars: number;
    coins: number;
};

const CreditItem: React.FC<CreditItemProps> = ({dollars,coins}) => {

  return (
    <>
        <span className='player-credit-item-data-number icon'><CiDollar color="#22f40f"/></span>
        <span className='player-credit-item-data-number'>{dollars}.00</span>
        <span className='player-credit-item-data-number icon'><AiOutlineCopyrightCircle color="#fdc81b"/></span>
        <span className='player-credit-item-data-number'>{coins}</span>
    </>
  );
}

export default React.memo(CreditItem);