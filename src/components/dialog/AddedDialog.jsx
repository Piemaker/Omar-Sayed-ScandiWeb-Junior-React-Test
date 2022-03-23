import React, { Component } from 'react'
import "./addedDialog.css"
export default class AddedDialog extends Component {
  constructor(props) {
    super(props);
    this.dialogRef = React.createRef();
    this.timer = null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    clearTimeout(this.timer);
    if (this.props.showDialog) {
     
      this.dialogRef.current.showModal();
     this.timer =  setTimeout(()=>{
          this.props.closeDialog();
          this.dialogRef.current.close()
      },500)

    }
}

  render() {
    return (
      <dialog  className = "dialog" ref={this.dialogRef}>
        <div className='dialog__container'>
        <p>Item added to cart</p>
        <div className="dialog__icon"></div>
        </div>
      </dialog>
    );
  }
}
