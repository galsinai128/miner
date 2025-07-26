export interface Cell {
    isWinning: boolean;
    isFlipped?: boolean;
}
  
export type Board = Cell[][];

export type Game = {
    board: Board,
    amountPerWin: number,
}