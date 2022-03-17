import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import "./product.css"
export default class Product extends Component {
  
  render() {
    const { gallery, name, symbol, amount, inStock, id } = this.props;
    return (
            <Link to = {`/product/${id}`}>
              
              <article
                className={`product__container ${
                  inStock ? "" : "product__container--faded"
                }`}
              >
                <div className="product__image__grid">
                  <div className="product__image__grid__icon-container">
                  <div className="product__image__grid__add-icon"></div>
                    </div>
        
                  <div
                    className={`${
                      inStock
                        ? "product__image__overlay--hidden"
                        : "product__image__overlay"
                    }`}
                  >
                    Out Of Stock
                  </div>
                  <div className="product__image__container">
                    <img src={gallery} alt={name} />
                  </div>
                </div>
                <div className="product__text__container">
                  <p className="product__text--muted">{name}</p>
                  <p>
                    {symbol}
                    {amount}
                  </p>
                </div>
              </article>
              </Link>
            );

  }
}
