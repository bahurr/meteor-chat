import { Meteor } from 'meteor/meteor';

export const UsersData = new Meteor.Collection('usersData');

if (Meteor.isServer) {

    Meteor.publish('usersData', function () {
        var self = this;
        var handle = Meteor.users.find({}, {
            fields: {emails: 1, profile: 1}
        }).observeChanges({
            added: function (id, fields) {
                self.added('usersData', id, fields);
            },
            changed: function (id, fields) {
                self.changed('usersData', id, fields);
            },
            removed: function (id) {
                self.removed('usersData', id);
            }
        });

        self.ready();

        self.onStop(function () {
            handle.stop();
        });
    });

    Accounts.onCreateUser(function (options, user) {
        user.profile = {
            name: options.profile.name,
            location: options.profile.location,
            color: getRandomColor(),
        };
        return user;
    });
}

Meteor.methods({

    updateUserPassword: function (password) {
        if (!Meteor.userId())
            return;

        Accounts.setPassword(Meteor.userId(), password);
    },

    updateUserEmail: function(email) {
        if (!Meteor.userId())
            return;

        let user = Meteor.users.findOne({ _id: Meteor.userId() });
        let oldEmail = user.emails[0].address;

        if (email.length && email != oldEmail && Accounts.findUserByEmail(email) == null) {
            Accounts.addEmail(user._id, email, true);
            Accounts.removeEmail(user._id, oldEmail);
            return;
        }

        throw new Meteor.Error("error", "Such email already exists");
    }
});

getRandomColor = function () {
    let letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};