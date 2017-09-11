import React from 'react';


export default class NewMessage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            msg: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        if(event && event.target && typeof event.target.value !== 'undefined') {
            this.setState({msg: event.target.value});    
        }
    }
    
    handleSubmit(event) {
        event.preventDefault();
        if(typeof this.props.onSubmit === 'function') {
            this.props.onSubmit(this.state.msg);
        }
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