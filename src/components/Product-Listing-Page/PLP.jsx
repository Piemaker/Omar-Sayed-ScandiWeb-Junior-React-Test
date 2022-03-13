import React, { Component } from "react";
import { GET_CATEGORIES_NAME, GET_PRODUCTS } from "../../GraphQl/Queries";
import {client} from "../../App"
import Product from "../product/Product";
import "./plp.css"
export default class PLP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: false,
    };
  }
  fetchCategory = async () => {
    const { data, loading, error } = await client.query({
      query: GET_CATEGORIES_NAME,
    });
    // console.log("🚀 ~ file: PLP.jsx ~ line 18 ~ PLP ~ fetchCategory= ~ data, loading, error", data, loading, error)
    this.setState({ data, loading, error });
  };
  fetchProducts = async (productCategory) =>{
      const { data, loading, error } = await client.query({
        query: GET_PRODUCTS,
      });
      console.log("🚀 ~ file: PLP.jsx ~ line 25 ~ PLP ~ fetchProducts= ~ data, loading, error", data, loading, error)
      this.setState({ data, loading, error });
  }

  componentDidMount() {
    this.fetchProducts();

  }
  render() {
    const { loading, error, data } = this.state;
    if (loading) {
      return (<h1>Loading...</h1>)
    }
    if (error) {
      return (<h1>{error}</h1>)
    }
    if (data) {
      return (
        <main>
          <h2 className="category-title">{data.category.name}</h2>
          <section className="grid-container">
            {data.category.products.map((product) => {
              // TODO change prices according to user selection
              const price = product.prices[0];
              const {
                amount,
                currency: { symbol },
              } = price;
              const gallery = product.gallery[0];
              const { name, id, inStock } = product;
              // TODO add out of stock overlay based on quantity

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

}