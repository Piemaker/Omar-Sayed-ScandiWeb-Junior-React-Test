import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./gallery.css";

export default class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }
  // FUNCTIONS
  handleNext = () => {
    const { index } = this.state;
    const { gallery, id } = this.props;
    if (index < gallery.length - 1) {
      this.setState({ index: index + 1 });
    } else {
      this.setState({ index: 0 });
    }
  };
  handlePrev = () => {
    const { index } = this.state;
    const { gallery } = this.props;
    if (index > 1) {
      this.setState({ index: index - 1 });
    } else {
      this.setState({ index: gallery.length - 1 });
    }
  };
  // LIFE CYCLES
  render() {
    const { name, gallery, id } = this.props;
    const { index } = this.state;
    const isSinglePhoto = gallery.length <= 1;
    return (
      <div className="gallery">
        <Link to={`/product/${id}`}>
          <img className="gallery__img" src={gallery[index]} alt={name} />
        </Link>
        <div
          className={`gallery__buttons ${
            isSinglePhoto && "gallery__buttons--hide"
          }`}
        >
          <div
            className="gallery__buttons__left-chevron"
            onClick={this.handlePrev}
          >
            {" "}
          </div>
          <div
            className="gallery__buttons__right-chevron"
            onClick={this.handleNext}
          >
            {" "}
          </div>
        </div>
      </div>
    );
  }
}
