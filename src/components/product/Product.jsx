import React, { Component } from 'react'
import "./product.css"
export default class Product extends Component {
    constructor(props){
        super(props);
    }
  render() {
    const { gallery, name, symbol, amount } = this.props;
    return (
      <article className="product__container">
          <div className="product__image__container">
        <img src={gallery} alt={name} />
              </div>
        <div className="product__text__container">
          <p className="product__text--muted">{name}</p>
          <p>
            {symbol}
            {amount}
          </p>
        </div>
      </article>
    );
  }
}
