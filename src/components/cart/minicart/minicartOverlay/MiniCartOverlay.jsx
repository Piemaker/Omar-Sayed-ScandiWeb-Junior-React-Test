import React, { Component } from "react";
import "./minicartOverlay.css";
export default class MiniCartOverlay extends Component {
  render() {
    const { isCartOpen, toggleCart } = this.props;
    return (
      <div
        onClick={toggleCart}
        className={`mini-cart__overlay ${
          isCartOpen && "mini-cart__overlay--show"
        }`}
      ></div>
    );
  }
}
