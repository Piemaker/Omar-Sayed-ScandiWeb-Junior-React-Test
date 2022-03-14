import React, { Component } from 'react'
import "./nav.css";
import "./CurrencyDropDown"
import CurrencyDropDown from './CurrencyDropDown';
export default class Nav extends Component {
  constructor(props){
    super(props)
    this.state = {
      clicked : "all"
    }
  }
  handleClick = (e) => {
    const clicked = e.target.value;
    this.setState({clicked});
    this.props.setCategory(clicked);
  };
  render() {
    const { categories, currencies, setCurrency, symbol} = this.props;
    const {clicked} = this.state;
    // TODO use currencies in currency overlay

    return (
      <nav className="nav">
        <div className="nav__category-items">
          <ul>
            {categories.map((category, index) => {
              return (
                <button
                  className={`${
                    clicked === category.name
                      ? "nav__category-items--clicked"
                      : ""
                  }`}
                  key={`${index}${category.name}`}
                  value={category.name}
                  onClick={this.handleClick}
                >
                  {category.name}
                </button>
              );
            })}
          </ul>
        </div>
        <div className="nav__logo__container">
          <div></div>
        </div>
        <div className="nav__purchase-section">
          <div className="nav__purchase-section__currency">
            <p>{symbol}</p>
            <CurrencyDropDown {...{ currencies, setCurrency }} />
            <div className="nav__purchase-section__currency__chevron"></div>
          </div>
          <div className="nav__purchase-section__cart"></div>
        </div>
      </nav>
    );
  }
}
