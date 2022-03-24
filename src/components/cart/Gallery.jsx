import React, { Component } from 'react'
import "./gallery.css"

export default class Gallery extends Component {
    constructor(props){
        super(props)
        this.state = {
            img : "",
        }
    }
  render() {
    return (
      <div className="gallery">
        <img
          className="gallery__img"
          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          alt=""
        />
        <div className="gallery__buttons">
          <div className="gallery__buttons__left-chevron"> X </div>
          <div className="gallery__buttons__right-chevron"> X </div>
        </div>
      </div>
    );
  }
}
