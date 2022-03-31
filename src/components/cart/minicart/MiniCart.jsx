import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../../../ProductContext";
import "./miniCart.css";
import Counter from "../counter/Counter";
import Gallery from "../gallery/Gallery";
import ProductDescription from "../productdescription/ProductDescription";
export default class MiniCart extends Component {
  render() {
    const { cart, getPriceBasedOnCurrency, isCartOpen, toggleCart } =
      this.context;
    let output = [];
    let totalQuantity = 0;
    let totalPrice = 0;
    let currentSymbol = "";
    if (Object.keys(cart).length !== 0) {
      for (const [parentId, mainProduct] of Object.entries(cart)) {
        for (const [childId, specificProduct] of Object.entries(mainProduct)) {
          const {
            attributes,
            brand,
            gallery,
            name,
            prices,
            quantity,
            selectedAttributes,
            id,
          } = specificProduct;
          const price = getPriceBasedOnCurrency(prices);
          const {
            currency: { symbol },
            amount,
          } = price;
          currentSymbol = symbol;
          totalQuantity += quantity;
          totalPrice += quantity * amount;
          output.push(
            <div key={`${parentId}-${childId}`} className="mini-cart__product">
              <ProductDescription
                {...{
                  name,
                  brand,
                  symbol,
                  amount,
                  attributes,
                  selectedAttributes,
                }}
              />
              <Counter {...{ quantity, parentId, childId }} />
              <Gallery {...{ gallery, id }} />
            </div>
          );
        }
      }
    }
    return (
      <article
        className={`mini-cart ${isCartOpen && "mini-cart--show"}`}
        id="mini-cart"
      >
        <h2 className="mini-cart__header">
          <span>my bag</span>, {totalQuantity} items
        </h2>
        <div className="mini-cart__container">{output}</div>
        <div className="mini-cart__total-price">
          <p className="mini-cart__total-price__title">total</p>
          <p className="mini-cart__total-price__price">
            {currentSymbol}
            {totalPrice.toFixed(4)}
          </p>
        </div>
        <div className="mini-cart__buttons__container">
          <Link className="mini-cart__buttons" to="/cart">
            view cart
          </Link>
          <Link
            to="/checkout"
            className="mini-cart__buttons mini-cart__buttons--checkout"
          >
            check out
          </Link>
        </div>
      </article>
    );
  }
}

MiniCart.contextType = ProductContext;
