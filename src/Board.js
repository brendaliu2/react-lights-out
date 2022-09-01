import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/



function Board({ nrows = 2, ncols = 2, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  const won = hasWon(board);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    //TODO: make with map

    const board = [];
    const rows = new Array(nrows);
    for (let i = 0; i < rows.length; i++) {
      board.push(rows[i] = new Array(ncols));
      for (let j = 0; j < rows[i].length; j++) {
        board[i][j] = random();
      }
    }


    return board;
  }


  /**Checks if board still has true values, if so return false. 
   * Otherwise return true
   */
  function hasWon(board) {
    for (let row of board) {
      for (let cell of row) {
        if (!cell) {
          return false;
        }
      }
    }

    return true;
  }

  /**Changes start of Board.
   * Accepts coordinate of cell, flips values of cell and those around it
   */
  function flipCellsAround(coord = '0-0') {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const newBoard = oldBoard.map(row => [...row]);

      const directions = [[1, 0], [0, 1], [-1, 0], [0, -1], [0, 0]];
      for (let [a, b] of directions) {
        flipCell(y + a, x + b, newBoard);
      }

      return newBoard;
    });
  }

  return (
    <div>
      {won ? <h1>You won!</h1> :
        <table>
          <tbody>
            {board.map((val, i) =>
              <tr key={i}>
                {val.map((value, idx) =>
                  <Cell
                    key={`${i}-${idx}`}
                    idx={`${i}-${idx}`}
                    flipCellsAroundMe={flipCellsAround}
                    isLit={value} />
                )
                }</tr>
            )}
          </tbody>
        </table>
      }
    </div>
  );

}

/**Helper function to generate random true/false value */
function random() {
  const val = [true, false];
  const random = Math.floor(Math.random() * 2);
  return val[random];
}

export default Board;
