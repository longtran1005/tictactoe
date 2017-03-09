import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    let isWinner = (this.props.winnerLine) ? this.props.winnerLine.indexOf(i) !== -1 : false;
    return <Square key={i} isWinner={isWinner} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
  }
  render() {
    const size =6;
    var rows=[];
    let squares=[];
    for (var i=0;i<size;i++){
      for(var j=size*i; j<size*i+size;j++){
        squares.push(this.renderSquare(j));
      }
      rows.push(<div key={i} className="board-row">{squares}</div>);
      squares=[];
    }
    return <div className="board">{rows}</div>
  }
}

module.exports = Board;