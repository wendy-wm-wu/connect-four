import React from 'react';
import './App.css';
import Cell from './Cell.js'; 

const Row = ({ row, play }) => {
  return (
    <tr>
    {row.map((cell, i) => <Cell key={i} value={cell} play={play} columnIndex={i} />)}
    </tr>
  );
}

export default Row; 