import React from 'react';

export default class Message extends React.Component {
    
    render() {
        var date = new Date(this.props.timestamp);        
        return (
            <div className={'message ' + this.props.me}>
                <div className="user">{this.props.user}:</div>
                <div className="msg"><span>{this.props.msg == '' ? '...' : this.props.msg}</span></div>
                <div className="date">{date.toLocaleString()}</div>
            </div>
        );
    }
}