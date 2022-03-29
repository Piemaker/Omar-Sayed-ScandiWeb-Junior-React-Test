import React, { Component } from "react";
import ProductContext from "../../../ProductContext";
import "./counter.css";
export default class Counter extends Component {
  render() {
    const { quantity, parentId, childId } = this.props;
    const { handleDecrement, handleIncrement } = this.context;

    return (
      <div className="counter">
        <div
          className="counter__button"
          onClick={() => handleIncrement(parentId, childId)}
        >
          +
        </div>
        <div className="counter__value">{quantity}</div>
        <div
          className="counter__button"
          onClick={() => handleDecrement(parentId, childId)}
        >
          -
        </div>
      </div>
    );
  }
}

Counter.contextType = ProductContext;
