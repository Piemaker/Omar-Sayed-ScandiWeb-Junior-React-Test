import React, { Component } from "react";
import ProductContext from "../../../ProductContext";
import Counter from "../counter/Counter";
import Gallery from "../gallery/Gallery";
import ProductDescription from "../productdescription/ProductDescription";
import "./cart.css";

export default class Cart extends Component {
  render() {
    const { cart, getPriceBasedOnCurrency} =
      this.context;
    let output = [];
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
            id
          } = specificProduct;
          const price = getPriceBasedOnCurrency(prices);
          const {
            currency: { symbol },
            amount,
          } = price;
          output.push(
            <div key={`${parentId}-${childId}`} className="cart__product">
              <ProductDescription
                {...{
                  name,
                  brand,
                  symbol,
                  amount,
                  attributes,
                  selectedAttributes,
                  boldFont : true
                }}
              />
              <div className="cart__product__counter__gallery__container">
                <Counter {...{ quantity, parentId, childId }} />
                <Gallery {...{ gallery, id }} />
              </div>
            </div>
          );
        }
      }
    }
    return (
      <article className="cart">
        <div className="cart__product">
        <h1 className="cart__heading">cart</h1>
        </div>
        {output}
      </article>
    );
  }
}

Cart.contextType = ProductContext;
