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
    this.imgRef = React.createRef();
    this.state = {
      data: [],
      loading: true,
      error: "",
      imgSrc: "",
      selectedAttributes: [],
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
    const {
      product: { gallery },
    } = data;
    this.setState({ data, loading, error });
    this.setState({ imgSrc: gallery[0] });
  };
  handleClick = (e) => {
    this.setState({ imgSrc: e.target.src });
  };
  handleChecked = (e) => {
    if(e.target.checked){
      const { name, value } = e.target;
      const { selectedAttributes } = this.state;
      const changedAttributes = selectedAttributes.filter(
        (attr) => !attr.hasOwnProperty(name)
      );
      changedAttributes.push({[name] : value})
      this.setState({ selectedAttributes: changedAttributes });
    }
  };
  // LIFE CYCLES
  componentDidMount() {
    const { id } = this.props;
    this.fetchProduct(id);
  }
  // TODO store selected item attribute in context for cart usage, add default state value for no selection
  render() {
    const { data, loading, error } = this.state;
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <h1>{error}</h1>;
    }
    if (data.length !== 0) {
      const {
        currency: { symbol },
      } = this.context;
      const { attributes, brand, description, gallery, name, prices } =
        data.product;
      const price = prices.find((price) => price.currency.symbol === symbol);
      return (
        <article className="product-grid-container">
          <div className="product__gallery-container">
            {gallery.map((photo, index) => {
              return (
                <img
                  key={index}
                  src={photo}
                  alt={brand}
                  onClick={this.handleClick}
                />
              );
            })}
          </div>
          <div className="product__selected-photo-container">
            <img
              ref={this.imgRef}
              className="product__selected-photo-container-img"
              src={this.state.imgSrc}
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
                          return (
                            <ColorBox
                              key={item.id}
                              color={item.value}
                              name={attribute.name}
                              handleChecked={this.handleChecked}
                            />
                          );
                        }
                        return (
                          <TextBox
                            key={item.id}
                            text={item.value}
                            name={attribute.name}
                            handleChecked={this.handleChecked}
                          />
                        );
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
              dangerouslySetInnerHTML={{ __html: description }}
              className="product__details-container__description"
            ></div>
          </div>
        </article>
      );
    }
  }
}
PDP.contextType = ProductContext;
