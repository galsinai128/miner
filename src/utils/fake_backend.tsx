import { Board, Cell, Game } from './types';

const randomBoolean = (trueProbability: number = 0.5): boolean => {
  return Math.random() < trueProbability;
};

const getTwoDifferentRandomNumbers = (): [number, number] => {
  const first = Math.floor(Math.random() * 9); // 0 to 8
  let second;

  do {
    second = Math.floor(Math.random() * 9);
  } while (second === first);

  return [first, second];
};

const BACKEND_TIMEOUT = 500;

export const createGameBoard = (): Promise<Game> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const gameBoard: Board = [];
  
        const [atLeastOneWinning, atLeastOneBomb] = getTwoDifferentRandomNumbers();
  
        let mapIndex = 0;
        let numberOfBombs = 1;
  
        for (let i = 0; i < 3; i++) {
          const row: Cell[] = [];
  
          for (let j = 0; j < 3; j++) {
            if (mapIndex === atLeastOneWinning) {
              row.push({ isWinning: true });
            } else if (mapIndex === atLeastOneBomb) {
              row.push({ isWinning: false });
            } else {
              const isWinningVal = randomBoolean();
              row.push({ isWinning: isWinningVal });
              if (!isWinningVal){
                numberOfBombs += 1
              }
            }
  
            mapIndex++;
          }
  
          gameBoard.push(row);
        }
  
        resolve({
            board: gameBoard,
            amountPerWin: numberOfBombs * 10,
        });
      }, BACKEND_TIMEOUT);
    });
  };