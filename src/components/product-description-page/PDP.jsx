import React, { Component } from 'react'
export default class PDP extends Component {
    componentDidMount(){
        const {id} = this.props;
        console.log("🚀 ~ file: PDP.jsx ~ line 5 ~ PDP ~ componentDidMount ~ id", id)
        
    }
  render() {
    return (
      <div>PDP</div>
    )
  }
}
