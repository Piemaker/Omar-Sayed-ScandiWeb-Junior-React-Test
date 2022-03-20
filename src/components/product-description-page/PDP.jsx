import React, { Component } from "react";
import { apolloClient } from "../../App";
import { GET_PRODUCT } from "../../GraphQl/Queries";
import ProductContext from "../../ProductContext";
import Loader from "../loader/Loader";
import ColorBox from "./ColorBox";
import "./pdp.css";
import TextBox from "./TextBox";
export default class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: "",
    };
  }
  // FUNCTIONS
  fetchProduct = async (productId) => {
    const { data, loading, error } = await apolloClient.query({
      query: GET_PRODUCT,
      variables: { productId },
    });
    console.log(
      "🚀 ~ file: PDP.jsx ~ line 20 ~ PDP ~ fetchProduct= ~ data",
      data
    );

    this.setState({ data, loading, error });
  };
  // LIFE CYCLES
  componentDidMount() {
    const { id } = this.props;
    this.fetchProduct(id);
  }
  // TODO carousel for gallery items, store selected item attribute in context for cart usage
  render() {
    const { data, loading, error } = this.state;
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <h1>{error}</h1>;
    }
    if (data.length !== 0) {
      const {currency: { symbol }} = this.context;
      const { attributes, brand, description, gallery, name, prices } =
        data.product;
        const price = prices.find(price => price.currency.symbol === symbol);
      return (
        <article className="product-grid-container">
          <div className="product__gallery-container">
            {gallery.map((photo, index) => {
              return <img key={index} src={photo} />;
            })}
          </div>
          <div className="product__selected-photo-container">
            <img
              className="product__selected-photo-container-img"
              src={gallery[0]}
              alt={name}
            />
          </div>
          <div className="product__details-container">
            <div className="product__details-container__title">
              <h2>{brand}</h2>
              <p>{name}</p>
            </div>
            <div className="product__details-container__attributes">
              {attributes.map((attribute) => {
                return (
                  <div key={attribute.id}>
                    <h3>{attribute.name}:</h3>
                    <div className="product__details-container__attributes-container">
                      {attribute.items.map((item) => {
                        if (attribute.type === "swatch") {
                          return <ColorBox key={item.id} color={item.value} />;
                        }
                        return <TextBox key={item.id} text={item.value} />;
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="product__details-container__price">
              <h3>price:</h3>
              <p>
                {price.currency.symbol}
                {price.amount}
              </p>
            </div>
            <div className="product__details-container__call-to-action">
              <button>add to cart</button>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html : description} }
              className="product__details-container__description"
            ></div>
          </div>
        </article>
      );
    }
  }
}
PDP.contextType = ProductContext;
