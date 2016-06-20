import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

export default class SignIn extends Component {

    onSubmit(e) {
        e.preventDefault();

        const email = ReactDOM.findDOMNode(this.refs.emailInput).value.trim();
        const password = ReactDOM.findDOMNode(this.refs.passwordInput).value.trim();

        if (email.length >= 5 && email.length <= 100 && password.length >= 6 && password.length <= 30) {
            Meteor.loginWithPassword(email, password, this.onResult);
        }
    }

    onResult(error) {
        error && error.reason && alert(error.reason);
    }

    render() {
        return (
            <div className="signInContainer">
                <form className="form-signin" onSubmit={ this.onSubmit.bind(this) }>
                    <div className="chatIcon" title="Sign in" />

                    <label htmlFor="emailInput" className="sr-only">Email address</label>
                    <input ref="emailInput" id="emailInput" type="email" className="form-control" placeholder="Email address" required="required" minLength="5" maxLength="100" />

                    <label htmlFor="passwordInput" className="sr-only">Password</label>
                    <input ref="passwordInput" id="passwordInput" type="password" className="form-control" placeholder="Password" required="required" minLength="6" maxLength="30" />

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>

                    <div className="formCrossLink pull-right">
                        <span>not registered yet? </span>
                        <a href="/signup">Sign up</a>
                    </div>
                </form>
            </div>
        );
    }
}

SignIn.propTypes = {

};

export default createContainer(() => {

    return {

    };
}, SignIn);