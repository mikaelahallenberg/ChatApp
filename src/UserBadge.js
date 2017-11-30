import React from 'react';

const userBadgeStyles = {
    container : {
        display: 'flex',
        alignItems: 'center',
        paddingLeft:'20px'
       
    },
    avatar : {
       height: '40px',
       width: '40px',
       backgroundColor: '#f47a42', 
       borderRadius: '20px',
      
    },
    name : {
        paddingLeft: '10px'
    },
    user : {
        height: '40px',
        width: '40px',
        backgroundColor: '#87dbc5', 
        borderRadius: '20px'
    }
}

const UserBadge = (props) => {
    return (
        <div>
            <div style={userBadgeStyles.container}>
                
                <div style={userBadgeStyles.avatar}>
                </div>
                <div  style={userBadgeStyles.name}>
                    {props.chatUser}
                </div>
            </div>
        </div>

    )

}
export default UserBadge;