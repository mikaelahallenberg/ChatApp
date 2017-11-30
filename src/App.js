import React, { Component } from 'react';
import Main from './Main.js'
import io from 'socket.io-client';

const socketUrl = "http://localhost:3231/"


class App extends Component {

  componentWillMount() {
    this.initSocket()
  }
  
  initSocket = () => {
    const socket = io(socketUrl)
    socket.on('connect', () => {
      console.log('connected')
    })
    
    this.setState({socket})
  }


  render() {
    return ( 
      <Main />       
    );
  }
}


export default App;
