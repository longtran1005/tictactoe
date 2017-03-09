import React from "react";
import Board from "./Board";
import MovesList from "./MovesList";
import Status from "./Status";
import styles from "../styles/styles";

const size =20;
class Position {
  constructor(i) {
    this.row = Math.floor(i / size) + 1;
    this.col = (i % size) + 1;
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
        squares: Array(size*size).fill(null)
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
          squares: Array(size*size).fill(null),
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
            <Status endGame = {(this.state.stepNumber === size*size)} winner={(winner)? winner.player : null} nextPlayer={this.state.xIsNext ? 'X' :'O'} />
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

var rule=[];

for (var i=0;i<size*size;i++){
  if (i%size<size-4){
    var singleLine=[];
    for(var j=i;j<i+5;j++){
      singleLine.push(j);
    }
    rule.push(singleLine);
  }    
  
  if(i+4*size<size*size){
    var singleLine=[];
    for(var j=i;j<i+4*size+1;j=j+size){
      singleLine.push(j);
    }
    rule.push(singleLine);
  }

  if ((i%size<size-4) && (i+4*(size+1)<size*size)){
    var singleLine=[];
    for(var j=i;j<i+4*(size+1)+1;j=j+size+1){
      singleLine.push(j);
    }
    rule.push(singleLine);
  }

  if((i%size>=4) && (i+4*(size-1)<size*size) ){
    var singleLine=[];
    for(var j=i;j<i+4*(size-1)+1;j=j+size-1){
      singleLine.push(j);
    }
    rule.push(singleLine);
  }
}

const lines = rule;

// const lines6x6 = [
  //   [0,1,2,3,4], [1,2,3,4,5], [6,7,8,9,10], [7,8,9,10,11], [12,13,14,15,16], [13,14,15,16,17],
  //   [18,19,20,21,22], [19,20,21,22,23], [24,25,26,27,28], [25,26,27,28,29], [30,31,32,33,34], [31,32,33,34,35],

  //   [0,6,12,18,24], [6,12,18,24,30], [1,7,13,19,25], [7,13,19,25,31], [2,8,14,20,26], [8,14,20,26,32],
  //   [3,9,15,21,27], [9,15,21,27,33], [4,10,16,22,28], [10,16,22,28,34], [5,11,17,23,29], [11,17,23,29,35],

  //   [0,7,14,21,28], [1,8,15,22,29], [6,13,20,27,34], [7,14,21,28,35], 
  //   [5,10,15,20,25], [4,9,14,19,24], [11,16,21,26,31], [10,15,20,25,30], 
  // ];
  
function calculateWinner(squares) {
  for (let i = 0; i < lines.length; i++) {
    const realLine = lines[i];
    let isIdentical = true;

    for (let j=1;j<realLine.length;j++){
      if (squares[realLine[0]] !== squares[realLine[j]]){
        isIdentical = false;
        break;
      }
    }

      if (isIdentical === true && (squares[realLine[0]])) {
      return { player: squares[realLine[0]],
               line: lines[i] 
             };
      }

  }
  return null;
}

module.exports = Game;


