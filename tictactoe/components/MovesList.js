import React from "react";

class MovesList extends React.Component {
    constructor() {
        super();
        this.state = {
            isAsc: false,
        };
    }
    reverse(){
        this.setState({
          isAsc: !this.state.isAsc,
        });
    }

    handleJunp(step){
        this.props.jumpTo(step);
    }

    render() {
        const moves = this.props.history.map((step, move) => {
        const desc = move ?
            'Move: ' + ((move%2) ?'X' : 'O') + ' at ' + step.position.toString() :
            'Game start';

            var styles = (move == this.props.stepNumber) ? bold : normal ;

            return (
            <li key={move}>
                <a href="#" style={styles} onClick={() => this.props.jumpTo(move)}>{move+1}. {desc}</a>
            </li>
            );
        });
        
        var asc = moves.slice().reverse();
        var moveList = this.state.isAsc ? asc : moves ;

        return(
            <div className="game-info">
                <button className="btn btn-success btn-xs reverse" onClick={() => this.reverse() }>
                    Sort moves list
                </button>
                <ul>{moveList}</ul>
            </div>
        );
    }

}

var bold = {
  color: 'green',
  fontWeight: '700',
}

var normal = {
  color: 'green',
}

module.exports = MovesList;