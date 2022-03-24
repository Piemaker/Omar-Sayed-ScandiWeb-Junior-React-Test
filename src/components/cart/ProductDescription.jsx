import React, { Component } from "react";
import "./productDescription.css";
export default class ProductDescription extends Component {
  render() {
    return (
      <div className="description">
        <h2 className="description__header">Apollo</h2>
        <h2 className="description__header">Running Shoe</h2>
        <p className="description__currency">$50.00</p>
        <div className="description__attributes-container">
          <div className="description__attributes">S</div>
          <div className="description__attributes description__attributes--muted">
            M
          </div>
        </div>
      </div>
    );
  }
}
