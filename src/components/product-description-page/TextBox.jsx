import React, { Component } from 'react'
import "./textBox.css";
export default class TextBox extends Component {
  render() {
    const {text,name, handleChecked } = this.props;
    return (
      <div className="text-box">
        <input
          type="radio"
          name={name}
          id={`${name}-${text}`}
          value={text}
          onClick={handleChecked}
        />
        <label htmlFor={`${name}-${text}`}>{text}</label>
      </div>
    );
  }
}
