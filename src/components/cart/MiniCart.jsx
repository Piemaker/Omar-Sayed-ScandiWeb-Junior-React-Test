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
      let totalQuantity = 0;
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
          } = specificProduct;
          totalQuantity += quantity;
          output.push(
            <div key = {`${parentId}-${childId}`} className="mini-cart__product">
              <ProductDescription
                {...{ name, brand, prices, attributes, selectedAttributes }}
              />
                <Counter {...{quantity, parentId, childId }}/>
                <Gallery {...{ gallery }} />
            </div>
          );
        }
      }
      return (
        <article className="mini-cart">
          <h2 className="mini-cart__header">
            <span>my bag</span>, {totalQuantity} items
          </h2>
          <div className="mini-cart__container">{output}</div>
        </article>
      );
    }
    return <></>;
  }
}

MiniCart.contextType = ProductContext;
