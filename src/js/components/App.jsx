import React from 'react';
import axios from 'axios';
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
        this.setState({user: user});
    }
    
    handleLogout() {
        this.setState({user: null});
        axios.post('api/clear');
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