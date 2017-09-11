import React from 'react';

export default class Logout extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event) {
        event.preventDefault();
        if(typeof this.props.onLogout === 'function') {
            this.props.onLogout();
        }
    }
    
    render() {
        return (
            <div className="logout">
                <a href="#" onClick={this.handleClick}>Log out and clear history</a>
            </div>
            
        );
    }
}