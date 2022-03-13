import React, { Component } from "react";
import { GET_CATEGORIES_NAME, GET_PRODUCTS } from "../../GraphQl/Queries";
import {client} from "../../App"
import Product from "../product/Product";
import "./plp.css"
export default class PLP extends Component {

  render() {
      const {category} = this.props;
      return (
        <main>
          <h2 className="category-title">{category.name}</h2>
          <section className="grid-container">
            {category.products.map((product) => {
              // TODO change prices according to user selection
              const price = product.prices[0];
              const {
                amount,
                currency: { symbol },
              } = price;
              const gallery = product.gallery[0];
              const { name, id, inStock } = product;

              return (
                <Product
                  key={id}
                  {...{ name, amount, symbol, gallery, inStock }}
                />
              );
            })}
          </section>
        </main>
      );
  

}   

}