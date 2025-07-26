import React, {useState, useEffect} from 'react';
import {fetchBoard} from './services/apis'
import {sleep} from './utils/utils'
import { Board, Game  } from './utils/types'; 
import { GiShamrock } from "react-icons/gi";
import { FaBomb } from "react-icons/fa";
import { CiDollar } from "react-icons/ci";
import { 
  CASHOUT_ANIMATION_TIMEOUT,
  FIREWORKS_ANIMATION_TIME, 
  COINS_COUNT_IN_MILLISECOND_TIME,
  SLIDE_PRIZE_ANIMATION_PHASE,
} from './utils/constants'
import PlayerCredit from './components/PlayerCredit/PlayerCredit'
import GameBoard from './components/GameBoard/GameBoard'
import FireworksComponent from './components/Fireworks/Fireworks'
import FullScreenLoader from './components/FullScreenLoader/FullScreenLoader'
import './App.sass';

function App() {

  const [isLoadingGame,setIsLoadingGame] = useState<boolean>(false);
  const [isErrorLoadingGame,setIsErrorLoadingGame] = useState<boolean>(false);
  const [gameBoard, setGameBoard] = useState<Board | null>(null);
  const [amountPerWin, setAmountPerWin] = useState<number>(0);
  const [numberOfWinningCells, setNumberOfWinningCells] = useState<number>(0);
  const [numberOfFlippedCells, setNumberOfFlippedCells] = useState<number>(0);
  const [currentDollarBalance, setCurrentDollarBalance] = useState<number>(0);
  const [userTotalBalance, setUserTotalBalance] = useState<number>(0);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [isAddingBalance,setIsAddingBalance] = useState<boolean>(false);
  const [balanceAdded,setBalanceAdded] = useState<number>(0);
  const [isCashingOut,setIsCashingOut] = useState(false);
  const [gameWon,setGameWon] = useState(false);
  const [slideAnimationVal,setSlideAnimationVal] = useState(0);


  const fetchAndInitGame = ()=>{
    setIsLoadingGame(true);
    fetchBoard()
      .then((res: Game) => {
        initGame(res);
        setIsLoadingGame(false);
      })
      .catch((e) => {
        setIsLoadingGame(false);
        setIsErrorLoadingGame(true);
        alert(e);
      });
  }

  const initGame = (game: Game) => {
    const newBoard: Board = game.board.map(row =>
      row.map(cell => ({
        ...cell,
        isFlipped: false,
      }))
    );
    // console.log(newBoard)
    setGameBoard(newBoard);
    setAmountPerWin(game.amountPerWin)
    let numberOfWinningCellsRes = 0;
    game.board.forEach(row => {
      row.forEach(cell => {
        if (cell.isWinning){
          numberOfWinningCellsRes++
        }
      })
    })
    setNumberOfWinningCells(numberOfWinningCellsRes);
    setCurrentDollarBalance(0);
    setNumberOfFlippedCells(0);
    setGameWon(false);
  }

  const onCashoutGameClicked = () => {
    setIsCashingOut(true);
    setUserTotalBalance(userTotalBalance + currentDollarBalance);
    setTimeout(()=>{
      setIsCashingOut(false);
      setIsGameEnded(true);
    },CASHOUT_ANIMATION_TIMEOUT)
  }

  const onRestartGameClicked = ()=> {
    setIsGameEnded(false);
    fetchAndInitGame();
  }

  const endGame = (isGameWon: boolean)=> {
    if (!isGameWon){
      setCurrentDollarBalance(0);
    } else {
      setGameWon(true);
      onCashoutGameClicked();
      setTimeout(()=>{setGameWon(false)},FIREWORKS_ANIMATION_TIME)
    }
    setIsGameEnded(true);
  }

  const addBalanceAsync = async (balanceToAdd: number) => {
    for (let i = 0; i < balanceToAdd; i++) {
      setCurrentDollarBalance(prev => prev + 1);
      setBalanceAdded(prev => prev + 1)
      await sleep(COINS_COUNT_IN_MILLISECOND_TIME);
    }
  };

  const slideAnimation = async ()=> {
    const el = document.getElementById('current_prize_el');
    if (el){
      for (let i = 0; i < el.offsetWidth; i++) {
        setSlideAnimationVal(prev => prev + 1)
        await sleep(SLIDE_PRIZE_ANIMATION_PHASE);
      }
      setSlideAnimationVal(0)      
    }
  }

  const addCredit = async () => {
    setIsAddingBalance(true);
    const balanceToAdd = amountPerWin * (numberOfFlippedCells+1)
    await addBalanceAsync(balanceToAdd);
    await slideAnimation();
    setIsAddingBalance(false);
    setBalanceAdded(0);
  }

  const onCellClicked = async (rowIndex : number, cellIndex: number) => {
    if (!gameBoard || gameBoard[rowIndex][cellIndex].isFlipped || isGameEnded || isAddingBalance){
      return
    }
    const gameBoardCopy = gameBoard.map(row => 
      row.map(cell => ({ ...cell }))
    );
    gameBoardCopy[rowIndex][cellIndex].isFlipped = true;
    setGameBoard(gameBoardCopy);
    const cellClicked = gameBoard[rowIndex][cellIndex];
    if (!cellClicked.isWinning){
      endGame(false);
      return
    }

    if (numberOfWinningCells === numberOfFlippedCells + 1){
      endGame(true);
    }
    await addCredit();
    setNumberOfFlippedCells(numberOfFlippedCells + 1);
  }

  useEffect(() => {
    fetchAndInitGame();
  }, []);

  if (!gameBoard && isLoadingGame){
    return (
      <FullScreenLoader/>
    )
  }

  if (isErrorLoadingGame){
    return (
      <div>Error loading game</div>
    )
  }

  return (
    <div className="App">
      <div className="title-and-icons">
        <span className='title-icon title-left-icon'><GiShamrock color='green'/></span>
        <span className='title-icon title-right-icon'><FaBomb color='red'/></span>
        <div className="game-title">LUCKYMINER</div>
      </div>
      <div className='game-container'>
        <PlayerCredit currentDollarBalance={currentDollarBalance} maxPrize={amountPerWin * numberOfWinningCells}/>
        <GameBoard
          gameBoard={gameBoard}
          onCellClicked={onCellClicked}
          numberOfWinningCells={numberOfWinningCells}
          numberOfFlippedCells={numberOfFlippedCells}
          amountPerWin={amountPerWin}
          balanceAdded={balanceAdded}
          isGameEnded={isGameEnded}
          slideAnimationVal={slideAnimationVal}
        />
        <div className='control-panel'>

          {numberOfFlippedCells === 0 && !isGameEnded ? <div/> : (
            <div 
              onClick={isGameEnded ? onRestartGameClicked : onCashoutGameClicked}
              className='action_button'
            >
              {isGameEnded ? 'RESTART' : 'CASHOUT'}
            </div>
          )}
          <div className={`balnce-data ${isCashingOut ? 'cashing-out' : ''}`}><span className='balnce-data-title'>TOTAL BALANCE:</span> <CiDollar color="#22f40f"/><span className={`total-cash`}>{userTotalBalance}</span></div>
        </div>
      </div>
      {isLoadingGame && <FullScreenLoader/>}
      {gameWon && (
        <FireworksComponent  />
      )}
    </div>
  );
}

export default App;
