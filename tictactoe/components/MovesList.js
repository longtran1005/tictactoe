import React from "react";
import styles from "../styles/styles";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' ;

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

    render() {
        const moves = this.props.history.map((step, move) => {
        const desc = move ?
            'Move: ' + ((move%2) ?'X' : 'O') + ' at ' + step.position.toString() :
            'Game start';

            var liStyle = (move == this.props.stepNumber) ? styles.green : styles.lightGreen ;

            return (
            <li key={move}>
                <a href="#" style={liStyle} onClick={() => this.props.jumpTo(move)}>{move+1}. {desc}</a>
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
                <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                <ul>{moveList}</ul>
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

module.exports = MovesList;