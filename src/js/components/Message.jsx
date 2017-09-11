import React from 'react';

export default function Message(props) {
    var date = new Date(props.timestamp);
    var addClass = props.me === true ? 'me' : 'not-me';
    return (
        <div className={'message ' + addClass}>
            <div className="user">{props.user}:</div>
            <div className="msg"><span>{props.msg == '' ? '...' : props.msg}</span></div>
            <div className="date">{date.toLocaleString()}</div>
        </div>
    );
}