import React from "react";
import Board from "./Board";
import Button from "./Button";
import MovesList from "./MovesList";

class Position {
  constructor(i) {
    this.row = Math.floor(i / 3) + 1;
    this.col = (i % 3) + 1;
  }

  toString() {
    return `( ${this.row}, ${this.col})`;
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
      isAsc: false,
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

  reverse(){
        this.setState({
          isAsc: !this.state.isAsc,
        });
      }

  render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
      var winnerLine = (winner) ? winner.line : null ;

      let status;
      if (winner) {
        status = 'Winner: ' + winner.player;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      const moves = history.map((step, move) => {
      const desc = move ?
        'Move: ' + ((move%2) ?'X' : 'O') + ' at ' + step.position.toString() :
        'Game start';

        var styles = (move == this.state.stepNumber) ? bold : normal ;

        return (
          <li key={move}>
            <a href="#" style={styles} onClick={() => this.jumpTo(move)}>{move+1}. {desc}</a>
          </li>
        );
      });
     
     var asc = moves.slice().reverse();
     var moveList = this.state.isAsc ? asc : moves ;
     
      return (
      <div className="game">
        <div className="wrapper">
          <div className="status">{status}</div>
          <div className="game-board">
            <Board 
            winnerLine = {winnerLine}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            />
          </div>
        </div>
        <div className="game-info">
          <button className="btn btn-success btn-xs reverse" onClick={() => this.reverse() }>
            Sort moves list
          </button>
          <ul>{moveList}</ul>
        </div>
        <div>
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

var bold = {
  color: 'green',
  fontWeight: '700',
}

var normal = {
  color: 'green',
}

module.exports = Game;