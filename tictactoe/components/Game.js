import React from "react";
import Board from "./Board";
import MovesList from "./MovesList";
import Status from "./Status";
import styles from "../styles/styles";

class Position {
  constructor(i) {
    this.row = Math.floor(i / 3) + 1;
    this.col = (i % 3) + 1;
  }

  toString() {
    return `(${this.row},${this.col})`;
  }
}

class Game extends React.Component {
   constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0,
    };
    this.jumpTo = this.jumpTo.bind(this);
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        position: new Position(i),
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) ? false : true,
      });
    }

  resetGame() {
      this.setState({
        history: [{
          squares: Array(9).fill(null),
        }],
        xIsNext: true,
        stepNumber: 0,
      });
    }

  render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      var winnerLine = (winner) ? winner.line : null ;
     
      return (
      <div className="game">
        <div className="wrapper">
          <div className="status">
            <Status endGame = {(this.state.stepNumber === 9)} winner={(winner)? winner.player : null} nextPlayer={this.state.xIsNext ? 'X' :'O'} />
          </div>
          <div className="game-board">
            <Board 
            winnerLine = {winnerLine}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            />
            <button className="btn btn-warning btn-xs" onClick = {()=>this.resetGame()}> Reset </button> 
          </div>
        </div>
        <div className="game-info">
          <MovesList
            history = {history}
            stepNumber = {this.state.stepNumber}
            jumpTo = {(step) => this.jumpTo(step)}
          />
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { player: squares[a],
               line: lines[i] 
             };
    }
  }
  return null;
}

module.exports = Game;