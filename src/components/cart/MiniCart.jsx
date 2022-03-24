import React, { Component } from 'react'
import Counter from './Counter';
import Gallery from './Gallery';
import "./miniCart.css"
import ProductDescription from './ProductDescription'
export default class MiniCart extends Component {
  render() {
    return (
        <article className='mini-cart'>
            <h2 className='mini-cart__header'>
                <span>my bag</span>, 2 items
            </h2>
      <div className="mini-cart__container">
        <ProductDescription />
        <div className = "mini-cart__gallery">
            <Counter/>
       <Gallery/>
        </div>
     
      </div>

        </article>
    );
  }
}
