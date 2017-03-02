import React from "react";
import Square from "./Square";

class Board extends React.Component {
  renderSquare(i) {
    let isWinner = (this.props.winnerLine) ? this.props.winnerLine.indexOf(i) !== -1 : false;
    return <Square isWinner={isWinner} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
  }
  render() {
    var rows=[];
    let squares=[];
    for (var i=0;i<3;i++){
      for(var j=3*i; j<3*i+3;j++){
        squares.push(this.renderSquare(j));
      }
      rows.push(<div className="board-row">{squares}</div>);
      squares=[];
    }
    return <div>{rows}</div>
  }
}

module.exports = Board;