(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'olay-react'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('olay-react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.React, global.OlayReact);
    global.index = mod.exports;
  }
})(this, function (exports, _react, _olayReact) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _olayReact2 = _interopRequireDefault(_olayReact);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var UserListItem = function (_Component) {
    _inherits(UserListItem, _Component);

    function UserListItem() {
      _classCallCheck(this, UserListItem);

      return _possibleConstructorReturn(this, (UserListItem.__proto__ || Object.getPrototypeOf(UserListItem)).apply(this, arguments));
    }

    _createClass(UserListItem, [{
      key: 'handleColorChange',
      value: function handleColorChange(ev) {
        this.props.onColorChange(ev.target.value);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props$user = this.props.user,
            color = _props$user.color,
            name = _props$user.name;

        return _react2.default.createElement(
          'div',
          { style: { color: color } },
          _react2.default.createElement(
            'span',
            { className: 'user-name' },
            name
          ),
          _react2.default.createElement('input', { onChange: this.handleColorChange.bind(this), value: color }),
          _react2.default.createElement('input', { type: 'button', onClick: this.props.onSelect, value: 'Olay!' })
        );
      }
    }]);

    return UserListItem;
  }(_react.Component);

  var UsersList = function (_Component2) {
    _inherits(UsersList, _Component2);

    function UsersList() {
      var _ref;

      var _temp, _this2, _ret;

      _classCallCheck(this, UsersList);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = UsersList.__proto__ || Object.getPrototypeOf(UsersList)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
        users: _this2.props.users
      }, _temp), _possibleConstructorReturn(_this2, _ret);
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
        return _react2.default.createElement(UserListItem, {
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
        var _state = this.state,
            currentUserIndex = _state.currentUserIndex,
            users = _state.users;

        var user = users[currentUserIndex];
        if (!user) return;
        return _react2.default.createElement(
          _olayReact2.default,
          { close: this.closeOlay.bind(this) },
          _react2.default.createElement(
            'div',
            { className: 'current-user', style: { color: user.color } },
            _react2.default.createElement(
              'h1',
              null,
              user.name + '\'s Olay!'
            ),
            _react2.default.createElement(UsersList, { users: users, onColorChange: this.handleColorChange.bind(this) })
          )
        );
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          this.state.users.map(this.renderUserListItem.bind(this)),
          this.renderCurrentUser()
        );
      }
    }]);

    return UsersList;
  }(_react.Component);

  exports.default = UsersList;
  ;
});
