import React, { Component } from "react";
import "./nav.css";
import "./CurrencyDropDown";
import CurrencyDropDown from "./CurrencyDropDown";
import { GET_CATEGORIES_AND_CURRENCIES } from "../../GraphQl/Queries";
import { apolloClient } from "../../App";
import ProductContext from "../../ProductContext";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";
import MiniCart from "../cart/minicart/minicart/MiniCart";
import { NavLink } from "react-router-dom";
export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "all",
      data: [],
      loading: true,
      error: "",
    };
  }
  // FUNCTIONS
  fetchCategoriesAndCurrencies = async () => {
    const { data, loading, error } = await apolloClient.query({
      query: GET_CATEGORIES_AND_CURRENCIES,
    });

    this.setState({ data, loading, error });
  };
  handleClick = (e) => {
    const clicked = e.target.value;
    this.setState({ clicked });
    this.context.setCategory(clicked);
  };

  // LIFE CYCLES
  componentDidMount() {
    this.fetchCategoriesAndCurrencies();
  }
  render() {
    const { data, error, loading } = this.state;
    const {
      setCurrency,
      currency: { symbol },
    } = this.context;
    if (loading) {
      return <Loader />;
    }
    if (error) {
      return <h1>{error}</h1>;
    }
    if (data.length !== 0) {
      const { clicked } = this.state;
      const { categories, currencies } = data;
      const { toggleCart, getCartItemCount, isCartOpen } = this.context;

      return (
        <nav className="nav">
          <div className="nav__category-items">
            <ul>
              {categories.map((category, index) => {
                return (
                  <NavLink to="/" key = {`nav-link-${category.name}`}>
                    <button
                      className={`${
                        clicked === category.name
                          ? "nav__category-items--clicked"
                          : ""
                      }`}
                      value={category.name}
                      onClick={this.handleClick}
                    >
                      {category.name}
                    </button>
                  </NavLink>
                );
              })}
            </ul>
          </div>
          <Link to="/">
            <div className="nav__logo__container">
              <div></div>
            </div>
          </Link>
          <div className="nav__purchase-section">
            <MiniCart {...isCartOpen} />
            <div className="nav__purchase-section__currency">
              <p>{symbol}</p>
              <CurrencyDropDown {...{ currencies, setCurrency }} />
              <div className="nav__purchase-section__currency__chevron"></div>
            </div>
            <div className="nav__purchase-section__cart__container">
              <div
                className="nav__purchase-section__cart__icon"
                onClick={toggleCart}
              ></div>
              <div className="nav__purchase-section__cart__badge">
                {getCartItemCount()}
              </div>
            </div>
          </div>
        </nav>
      );
    }
  }
}

Nav.contextType = ProductContext;
