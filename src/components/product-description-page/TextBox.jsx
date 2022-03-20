import React, { Component } from 'react'
import "./textBox.css";
export default class TextBox extends Component {
  render() {
    const {text } = this.props;
    return (
        <div className='text-box'>
             <input type = "radio" name = "text-attribute" id = {text}/>
             <label htmlFor={text}>{text}</label>
        </div>
      
    );
  }
}
