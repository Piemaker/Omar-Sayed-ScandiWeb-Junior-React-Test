import React, { Component } from 'react'
import "./nav.css";
export default class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <div className="nav__category-items">
          <ul>
            <li>women</li>
            <li>men</li>
            <li>kids</li>
          </ul>
        </div>
        <div className="nav__logo__container">
          <div></div>
        </div>
        <div className="nav__purchase-section">
            <div className="nav__purchase-section__currency">
            <p>$</p>
            <div className="nav__purchase-section__currency__chevron">
                </div>
                </div>
            <div className='nav__purchase-section__cart'></div>
            </div>
      </nav>
    );
  }
}
