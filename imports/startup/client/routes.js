import { FlowRouter } from 'meteor/kadira:flow-router';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import { mount } from 'react-mounter';

import App from '../../ui/App';
import SignIn from '../../ui/pages/SignIn';
import SignUp from '../../ui/pages/SignUp';
import UserProfile from '../../ui/pages/UserProfile';
import Chat from '../../ui/pages/Chat';

FlowRouter.route('/', {
    name: 'homepage',
    action() {
        if (!!Meteor.user())
            FlowRouter.go('/chat');
        else
            FlowRouter.go('/signin');
    }
});

FlowRouter.route('/signin', {
    name: 'signin',
    action() {
        if (!!Meteor.user())
            FlowRouter.go('/chat');

        mount(App, {
            mainContent: <SignIn />
        });
    }
});

FlowRouter.route('/signup', {
    name: 'signup',
    action() {
        if (!!Meteor.user())
            FlowRouter.go('/chat');

        mount(App, {
            mainContent: <SignUp />
        });
    }
});

FlowRouter.route('/signout', {
    name: 'signout',
    action() {
        Accounts.logout();
    }
});

FlowRouter.route('/profile', {
    name: 'profile',
    action() {
        if (!Meteor.user())
            FlowRouter.go('/signin');

        mount(App, {
            mainContent: <UserProfile />
        });
    }
});

FlowRouter.route('/chat', {
    name: 'chat',
    action() {
        if (!Meteor.user())
            FlowRouter.go('/signin');

        mount(App, {
            mainContent: <Chat />
        });
    }
});

Accounts.onLogin(() => {
    FlowRouter.go('/chat');
});

Accounts.onLogout(() => {
    FlowRouter.go('/signin');
});