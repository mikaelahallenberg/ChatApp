import React, { Component } from 'react';

var moment = require('moment');


const messageStyles = {
    listStyle: 'none',
    me : {
        fontSize: '14px',
        listStyle: 'none',
        alignSelf: 'flex-end',
        marginRight: '30px',
        paddingTop: '15px'
        
    },
    user : {
        fontSize: '14px',
        listStyle: 'none',
        alignSelf: 'flex-start',
        marginLeft: '30px'
        
    },
    timeStamp : {
        fontSize: '10px',
        fontStyle: 'italic',
        color: 'grey',
        float: 'right',
        paddingBottom: '5px'
    }
}

export default class Message extends Component {
    add() {
        this.props.getMessages()
    }

    constructor(props) {
        super(props);
    }

    render() {
        debugger;
      var justnow = moment(justnow).toISOString();
     var now = moment(justnow).format('HH:mm')
        return (
            <div style={messageStyles.me}>
                <div>
                    <li style={messageStyles.me} key={this.props.sender}>{this.props.message}</li>
                    <br /><span style={messageStyles.timeStamp}>{now}</span>
                </div>
            </div>

                /*this.props.name != this.props.chatUser ? 
                <div style={messageStyles.me}> 
                    {this.props.message.map((message, key)=>{return <div><li style={messageStyles.me} key={key}>{message}</li> <br /><span style={messageStyles.timeStamp}>{now}</span></div>})}
                    </div> 
                    :
                <div style={messageStyles.user}> 
                    {this.props.message.map((message, key)=>{return <li key={key}>{message}</li>})}
                </div> */
               
               
        )
    }
}