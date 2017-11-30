import React, { Component } from 'react';
import './main.css';
import NameSelect from './NameSelect.js';
import ChatRoom from './ChatRoom.js'
import Chats from './Chats.js'
import Messaging from './Messaging.js'
import SendingMessage from './SendingMessage.js';
import UserBadge from './UserBadge';
import customStyles from './NameSelect.js'
import io from 'socket.io-client'
import { USER_CONNECTED, LOGOUT } from './Events.js'

const socketUrl = "http://localhost:3231/"
const socket = io(socketUrl)

class Main extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      socket: null,
      users: [],
      user: null,
      value: "",
      name: "",
      modalIsOpen: true,
      chatModalIsOpen: false,
      chatroomModalIsOpen: false,
      chatUser: '',
      chatRoom: '',
      messages: []
    }

 this.getNameFromModal = this.getNameFromModal.bind(this)
 this.openModal = this.openModal.bind(this);
 this.closeModal = this.closeModal.bind(this);
 this.openChatModal = this.openChatModal.bind(this);
 this.openChatroomModal = this.openChatroomModal.bind(this);
 this.updateMessages = this.updateMessages.bind(this);
}


//TODO:
//nickin vaihdon jälkeen tyylit ei pysy viesteissä
componentWillMount() {
  this.initSocket()
}

//tänne sisään se kohta, jolloin nickin valitseminen loppuu (closemodal())
initSocket = () => {
  
  socket.on('connect', () => {
    console.log('connected main.js')
  })

  socket.on('update messages', this.updateMessages)

  this.setState({socket})
}

// Päivitä serveriltä tulleet viestit.
updateMessages(messageList) {
  console.log(messageList)
  let {messages} = this.state
  this.setState({messages: messageList})
}

joinChannel(channel) {
  socket.emit('join channel', channel)
  this.setState({chatRoom: channel})
}

closeModal(save, user) {
  if(save) {
    this.setState({modalIsOpen: false});  
    const { socket } = this.state
    socket.emit(USER_CONNECTED, user);
    this.setState({user})
} else {
    this.setState({modalIsOpen: false});
    }
 }

 logout = () => {
   const { socket } = this.state
   socket.emit(LOGOUT)
   this.setState({user: null})
 }
openModal() {
 this.setState({modalIsOpen: true});
}

whileChange(e) {
 this.setState({name: e.target.value})
} 
  
  handleChange(e) {
    this.setState({value: e.target.value})
  }

  getNameFromModal(name) {
    this.setState({name: name})
 }

handleModalClose(save, name) {
  let newState = {modalIsOpen: false}
    if (save) { 
      newState.name = name;
    }
  this.setState(newState)
  }

getMessages(newMessage) {
  
  //let {messages} = this.state
  //messages.push(newMessage)
  //this.setState({messages: messages})
  socket.emit('new message', newMessage, this.state.name)
}

openModal() {
 this.setState({modalIsOpen: true});
}

openChatModal() {

  this.setState({chatModalIsOpen: true});
}

openChatroomModal() {

  this.setState({chatroomModalIsOpen: true})
}

handleChatModalClose(save, chatUser) {
  
  let newState = {chatModalIsOpen: false}
  if (save) { 
    newState.chatUser = chatUser;
  }
  this.setState(newState)
}

//try to open a socket on handleChatroomModalClose 
handleChatroomModalClose(save, chatRoom) {
  socket.on('connection', function(socket) {
    let newState = {chatroomModalIsOpen: false}
    if (save) {
    socket.on('setUsername', function(data) {
      newState.chatRoom = chatRoom;
      if(this.state.users.indexOf(data) > -1) {
        this.state.users.push(data);
        socket.emit('userSet', {name: data});
      } else {
        socket.emit('userExists', data + ' username is taken! Try some other username.')
      }
      this.setState(newState)
    })
  }
  })
  
}

onMessageSend() {
  this.props.postMessage();
}

  render() {

    return (
      <div className="App">
        
        <NameSelect 
          isOpen={this.state.modalIsOpen}
          onPopupClosed={this.handleModalClose.bind(this)}
          contentLabel="Get username"
        />
        <div className="left">
          <div className="bio">
            <div className="name">
              {!this.state.name == '' ?
              <UserBadge
              chatUser={this.state.name} /> : null }
            </div>

            <div className='button-container'>
              <button className='button'  onClick={this.openModal} >Select new nickname</button>
              <NameSelect 
                isOpen={this.state.modalIsOpen}
                onPopupClosed={this.handleModalClose.bind(this)}
                contentLabel="Get username"
              />
                
              <div style={customStyles.chatButtons}>

                <div style={customStyles.chat}>
                  <button className='button' onClick={this.openChatroomModal}>Chatroom</button>
                  <ChatRoom 
                    isOpen={this.state.chatroomModalIsOpen}
                    onPopupClosed={this.handleChatroomModalClose.bind(this)}
                    contentLabel="Get chatroom"
                  />
                </div>


                  <div style={customStyles.chat}>
                  <button className='button' onClick={this.openChatModal}>Chat</button>
                  <Chats 
                  isOpen={this.state.chatModalIsOpen}
                  onPopupClosed={this.handleChatModalClose.bind(this)}
                  contentLabel="Get private chat"
                  />
                  </div>
                  </div>
                </div>
                {!this.state.chatUser == '' || !this.state.chatRoom == '' ?
              <div className='open-chats'> Open chats </div>: null }
            {!this.state.chatRoom == '' ? <div className='chat-children'> <div className='chatroom-indicator'></div>#{this.state.chatRoom}</div>: null }
            {!this.state.chatUser == '' ? <div className='chat-children'> <div className='chat-indicator'></div>{this.state.chatUser}</div> : null }
            </div>
                
        </div>
        <Messaging 
          messages={this.state.messages}
          name={this.state.name}
          chatUser={this.state.chatUser}
          chatRoom={this.state.chatRoom}
        />
        
        <div className="right">
          <div className="message">
          <SendingMessage onSend={this.getMessages.bind(this)}/>
          </div>
    </div>
    
          </div>
    );
  }
}


export default Main;