import React from 'react';


export default class NewMessage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {msg:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        var state = this.state;
        state.msg = event.target.value;
        this.setState(state);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.msg);
        var state = this.state;
        state.msg = '';
        this.setState(state);
    }
    
    render() {
        return (
            <div className='new-message'>
                <div className="user">{this.props.user}:</div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="msg">
                                <input type="text" value={this.state.msg} onChange={this.handleChange} />
                        </div>
                        <div className="action">
                            <button type="submit">Send</button>
                        </div>
                    </form>
            </div>
        );
    }
}