import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {

    Meteor.publish('messages', function messagesPublication() {
        if (!this.userId)
            return null;

        let userLocation = Meteor.users.findOne({ _id: this.userId }).profile.location;
        return Messages.find({ location: userLocation });
    });
}

Meteor.methods({
    'messages.insert'(text) {
        check(text, String);

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        let user = Meteor.users.findOne({ _id: Meteor.userId() });

        Messages.insert({
            text: text,
            location: user.profile.location,
            userId: user._id,
            createdAt: new Date(),
        });
    }
});