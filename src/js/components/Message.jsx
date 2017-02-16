import React from 'react';

export default class Message extends React.Component {
    
    render() {
        var date = new Date(this.props.timestamp);
        var addClass = this.props.me === true ? 'me' : 'not-me';
        return (
            <div className={'message ' + addClass}>
                <div className="user">{this.props.user}:</div>
                <div className="msg"><span>{this.props.msg == '' ? '...' : this.props.msg}</span></div>
                <div className="date">{date.toLocaleString()}</div>
            </div>
        );
    }
}