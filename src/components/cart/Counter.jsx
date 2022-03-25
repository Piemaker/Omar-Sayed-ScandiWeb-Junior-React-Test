import React, { Component } from 'react'
import "./counter.css"
export default class Counter extends Component {
  render() {
    const {quantity} = this.props;
    return (
      <div className="counter">
        <div className="counter__button">+</div>
        <div className="counter__value">{quantity}</div>
        <div className="counter__button">-</div>
      </div>
    );
  }
}
