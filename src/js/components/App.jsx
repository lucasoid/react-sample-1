import React from 'react';
import Chat from './Chat';
import Login from './Login';

export default class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }
    
    handleLogin(user) {
        var state = this.state;
        state.user = user;
        this.setState(state);
    }
    
    handleLogout() {
        var state = this.state;
        state.user = null;
        this.setState(state);
    }
    
    render() {
        if(this.state.user) {
            return (
                <Chat user={this.state.user} onLogout={() => this.handleLogout()} />
            );
        }
        else {
            return (
                <Login onLogin={(user) => this.handleLogin(user)} />
            );
        }
    }
}