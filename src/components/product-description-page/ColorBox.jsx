import React, { Component } from 'react'
import "./colorBox.css";
export default class ColorBox extends Component {
  render() {
    const { color} = this.props;
    return (
      <div className="color-box">
        <input type="radio" name="color-attribute" id={color} />
        <label htmlFor={color} style = {{background : color}}></label>
      </div>
    );
  }
}
