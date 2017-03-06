import React from 'react';
import styles from "../styles/styles";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' ;
class Sign extends React.Component {
    render(){
        var signStyle = (this.props.player === 'X') ? styles.green : styles.red;
        return (
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <span style={signStyle}> {this.props.player} </span>
        </ReactCSSTransitionGroup>
        ) ;
    }
}

module.exports = Sign;