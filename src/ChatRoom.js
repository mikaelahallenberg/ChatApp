import React from 'react';
import Modal from 'react-modal';
 
export const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    transform             : 'translate(-50%, -50%)',
    padding               : '40pt',
    
  },
  title : {
    marginTop: '15pt',
    paddingBottom: '30pt',
   
  },
  
  input : {
      width: '100%',
      height: '20pt',   
      fontSize: '10pt',
      paddingLeft: '10pt'
  },
  buttonContainer : {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '30pt'
  }, 
  button : {
      margin: '15pt',
      backgroundColor: 'white',
      borderStyle: 'none',
      fontSize: '14pt'
  },
  button : {
    margin: '15pt',
    backgroundColor: 'white',
    borderStyle: 'none',
    fontSize: '14pt',

    save  : {
      backgroundColor: '#4788ef',
      color: '#ffffff',
      margin: '15pt',
      borderRadius: '3pt',
      borderStyle: 'none',
      fontSize: '12pt',
      paddingTop: '5pt',
      fontSize: '12pt',
      paddingBottom: '5pt',
      paddingLeft: '10pt',
      paddingRight: '10pt',
    },
    cancel : {
      backgroundColor: '#d0daea',
      color: '#ffffff',
      margin: '15pt',
      borderRadius: '3pt',
      borderStyle: 'none',
      paddingTop: '5pt',
      fontSize: '12pt',
      paddingBottom: '5pt',
      paddingLeft: '10pt',
      paddingRight: '10pt',
    }
}
};

export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      chatRoom: "",
    };
  }

  closeModal(save, e) {
      e.preventDefault()
      this.props.onPopupClosed(save, this.state.chatRoom) 
    }


  render() {
    
    return (
      <Modal
          isOpen={this.props.isOpen}
          onRequestClose={this.props.onPopupClosed.bind(false, "")}
          style={customStyles}
          contentLabel={this.props.contentLabel}
      >
          <div style={customStyles.title}>Choose a chatroom</div>
          <form action="#">
            <input type="text" value={this.state.chatRoom} placeholder="" style={customStyles.input} onChange={(e) => this.setState({chatRoom: e.target.value})} />
            <div style={customStyles.buttonContainer}>
            <button style={customStyles.button.cancel} onClick={this.closeModal.bind(this, false)}>Close</button>
            <button style={customStyles.button.save}  onClick={this.closeModal.bind(this, true)}>Save</button>
            </div>
          </form>
       
      </Modal>
    );
  }
}