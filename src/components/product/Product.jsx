import React, { Component } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../../ProductContext";
import AddedDialog from "../dialog/AddedDialog";
import "./product.css";
export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
  }
  // FUNCTIONS
  handleClick = (e) => {
    e.preventDefault();
    const { setCart } = this.context;
    const { id, name, brand, prices, attributes, gallery } = this.props;
    // SELECT FIRST ATTRIBUTE AS DEFAULT
    const selectedAttributes = attributes.map((attr) => {
      const { id } = attr;
      return { [id]: attr.items[0].value };
    });
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
    this.setState({showDialog : true})
  };

  closeDialog = () => {
    this.setState({ showDialog: false });
  };

  // LIFE CYCLES
  render() {
    const { gallery, name, inStock, id, prices, attributes } = this.props;
    const { getPriceBasedOnCurrency } = this.context;
    const price = getPriceBasedOnCurrency(prices);
    const {
      currency: { symbol },
      amount,
    } = price;
   const {closeDialog} = this;
   const {showDialog} = this.state;
   const colorBoxes = attributes.map((attribute,index) => {
      if(attribute.type === "swatch"){
        return (
          <div
            key={`${attribute.type}-${index}`}
            className="color-box__container"
          >
            {attribute.items.map((item, index) => {
              return (
                <div
                  key={`${attribute.type}-${item.value}`}
                  className="color-box"
                  style={{ backgroundColor: item.value }}
                ></div>
              );
            })}
          </div>
        );
      }
   })
    return (
      <article
          className={`product__container ${
            inStock ? "" : "product__container--faded"
          }`}
        >
            <Link to={`/product/${id}`}>
          <div className="product__image__grid">
            <div
              className={`product__image__grid__icon-container ${
                inStock && "product__image__grid__icon-container--show"
              }`}
            >
              <div
                className={`product__image__grid__add-icon`}
                onClick={this.handleClick}
              ></div>
            </div>

            <div
              className={`${
                inStock
                  ? "product__image__overlay--hidden"
                  : "product__image__overlay"
              }`}
            >
              Out Of Stock
            </div>
            <div className="product__image__container">
              <img src={gallery[0]} alt={name} />
            </div>
          </div>
          <div className="product__text__container">
            <p className="product__text--muted">{name}</p>
            <p>
              {symbol}
              {amount}
            </p>
          </div>
          {colorBoxes}
      </Link>
      <AddedDialog showDialog={showDialog} closeDialog={closeDialog} />
        </article>
    );
  }
}

Product.contextType = ProductContext