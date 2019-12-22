import React from 'react';
import './App.css';
import Row from './Row.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: 1,
      player2: 2,
      currentPlayer: null,
      board: [],
      gameOver: false,
      message: '',
    }
  }
  componentDidMount = () => {
    this.initBoard();
  }

  togglePlayer = () => {
    return (this.state.currentPlayer === this.state.player1) ? this.state.player2 : this.state.player1; 
  }

  play = columnIndex => {
    if (!this.state.gameOver) {
      let board = this.state.board;
      for (let i = board.length - 1; i >= 0; i--) {
        if (board[i][columnIndex] === null) {
          board[i][columnIndex] = this.state.currentPlayer;
          break;
        }
      }
      let result = this.checkAll(board); 
      if (result === this.state.player1) {
        this.setState({ board, gameOver: true, message: 'Player 1 wins!' });
      } else if (result === this.state.player2) {
        this.setState({ board, gameOver: true, message: 'Player 2 wins!' });
      } else if (result === 'Draw') {
        this.setState({ board, gameOver: true, message: 'Tie game!' }); 
      } else {
        this.setState({ board, currentPlayer: this.togglePlayer() }); 
      }
    } else {
      this.setState({ message: 'Game over. Please restart a new game.' });
    }
    console.log(this.state.board);
  }

  checkAll = board => {
    //returns winning player or if it's a draw
    return this.checkVertical(board) || this.checkHorizontal(board) || this.checkDiagonalLeft(board) || this.checkDiagonalRight(board) || this.checkDraw(board); 
  }

  checkVertical = board => {
    //check row 3 or greater 
    for (let i = 3; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (board[i][j]) {
          if (board[i][j] === board[i - 1][j] &&
              board[i][j] === board[i - 2][j] && 
              board[i][j] === board[i - 3][j]) {
              return board[i][j]; 
          }
        }
      }
    }
  }

  checkHorizontal = board => {
    //check col 3 or less 
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j]) {
          if (board[i][j] === board[i][j + 1] &&
              board[i][j] === board[i][j + 2] &&
              board[i][j] === board[i][j + 3]) {
              return board[i][j];
          }
        }
      }
    }
  }

  checkDiagonalLeft = board => {
    //check row 3 or larger and col 3 or larger 
    for (let i = 3; i < 6; i++) {
      for (let j = 3; j < 7; j++) {
        if (board[i][j]) {
          if (board[i][j] === board[i - 1][j - 1] &&
              board[i][j] === board[i - 2][j - 2] && 
              board[i][j] === board[i - 3][j - 3]) {
              return board[i][j]; 
          }
        }
      }
    }
  }

  checkDiagonalRight = board => {
    //check row 3 or larger and col 3 or smaller
    for (let i = 3; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j]) {
          if (board[i][j] === board[i - 1][j + 1] &&
              board[i][j] === board[i - 2][j + 2] &&
              board[i][j] === board[i - 3][j + 3]) {
              return board[i][j]; 
          }
        }
      }
    }
  }

  checkDraw = board => {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (board[i][j] === null) {
          return false; 
        }
      }
    }
    return 'Draw'; 
  }

  initBoard = () => {
    let board = this.state.board;

    for (let i = 0; i < 6; i++) {
      board[i] = [];
      for (let j = 0; j < 7; j++) {
        board[i][j] = null;
      }
    }
    this.setState({
      board,
      currentPlayer: this.state.player1,
      gameOver: false,
      message: '',
    });
  }

  render() {
    return(
      <div>
        <h1>Connect Four</h1>
        <button onClick={this.initBoard}>New Game</button>
        <table>
          <thead></thead>
          <tbody>
            {this.state.board.map((row, i) => <Row key={i} row={row} play={this.play} />)}
          </tbody>
        </table>
        <p className="message">{this.state.message}</p>
      </div>
    );
  }
};

export default App;
