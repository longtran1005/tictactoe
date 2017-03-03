import React from 'react';
import styles from "../styles/styles";

class Sign extends React.Component {
    render(){
        var signStyle = (this.props.player === 'X') ? styles.green : styles.red;
        return <span style={signStyle}> {this.props.player} </span>
    }
}

module.exports = Sign;