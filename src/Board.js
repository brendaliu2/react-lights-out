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

// TODO: create array-of-arrays of true/false values

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  const won = hasWon(board);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    const board = [];
    const rows = new Array(nrows);
    for (let i = 0; i < rows.length; i++) {
      board.push(rows[i] = new Array(ncols));
      for (let j = 0; j < rows[i].length; j++) {
        board[i][j] = random();
      }
    }
    // console.log(board);
    console.log("board", board);
    return board;
  }

  console.log("won", won);
  //flipCellsAround();

  function hasWon(board) {
    // TODO: check the board in state to determine whether the player has won.
    console.log("board2", board);
    for (let row of board) {
      for (let cell of row) {
        if (cell) {
          return false;
        }
      }
    }
    return true;
  }
  //coord is from cell itself, button onclick
  function flipCellsAround(coord = '0-0') {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      const board2 = [...oldBoard];

      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y, x, board2);
      flipCell(y - 1, x, board2);
      flipCell(y + 1, x, board2);
      flipCell(y, x - 1, board2);
      flipCell(y, x + 1, board2);

      // TODO: return the copy
      console.log("flipboard", board2);

      return board2;
    });
  }

  return (
    board.map((val, i) =>
      val.map((value, idx) =>
        <Cell idx={`${i}-${idx}`} flipCellsAroundMe={flipCellsAround} isLit={value} />
      )
    )
  );
  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
}

function random() {
  const val = [true, false];
  const random = Math.floor(Math.random() * 2);
  return val[random];
}

export default Board;
