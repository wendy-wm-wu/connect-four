import React from 'react';
import './App.css';

const Cell = ({ value, columnIndex, play }) => {
  let color = 'white';
  if (value === 1) {
    color = 'red'; 
  } else if (value === 2) {
    color = 'yellow'; 
  }
  return (
    <td>
      <div className="cell" onClick={() => play(columnIndex)} >
        <div className={color} />
      </div>
    </td>
  );
}

export default Cell;