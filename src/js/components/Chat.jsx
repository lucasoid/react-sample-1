import React from 'react';
import axios from 'axios';
import Logout from './Logout';
import Message from './Message';
import NewMessage from './NewMessage';

export default class Chat extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            history:[],
            i:3,
            user:props.user,
            error: '',
            loop: true
        };
        this.historyLoop();
    }
    
    historyLoop() {
        var _self = this;
        var state = this.state;
        
        (function history() {
            //this check is necessary so that the state does not get set on an unmounted component.
            if(_self.state.loop) {
                axios.get('api/chat', {params: {limit:25}}).then(function (response) {
                    state.history = response.data;
                    _self.setState(state);
                    setTimeout(history, 2000);
                })
                .catch(function (error) {
                    state.error = 'Network connection lost -- messages could not be retrieved';
                    _self.setState(state);
                });
            }
            
        })();
    }
    
    componentWillUnmount() {
        var state = this.state;
        state.loop = null;
        this.setState(state);
    }
    
    submitMessage(msg) {
        var _self = this;
        var state = this.state;        
        axios.post('api/chat', {user:this.state.user, msg: msg, timestamp:Date.now()}).then(function (response) {
            state.history.unshift(response.data);
            _self.setState(state);
        })
        .catch(function (error) {
            state.error = 'Network connection lost -- message not sent';
            _self.setState(state);
        });
    }
    
    render() {
        var _self = this;
        var error = this.state.error != '' ? <Error errr={this.state.error} /> : '';
        return (
            <div className="chat">
                <Logout onLogout={this.props.onLogout} />
                <NewMessage user={this.state.user} msg="" onSubmit={(input) => this.submitMessage(input) } />
                <div className="thread">
                    {this.state.history.map(function(msg, index) {
                        return <Message msg={msg.msg} user={msg.user} key={msg.id} me={msg.user == _self.state.user ? true : false} timestamp={msg.timestamp} />
                    })}
                    {error}
                </div>
                
            </div>
        );
    }
}