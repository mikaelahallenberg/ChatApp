import React, { Component } from 'react';
import Message from './Message.js';
import UserBadge from './UserBadge.js';


export const messagingStyles = {
    container : {
    display:    'flex',
    flexGrow:   '1',
    flexDirection: 'column',
    width:      '75%',
    marginTop:  '5%'
    },

    avatar : { 
    height: '40pt',
    width: '40pt',
    backgroundColor: 'black',
    border: 'solid 1pt',
    borderColor: 'grey',
    borderRadius: '30pt',
    },

    user : {
        position: 'relative',
        marginLeft: '15pt',
        marginTop: '15pt',
        fontSize: '12pt'
    },

  };


export default class Messaging extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state={
            value: "",
        }
    }

    handleChange(e) {
        this.setState({value: e.target.value})
      }
    
    render() {
        
        const messages = this.props.messages.forEach((message) => {
            console.log("Creating message: ");
            console.log(message);
            <Message 
                style={messagingStyles.yourContainer}
                onSend={this.props.getMessage}
                message={message['message']}
                name={this.props.name}
                chatUser={message['sender']}
            />
        })

        return(
                      
                <div style={messagingStyles.container}> { 
                    this.props.chatUser != '' 
                    && (this.props.chatUser != this.props.name) 
                        ? <UserBadge chatUser={this.props.chatUser}/> 
                        : null 
                }
                {
                    messages
                }
                

               
                </div>
           
        )
    }
}
