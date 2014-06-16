(function (root) {
  'use strict';

  var Cursors = root.Cursors;
  var OlayReact = root.OlayReact;
  var React = root.React;

  var UserListItem = React.createClass({
    mixins: [Cursors],

    handleChange: function (ev) {
      this.update('user', {color: {$set: ev.target.value}});
    },

    handleClick: function () {
      this.update('currentUserIndex', {$set: this.props.key});
    },

    render: function () {
      return (
        React.DOM.div({style: {color: this.state.user.color}},
          React.DOM.span({className: 'user-name'}, this.state.user.name),
          React.DOM.input({
            onChange: this.handleChange,
            value: this.state.user.color
          }),
          React.DOM.input({
            type: 'button',
            onClick: this.handleClick,
            value: 'Olay!'
          })
        )
      );
    }
  });

  var UsersList = React.createClass({
    mixins: [Cursors],

    getInitialState: function () {
      return {
        users: this.props.users,
        currentUserIndex: null
      };
    },

    closeOlay: function () {
      this.update('currentUserIndex', {$set: null});
    },

    renderUserListItem: function (user, i) {
      return (
        UserListItem({
          key: i,
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
        React.DOM.div({style: {color: user.color}},
          React.DOM.h1(null, user.name + "'s Olay!"),
          UsersList({cursors: {users: this.getCursor('users')}})
        )
      );
    },

    render: function () {
      return (
        React.DOM.div(null,
          this.state.users.map(this.renderUserListItem),
          OlayReact({close: this.closeOlay}, this.renderCurrentUser())
        )
      );
    }
  });

  document.addEventListener('DOMContentLoaded', function () {
    React.renderComponent(UsersList({
      users: [
        {name: 'Casey', color: 'orange'},
        {name: 'Lacey', color: 'teal'},
        {name: 'Gunner', color: 'blue'},
        {name: 'Loki', color: 'red'}
      ]
    }), document.getElementById('users-list'));
  });
})(this);
