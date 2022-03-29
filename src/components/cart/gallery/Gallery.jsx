import React, { Component } from 'react'
import "./gallery.css"

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
    const {gallery} = this.props;
    if (index < gallery.length - 1) {
      this.setState({ index: index + 1 });
    } else {
      this.setState({ index: 0 });
    }
  };
  handlePrev = () => {
    const { index} = this.state;
    const { gallery } = this.props;
    if (index > 1) {
      this.setState({ index: index -1  });
    } else {
      this.setState({ index: (gallery.length - 1) });
    }
  };
  // LIFE CYCLES
  render() {
    const { name, gallery } = this.props;
    const {index} = this.state;
    return (
      <div className="gallery">
        <img className="gallery__img" src={gallery[index]} alt={name} />
        <div className="gallery__buttons">
          <div className="gallery__buttons__left-chevron"  onClick = {this.handlePrev}> </div>
          <div className="gallery__buttons__right-chevron" onClick = {this.handleNext}> </div>
        </div>
      </div>
    );
  }
}
