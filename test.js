(function (root) {
  'use strict';

  var Cursors = root.Cursors;
  var React = root.React;

  var OlayReact = React.createFactory(root.OlayReact);

  var UserListItem = React.createFactory(React.createClass({
    mixins: [Cursors],

    handleChange: function (ev) {
      this.update({user: {color: {$set: ev.target.value}}});
    },

    handleClick: function () {
      this.update({currentUserIndex: {$set: this.props.index}});
    },

    render: function () {
      return (
        React.createElement('div', {style: {color: this.state.user.color}},
          React.createElement('span', {className: 'user-name'},
            this.state.user.name
          ),
          React.createElement('input', {
            onChange: this.handleChange,
            value: this.state.user.color
          }),
          React.createElement('input', {
            type: 'button',
            onClick: this.handleClick,
            value: 'Olay!'
          })
        )
      );
    }
  }));

  var UsersList = React.createFactory(React.createClass({
    mixins: [Cursors],

    getInitialState: function () {
      return {
        users: this.props.users
      };
    },

    closeOlay: function () {
      this.update({currentUserIndex: {$set: null}});
    },

    renderUserListItem: function (user, i) {
      return (
        UserListItem({
          key: i,
          index: i,
          cursors: {
            user: this.getCursor('users', i),
            currentUserIndex: this.getCursor('currentUserIndex')
          }
        })
      );
    },

    renderCurrentUser: function () {
      var user = this.state.users[this.state.currentUserIndex];
      if (!user) return;
      return (
        React.createElement('div', {
          className: 'current-user',
          style: {color: user.color}
        },
          React.createElement('h1', null, user.name + "'s Olay!"),
          UsersList({cursors: {users: this.getCursor('users')}})
        )
      );
    },

    render: function () {
      return (
        React.createElement('div', null,
          this.state.users.map(this.renderUserListItem),
          OlayReact({close: this.closeOlay},
            this.renderCurrentUser()
          )
        )
      );
    }
  }));

  document.addEventListener('DOMContentLoaded', function () {
    React.render(UsersList({
      users: [
        {name: 'Casey', color: 'orange'},
        {name: 'Lacey', color: 'teal'},
        {name: 'Gunner', color: 'blue'},
        {name: 'Loki', color: 'red'}
      ]
    }), document.getElementById('users-list'));
  });
})(this);
