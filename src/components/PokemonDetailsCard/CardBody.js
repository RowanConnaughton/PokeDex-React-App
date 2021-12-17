import React, { Component } from "react";

class CardBody extends Component {
  render() {
    return <div className="pokemon-card__body">{this.props.children}</div>;
  }
}

export default CardBody;
