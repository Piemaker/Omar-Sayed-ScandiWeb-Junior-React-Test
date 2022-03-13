import React, { Component } from 'react'
import "./nav.css";
export default class Nav extends Component {
  render() {
      const { categories, currencies, setCategory } = this.props;
      // TODO use currencies in currency overlay
    return (
      <nav className="nav">
        <div className="nav__category-items">
          <ul>
            {categories.map((category,index) =>{
                return(
                    <button key = {`${index}${category.name}`} value = {category.name} onClick = {function(e){setCategory(e.target.value)}}>{category.name}</button>
                )
            })}
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
