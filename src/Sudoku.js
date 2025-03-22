import React, { useState, useRef } from "react";
import "./Sudoku.css";

const initialBoard = Array.from({ length: 9 }, () => Array(9).fill(""));

export default function Sudoku() {
  const [board, setBoard] = useState(initialBoard);
  const inputRefs = useRef(Array.from({ length: 9 }, () => Array(9).fill(null)));

  const handleChange = (row, col, value) => {
    if (!/^[1-9]?$/.test(value)) return;
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((r) => [...r]);
      newBoard[row][col] = value;
      return newBoard;
    });
  };

  const handleKeyDown = (e, row, col) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (row > 0) inputRefs.current[row - 1][col]?.focus();
        break;
      case "ArrowDown":
        if (row < 8) inputRefs.current[row + 1][col]?.focus();
        break;
      case "ArrowLeft":
        if (col > 0) inputRefs.current[row][col - 1]?.focus();
        break;
      case "ArrowRight":
        if (col < 8) inputRefs.current[row][col + 1]?.focus();
        break;
      default:
        break;
    }
  };

  return (
    <div className="sudoku-container">
      <h1 className="title">Sudoku</h1>
      <div className="sudoku-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                ref={(el) => (inputRefs.current[rowIndex][colIndex] = el)}
                className={`sudoku-cell ${(rowIndex % 3 === 2 && rowIndex !== 8) ? "row-border" : ""} ${(colIndex % 3 === 2 && colIndex !== 8) ? "col-border" : ""}`}
                type="text"
                pattern="[1-9]"
                maxLength={1}
                value={cell}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
