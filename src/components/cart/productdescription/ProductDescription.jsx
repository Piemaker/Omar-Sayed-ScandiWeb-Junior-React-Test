import React, { Component } from "react";
import ProductContext from "../../../ProductContext";
import "./productDescription.css";
export default class ProductDescription extends Component {
  render() {
    const {
      brand,
      name,
      symbol,
      amount,
      attributes,
      selectedAttributes,
      boldFont = false,
    } = this.props;

    return (
      <div className="description">
        <h2
          className={`description__header ${
            boldFont && "description__header__brand"
          }`}
        >
          {brand}
        </h2>
        <h2 className="description__header">{name}</h2>
        <p className="description__currency">
          {symbol}
          {amount}
        </p>
        {attributes.map((attribute, index) => {
          return (
            <div
              key={attribute.id}
              className="description__outer-attributes__container"
            >
              <h2 className="description__outer-attributes__container__heading">
                {attribute.name}
              </h2>

              <div className="description__attributes-container">
                {attribute.items.map((item) => {
                  if (attribute.id === "Color") {
                    if (
                      item.value === selectedAttributes[index][attribute.id]
                    ) {
                      return (
                        <div
                          key={`${attribute.id}-${item.value}`}
                          className="description__attributes description__attributes__color description__attributes__color--selected"
                          style={{ backgroundColor: `${item.value}` }}
                        ></div>
                      );
                    } else {
                      return (
                        <div
                          key={`${attribute.id}-${item.value}`}
                          className="description__attributes description__attributes__color"
                          style={{ backgroundColor: `${item.value}` }}
                        ></div>
                      );
                    }
                  }
                  if (item.value === selectedAttributes[index][attribute.id]) {
                    return (
                      <div
                        key={`${attribute.id}-${item.value}`}
                        className="description__attributes description__attributes--selected"
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={`${attribute.id}-${item.value}`}
                        className="description__attributes"
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
ProductDescription.contextType = ProductContext;
