import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

const AppLayout = (props) => (
    <div className="ibox chat-view">
        <div className="ibox-title">
            Meteor Chat
                {
                    props.currentUser
                        ? <div className="pull-right">
                            <a href="/profile" style={{marginRight:"15px"}}>Profile</a>
                            <a href="/signout">Sign out</a>
                          </div>
                        : ''
                }
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                    { props.mainContent }
                </div>
            </div>
        </div>
    </div>
);

export default createContainer(props => {
    return {
        currentUser: Meteor.user(),
    };
}, AppLayout);