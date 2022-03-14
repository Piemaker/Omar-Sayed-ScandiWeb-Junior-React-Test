import React, { Component } from 'react'
import "./nav.css"
export default class CurrencyDropDown extends Component {
  render() {
      const {currencies, setCurrency} = this.props;
    return (
      <ul className="nav__purchase-section__currency__dropdown">
          {currencies.map(currency =>{
              const {label,symbol} = currency;
              return (
                  <li key = {`${label}${symbol}}`} onClick = {() =>setCurrency({symbol, label})}>{symbol} {label}</li>
              )
          })}
      </ul>
    );
  }
}
