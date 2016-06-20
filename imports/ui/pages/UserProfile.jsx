import React, { Component, PropTypes } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

export default class UserProfile extends Component {

    onSubmit(e) {
        e.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const email = ReactDOM.findDOMNode(this.refs.emailInput).value.trim();
        const password = ReactDOM.findDOMNode(this.refs.passwordInput).value.trim();
        const location = ReactDOM.findDOMNode(this.refs.locationInput).value.trim();

        let user = this.props.user;

        if (name.length && name != user.profile.name) {
            Meteor.users.update(user._id, {$set: {"profile.name": name}});
        }

        let oldEmail = user.emails[0].address;
        if (email.length && email != oldEmail) {
            Meteor.call("updateUserEmail", email, this.onResult);
        }

        if (password.length) {
            Meteor.call("updateUserPassword", password);
        }

        if (location != this.props.user.profile.location) {
            Meteor.users.update(user._id, {$set: {"profile.location": location}});
        }
    }

    onResult(error) {
        error && error.reason && alert(error.reason);
    }

    render() {
        return (
            <div className="userProfileContainer">
                { this.props.user ?
                <form className="form-userprofile" onSubmit={ this.onSubmit.bind(this) }>
                    <div className="profileIcon" title="Profile" />

                    <label htmlFor="nameInput" className="sr-only">Email address</label>
                    <input ref="nameInput" id="nameInput" type="text" className="form-control" placeholder="Your name"
                           required="required" minLength="3" maxLength="25" defaultValue={ this.props.user.profile.name } />

                    <label htmlFor="emailInput" className="sr-only">Email address</label>
                    <input ref="emailInput" id="emailInput" type="email" className="form-control" placeholder="Email address"
                           required="required" minLength="5" maxLength="100" defaultValue={ this.props.user.emails[0].address } />

                    <label htmlFor="passwordInput" className="sr-only">Password</label>
                    <input ref="passwordInput" id="passwordInput" type="password" className="form-control" placeholder="Password"
                           minLength="6" maxLength="30" />

                    <select ref="locationInput" className="form-control" defaultValue={ this.props.user.profile.location }>
                        <option value="0">Kyiv</option>
                        <option value="1">Lviv</option>
                        <option value="2">Ternopil</option>
                    </select>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Update</button>

                    <div className="formCrossLink pull-right">
                        <a href="/chat">Back</a>
                    </div>
                </form>
                : '' }
            </div>
        );
    }
}

UserProfile.propTypes = {

};

export default createContainer(() => {

    return {
        user: Meteor.users.findOne({ _id: Meteor.userId() }),
    };
}, UserProfile);