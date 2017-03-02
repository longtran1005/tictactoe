import React from "react";
import Sign from "./Sign";

class Square extends React.Component {
  render() {
    const className = this.props.isWinner ? "square winner" : "square";
    return (
      <button className={className} onClick={ () => this.props.onClick()}>
        <Sign player={this.props.value} />
      </button>
    );
  }
}

module.exports = Square;