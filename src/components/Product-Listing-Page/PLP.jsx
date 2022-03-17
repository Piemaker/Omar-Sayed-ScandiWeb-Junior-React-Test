import React, { Component } from "react";
import Product from "../product/Product";
import "./plp.css"
export default class PLP extends Component {

  render() {
      const {category, currency} = this.props;
      return (
        <main>
          <h2 className="category-title">{category.name}</h2>
          <section className="grid-container">
            {category.products.map((product) => {
              const price = product.prices.find(price => price.currency.symbol === currency.symbol );
              const {
                amount,
                currency: { symbol },
              } = price;
              const gallery = product.gallery[0];
              const { name, id, inStock } = product;

              return (
                <Product
                  key={id}
                  {...{ name, amount, symbol, gallery, inStock, id }}
                />
              );
            })}
          </section>
        </main>
      );
  

}   

}