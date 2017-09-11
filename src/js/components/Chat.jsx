import React from 'react';
import axios from 'axios';
import Logout from './Logout';
import Message from './Message';
import NewMessage from './NewMessage';

export default class Chat extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            user: props.user,
            error: '',
            loop: true
        };
        this.timeout;
        this.historyLoop();
    }
    
    historyLoop() {
        var _self = this;
        (function history() {
            //this check is necessary so that the state does not get set on an unmounted component.
            if(_self.state.loop) {
                axios.get('api/chat', {params: {limit:25}}).then(function (response) {
                    _self.setState({history: response.data});
                    _self.timeout = setTimeout(history, 2000);
                })
                .catch(function (error) {
                    _self.setState({error: 'Network connection lost -- messages could not be retrieved'});
                });
            }
            
        })();
    }
    
    componentWillUnmount() {
        clearTimeout(this.timeout);
        this.setState({loop: null});
    }
    
    submitMessage(msg) {
        var history = this.state.history.slice();
        axios.post('api/chat', {user:this.state.user, msg: msg, timestamp:Date.now()}).then(function (response) {
            history.unshift(response.data);
            this.setState({history: history});
        }.bind(this))
        .catch(function (error) {
            this.setState({error: 'Network connection lost -- message not sent'});
        }.bind(this));
    }
    
    render() {
        return (
            <div className="chat">
                <Logout onLogout={this.props.onLogout} />
                <NewMessage user={this.state.user} msg="" onSubmit={(input) => this.submitMessage(input) } />
                <div className="thread">
                    {this.state.history.map(function(msg, index) {
                        return <Message msg={msg.msg} user={msg.user} key={msg.id} me={msg.user == this.state.user ? true : false} timestamp={msg.timestamp} />
                    }.bind(this))}
                    {this.state.error ? <Error error={this.state.error} /> : null}
                </div>
                
            </div>
        );
    }
}