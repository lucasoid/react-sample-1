var React = require('react');

export default class Login extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {user: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        var state = this.state;
        state.user = event.target.value;
        this.setState(state);
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.onLogin(this.state.user);
    }
    
    render() {
        return (
            <div className="login">
                <form onSubmit={this.handleSubmit}>
                    <label>User name:</label>
                    <input type="text" value={this.state.user} onChange={this.handleChange} />
                    <button type="submit">Log in</button>
                </form>
            </div>
        );
    }
}