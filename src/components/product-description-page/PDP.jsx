import React, { Component } from "react";
import { apolloClient } from "../../App";
import { GET_PRODUCT } from "../../GraphQl/Queries";
import ProductContext from "../../ProductContext";
import AddedDialog from "../dialog/AddedDialog";
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
      imgSrc: "",
      selectedAttributes: [],
      showDialog: false,
    };
  }
  // FUNCTIONS
  fetchProduct = async (productId) => {
    const { data, loading, error } = await apolloClient.query({
      query: GET_PRODUCT,
      variables: { productId },
      fetchPolicy: "no-cache",
    });
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
    if (e.target.checked) {
      const { name, value } = e.target;
      const { selectedAttributes } = this.state;
      const changedAttributes = selectedAttributes.filter(
        (attr) => !attr.hasOwnProperty(name)
      );
      changedAttributes.push({ [name]: value });
      this.setState({ selectedAttributes: changedAttributes });
    }
  };
  handleSubmit = (e) => {
    const { setCart } = this.context;
    e.preventDefault();
    const { selectedAttributes, data } = this.state;
    const { id, name, brand, prices, attributes, gallery } = data.product;
    setCart({
      id,
      name,
      brand,
      prices,
      attributes,
      gallery,
      selectedAttributes,
      quantity: 1,
    });
    this.setState({ showDialog: true });
  };
  closeDialog = () => {
    this.setState({ showDialog: false });
  };
  // LIFE CYCLES
  componentDidMount() {
    const { id } = this.props;
    this.fetchProduct(id);
  }
  render() {
    const { data, loading, error, showDialog } = this.state;
    const { closeDialog } = this;
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <h1>{error}</h1>;
    }
    if (data.length !== 0) {
      const { getPriceBasedOnCurrency } = this.context;
      const { attributes, brand, description, gallery, name, prices, inStock } =
        data.product;
      const price = getPriceBasedOnCurrency(prices);
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
              className="product__selected-photo-container-img"
              src={this.state.imgSrc}
              alt={name}
            />
          </div>
          <form
            method="dialog"
            onSubmit={this.handleSubmit}
            className="product__details-container"
          >
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
                        console.log(item,item.value)
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
              {inStock ? (
                <button type="submit">add to cart</button>
              ) : (
                <button disabled type="submit">
                  unavailable
                </button>
              )}
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className="product__details-container__description"
            ></div>
            <AddedDialog showDialog={showDialog} closeDialog={closeDialog} />
          </form>
        </article>
      );
    }
  }
}
PDP.contextType = ProductContext;
