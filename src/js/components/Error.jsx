var React = require('react');

export default function Error(props) {
   return (
        <div className="error">
            <h2>Network error!</h2>
            <span className="msg">
                {props.error}
            </span>
        </div>
    );
}