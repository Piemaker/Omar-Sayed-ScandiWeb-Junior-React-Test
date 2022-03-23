import React, { Component } from "react";
import "./colorBox.css";
export default class ColorBox extends Component {
  render() {
    const { name, color, handleChecked } = this.props;
    return (
      <div className="color-box__container">
        <input
          type="radio"
          name={name}
          id={color}
          value={color}
          onClick={handleChecked}
          required
        />
        <div className="color-box__label">
        <label htmlFor={color} style={{ background: color }}></label>
        </div>
      </div>
    );
  }
}
