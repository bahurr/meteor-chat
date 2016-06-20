import React, { Component, PropTypes } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

export default class SignUp extends Component {

    onSubmit(e) {
        e.preventDefault();

        const name = ReactDOM.findDOMNode(this.refs.nameInput).value.trim();
        const email = ReactDOM.findDOMNode(this.refs.emailInput).value.trim();
        const password = ReactDOM.findDOMNode(this.refs.passwordInput).value.trim();
        const location = ReactDOM.findDOMNode(this.refs.locationInput).value.trim();

        if (name.length >= 3 && name.length <= 25 &&
            email.length >= 5 && email.length <= 100 &&
            password.length >= 6 && password.length <= 30
        ) {
            Accounts.createUser({
                email,
                password,
                profile: {
                    name,
                    location,
                },
            }, this.onResult);
        }
    }

    onResult(error) {
        error && error.reason && alert(error.reason);
    }

    render() {
        return (
            <div className="signUpContainer">
                <form className="form-signup" onSubmit={ this.onSubmit.bind(this) }>
                    <div className="chatIcon" title="Sign up" />

                    <label htmlFor="nameInput" className="sr-only">Email address</label>
                    <input ref="nameInput" id="nameInput" type="text" className="form-control" placeholder="Your name"
                           required="required" minLength="3" maxLength="25" />

                    <label htmlFor="emailInput" className="sr-only">Email address</label>
                    <input ref="emailInput" id="emailInput" type="email" className="form-control" placeholder="Email address"
                           required="required" minLength="5" maxLength="100" />

                    <label htmlFor="passwordInput" className="sr-only">Password</label>
                    <input ref="passwordInput" id="passwordInput" type="password" className="form-control" placeholder="Password"
                           required="required" minLength="6" maxLength="30" />

                    <select ref="locationInput" className="form-control" defaultValue="0">
                        <option value="0">Kyiv</option>
                        <option value="1">Lviv</option>
                        <option value="2">Ternopil</option>
                    </select>

                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>

                    <div className="formCrossLink pull-right">
                        <span>already registered? </span>
                        <a href="/signin">Sign in</a>
                    </div>
                </form>
            </div>
        );
    }
}

SignUp.propTypes = {

};

export default createContainer(() => {

    return {

    };
}, SignUp);