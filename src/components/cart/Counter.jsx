import React, { Component } from 'react'
import "./counter.css"
export default class Counter extends Component {
  render() {
    return (
      <div className="counter">
        <div className="counter__button">+</div>
        <div className='counter__value'>1</div>
        <div className="counter__button">-</div>
      </div>
    );
  }
}
