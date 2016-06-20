import React, { Component, PropTypes } from 'react';

export default class ChatMessage extends Component {

    timeFromNow() {
        return moment(this.props.message.createdAt).fromNow();
    }

    render() {
        let msgFloatClass = Meteor.userId() === this.props.message.userId ? 'right' : 'left';

        return (
            <div className={'chat-message ' + msgFloatClass}>
                <div className="message">
                    <span className="message-author" href="#">{ this.props.userName }</span>
                    <span className="message-date">{ this.timeFromNow() }</span>
                    <span className="message-content">{ this.props.message.text }</span>
                </div>
            </div>
        );
    }
}

ChatMessage.propTypes = {
    message: PropTypes.object.isRequired,
    userName: PropTypes.string.isRequired,
};