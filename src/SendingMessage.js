
import React, { Component } from 'react';


export default class SendingMessage extends Component {


    handleChange(e) {
        this.setState({value: e.target.value})
      }

      clearValue(e) {
        
         this.props.onSend(this.state.value)
         this.setState({value: ''})
     }

constructor(props) {
    super(props)
    this.state = {
        value: ''
    }
}

render() {
    return(
        <div>
          <form action="#">
          <label>
            <input type="text" className="textarea" value={this.state.value} onChange={this.handleChange.bind(this)}/>
          </label>
        </form>
        <button className="send" onClick={this.clearValue.bind(this)}>Send</button> 
   </div>
    )
}
}