import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class Textarea extends Component {

    handleKeyPress(e) {
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        if (e.keyCode === 13 && Meteor.userId() && !e.shiftKey && text) {
            e.preventDefault();

            Meteor.call('messages.insert', text);

            ReactDOM.findDOMNode(this.refs.textInput).value = '';
        }
    }

    render() {
        return (
            <div className="chat-message-form">
                 <div className="form-group">
                     <textarea onKeyUp={this.handleKeyPress.bind(this)} className="form-control message-input"
                               ref="textInput" placeholder="Enter message text" style={{margin: 0}} />
                 </div>
            </div>
        );
    }
}