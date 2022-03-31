import React, { Component } from "react";
import Product from "../product/Product";
import "./plp.css";
export default class PLP extends Component {
  render() {
    const { category } = this.props;
    console.log("🚀 ~ file: PLP.jsx ~ line 7 ~ PLP ~ render ~ category", category)
    return (
      <main>
        <h2 className="category-title">{category.name}</h2>
        <section className="grid-container">
          {category.products.map((product) => {
            const gallery = product.gallery;
            const { name, id, inStock, brand, attributes, prices } = product;

            return (
              <Product
                key={id}
                {...{
                  name,
                  brand,
                  gallery,
                  inStock,
                  id,
                  prices,
                  attributes,
                }}
              />
            );
          })}
        </section>
      </main>
    );
  }
}
