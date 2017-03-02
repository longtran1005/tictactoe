import React from "react";

class Square extends React.Component {
  render() {
    const className = this.props.isWinner ? "square winner" : "square";
    return (
      <button className={className} onClick={ () => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

module.exports = Square;