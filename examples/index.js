(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'react', 'olay-react'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('react'), require('olay-react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.React, global.OlayReact);
    global.index = mod.exports;
  }
})(this, function (exports, module, _react, _olayReact) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var _OlayReact = _interopRequireDefault(_olayReact);

  var UserListItem = (function (_Component) {
    _inherits(UserListItem, _Component);

    function UserListItem() {
      _classCallCheck(this, UserListItem);

      _get(Object.getPrototypeOf(UserListItem.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(UserListItem, [{
      key: 'handleColorChange',
      value: function handleColorChange(ev) {
        this.props.onColorChange(ev.target.value);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props$user = this.props.user;
        var color = _props$user.color;
        var name = _props$user.name;

        return _React['default'].createElement(
          'div',
          { style: { color: color } },
          _React['default'].createElement(
            'span',
            { className: 'user-name' },
            name
          ),
          _React['default'].createElement('input', { onChange: this.handleColorChange.bind(this), value: color }),
          _React['default'].createElement('input', { type: 'button', onClick: this.props.onSelect, value: 'Olay!' })
        );
      }
    }]);

    return UserListItem;
  })(_react.Component);

  var UsersList = (function (_Component2) {
    _inherits(UsersList, _Component2);

    function UsersList() {
      _classCallCheck(this, UsersList);

      _get(Object.getPrototypeOf(UsersList.prototype), 'constructor', this).apply(this, arguments);

      this.state = {
        users: this.props.users
      };
    }

    _createClass(UsersList, [{
      key: 'closeOlay',
      value: function closeOlay() {
        this.setState({ currentUserIndex: null });
      }
    }, {
      key: 'handleColorChange',
      value: function handleColorChange(i, color) {
        var onColorChange = this.props.onColorChange;
        var users = this.state.users;

        users[i].color = color;
        this.setState({ users: users });
        if (onColorChange) onColorChange(i, color);
      }
    }, {
      key: 'handleSelect',
      value: function handleSelect(i) {
        this.setState({ currentUserIndex: i });
      }
    }, {
      key: 'renderUserListItem',
      value: function renderUserListItem(user, i) {
        return _React['default'].createElement(UserListItem, {
          key: i,
          index: i,
          user: user,
          onColorChange: this.handleColorChange.bind(this, i),
          onSelect: this.handleSelect.bind(this, i)
        });
      }
    }, {
      key: 'renderCurrentUser',
      value: function renderCurrentUser() {
        var _state = this.state;
        var currentUserIndex = _state.currentUserIndex;
        var users = _state.users;

        var user = users[currentUserIndex];
        if (!user) return;
        return _React['default'].createElement(
          _OlayReact['default'],
          { close: this.closeOlay.bind(this) },
          _React['default'].createElement(
            'div',
            { className: 'current-user', style: { color: user.color } },
            _React['default'].createElement(
              'h1',
              null,
              user.name + '\'s Olay!'
            ),
            _React['default'].createElement(UsersList, { users: users, onColorChange: this.handleColorChange.bind(this) })
          )
        );
      }
    }, {
      key: 'render',
      value: function render() {
        return _React['default'].createElement(
          'div',
          null,
          this.state.users.map(this.renderUserListItem.bind(this)),
          this.renderCurrentUser()
        );
      }
    }]);

    return UsersList;
  })(_react.Component);

  module.exports = UsersList;
  ;
});
