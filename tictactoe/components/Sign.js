import React from 'react';

class Sign extends React.Component {
    render(){
        var styles = (this.props.player === 'X') ? green : red;
        return <span style={styles}> {this.props.player} </span>
    }
}

var green = {
  color: 'green',
  fontWeight: '700',
}

var red = {
  color: 'red',
  fontWeight: '700',
}

module.exports = Sign;