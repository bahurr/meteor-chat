import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from './../../api/messages.js';
import { UsersData } from './../../api/users.js';

import ChatMessage from './../components/chat/ChatMessage';
import Textarea from './../components/chat/Textarea';

export default class Chat extends Component {

    renderChatMessages() {
        return this.props.messages.map((message) => {
            let user = UsersData.findOne({ _id: message.userId });
            return user
                ? <ChatMessage key={message._id} message={message} userName={user.profile.name} />
                : '';
        });
    }

    render() {
        return (
            <div className="ibox chat-view">
                { this.props.user ?
                <div className="ibox-content">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="chat-discussion">
                                <div className="messages-wrapper">
                                     {this.renderChatMessages()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12">
                            <Textarea />
                        </div>
                    </div>

                </div>
                : '' }
            </div>
        );
    }
}

Chat.propTypes = {
    messages: PropTypes.array,
};

export default createContainer(() => {
    Meteor.subscribe('messages');
    Meteor.subscribe('usersData');

    let user = Meteor.users.findOne({ _id: Meteor.userId() });

    return {
        user,
        messages: Messages.find().fetch()
    };
}, Chat);