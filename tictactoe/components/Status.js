// import React from 'react';
// import Sign from './Sign';


// function Status(props) {
//   if (props.winner) {
//     return <div> Winner: <Sign player={props.winner} /> </div>;
//   } else {
//     return <div> Next player: <Sign player={props.nextPlayer} /> </div>;
//   }
// }

// export default Status;

import React from "react";
import Sign from "./Sign";

class Status extends React.Component {
  render() {
    if (this.props.winner){
         return <div> Winner: <Sign player={this.props.winner} /> </div>;
    } else {
        if(this.props.endGame){
          return <div> It's a <b>tie</b> ! </div>;
        } else {
          return <div> Next player: <Sign player={this.props.nextPlayer} /> </div>;
        }
    }
  }
}

module.exports = Status;