import React, { Component } from "react";
import ProductContext from "../../ProductContext";
import Counter from "./Counter";
import Gallery from "./Gallery";
import "./miniCart.css";
import ProductDescription from "./ProductDescription";
export default class MiniCart extends Component {
  render() {
    const { cart } = this.context;
    if (Object.keys(cart).length !== 0) {
      let output = [];

      for (const [key, mainProduct] of Object.entries(cart)) {
        for (const [key, specificProduct] of Object.entries(mainProduct)) {
          const {
            attributes,
            brand,
            gallery,
            id,
            name,
            prices,
            quantity,
            selectedAttributes,
          } = specificProduct;

          output.push(
            <>
              <ProductDescription
                key={`description-${key}`}
                {...{ name, brand, prices, attributes, selectedAttributes }}
              />
              <div key={`gallery-${key}`} className="mini-cart__gallery">
                <Counter {...{quantity}}/>
                <Gallery {...{ gallery }} />
              </div>
            </>
          );
        }
      }
      return (
        <article className="mini-cart">
          <h2 className="mini-cart__header">
            <span>my bag</span>, 2 items
          </h2>

          <div className="mini-cart__container">{output}</div>
        </article>
      );
    }
    return <></>;
  }
}

MiniCart.contextType = ProductContext;
