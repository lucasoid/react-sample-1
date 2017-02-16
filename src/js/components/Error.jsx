var React = require('react');

export default class Error extends React.Component {
    render() {
        return (
            <div className="error">
                <h2>Network error!</h2>
                <span className="msg">
                    {this.props.error}
                </span>
            </div>
        );
    }
}