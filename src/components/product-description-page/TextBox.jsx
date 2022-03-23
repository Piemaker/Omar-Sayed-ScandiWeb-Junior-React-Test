import React, { Component } from 'react'
import "./textBox.css";
export default class TextBox extends Component {
  render() {
    const {text,name, handleChecked } = this.props;
    return (
      <div className='text-box__container'>
        <input
          type="radio"
          name={name}
          id={`${name}-${text}`}
          value={text}
          onClick={handleChecked}
          required
        />
        <div className="text-box__label">
          <label htmlFor={`${name}-${text}`}>{text}</label>
        </div>
      </div>
    );
  }
}
