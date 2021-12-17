import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
        <section
        className={this.props.cname}
      >
        {this.props.children}
      </section>
    );
  }
}

export default Card;