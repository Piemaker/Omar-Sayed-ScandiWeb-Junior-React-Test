import React, { Component } from "react";
import "./colorBox.css";
export default class ColorBox extends Component {
  render() {
    const { name, color, handleChecked } = this.props;
    return (
      <div className="color-box">
        <input
          type="radio"
          name={name}
          id={color}
          value={color}
          onClick={handleChecked}
        />
        <label htmlFor={color} style={{ background: color }}></label>
      </div>
    );
  }
}
