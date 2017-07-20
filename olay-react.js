'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CSSTransition = require('react-transition-group/CSSTransition');

var _CSSTransition2 = _interopRequireDefault(_CSSTransition);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FOCUSABLE = ['[contenteditable]', '[tabindex]', 'a', 'button', 'embed', 'iframe', 'input', 'object', 'select', 'textarea'].join(', ');

if (typeof document !== 'undefined') {
  document.addEventListener('keydown', function (ev) {
    if (!active.length) return;

    var last = active[active.length - 1];
    var keys = last.props.closeOnKeys || [];
    var which = ev.which;
    for (var i = 0, l = keys.length; i < l; ++i) {
      if (which !== keys[i]) continue;

      last.props.close();
      return false;
    }
  });
}
var active = [];

var activate = function activate(component) {
  if (active.indexOf(component) !== -1) return;

  active.push(component);
  restrictFocusTo(component.remote);
  document.body.classList.add('olay-active');
};

var deactivate = function deactivate(component) {
  var i = active.indexOf(component);
  if (i === -1) return;

  active.splice(i, 1);
  if (active.length) {
    restrictFocusTo(active[active.length - 1].remote);
  } else {
    restrictFocusTo(document.body);
    var _document = document,
        body = _document.body;

    body.classList.remove('olay-active');
    if (!body.className) body.removeAttribute('class');
  }
};

var getTabIndex = function getTabIndex(el) {
  var attributes = el.attributes;

  for (var i = 0, l = attributes.length; i < l; ++i) {
    var _attributes$i = attributes[i],
        name = _attributes$i.name,
        value = _attributes$i.value;

    if (name === 'tabindex') return value;
  }
};

var saveTabIndex = function saveTabIndex(el) {
  if ('olaySavedTabIndex' in el) return;

  el.olaySavedTabIndex = getTabIndex(el);
};

var restoreTabIndex = function restoreTabIndex(el) {
  if (!('olaySavedTabIndex' in el)) return;

  if (el.olaySavedTabIndex) el.tabIndex = el.olaySavedTabIndex;else el.removeAttribute('tabindex');
  delete el.olaySavedTabIndex;
};

var restrictFocusTo = function restrictFocusTo(parent) {
  var els = document.body.querySelectorAll(FOCUSABLE);
  for (var i = 0, l = els.length; i < l; ++i) {
    var el = els[i];
    if (parent.contains(el)) {
      restoreTabIndex(els[i]);
    } else {
      saveTabIndex(els[i]);
      els[i].tabIndex = -1;
    }
  }
};

var setFocus = function setFocus(el) {
  if (!el) return;

  if (el.tabIndex >= 0) return el.focus();

  saveTabIndex(el);
  el.tabIndex = 0;
  el.focus();
  restoreTabIndex(el);
};

var _class = function (_Component) {
  _inherits(_class, _Component);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      requestAnimationFrame(this.mountRemote.bind(this));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderRemote();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this2 = this;

      var timeout = this.props.timeout;

      this.renderRemote({
        unmount: true,
        cb: function cb() {
          return setTimeout(_this2.unmountRemote.bind(_this2), timeout.leave || timeout);
        }
      });
    }
  }, {
    key: 'mountRemote',
    value: function mountRemote() {
      var _this3 = this;

      this.prevActiveElement = document.activeElement;
      document.body.appendChild(this.remote = document.createElement('div'));
      activate(this);
      this.renderRemote({ cb: function cb() {
          return setFocus(_this3.cell);
        } });
    }
  }, {
    key: 'unmountRemote',
    value: function unmountRemote() {
      requestAnimationFrame(this.reallyUnmountRemote.bind(this));
    }
  }, {
    key: 'reallyUnmountRemote',
    value: function reallyUnmountRemote() {
      _reactDom2.default.unmountComponentAtNode(this.remote);
      deactivate(this);
      document.body.removeChild(this.remote);
      setFocus(this.prevActiveElement);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(ev) {
      var _props = this.props,
          close = _props.close,
          closeOnClick = _props.closeOnClick;

      if (!closeOnClick) return;

      var target = ev.target;
      var els = [].slice.call(_reactDom2.default.findDOMNode(this.cell).children);
      if (els.some(function (el) {
        return el.contains(target);
      })) return;
      close();
      ev.stopPropagation();
    }
  }, {
    key: 'renderRemote',
    value: function renderRemote() {
      var _this4 = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$unmount = _ref.unmount,
          unmount = _ref$unmount === undefined ? false : _ref$unmount,
          cb = _ref.cb;

      if (!this.remote) return;

      var _props2 = this.props,
          appear = _props2.appear,
          children = _props2.children,
          classNames = _props2.classNames,
          timeout = _props2.timeout;

      _reactDom2.default.render(_react2.default.createElement(
        _TransitionGroup2.default,
        null,
        unmount ? null : _react2.default.createElement(
          _CSSTransition2.default,
          _extends({ appear: appear, classNames: classNames, timeout: timeout }, { key: '0' }),
          _react2.default.createElement(
            'div',
            { className: 'olay-container', onClick: this.handleClick.bind(this) },
            _react2.default.createElement(
              'div',
              { className: 'olay-table' },
              _react2.default.createElement(
                'div',
                { ref: function ref(c) {
                    return _this4.cell = c;
                  }, className: 'olay-cell' },
                children
              )
            )
          )
        )
      ), this.remote, cb);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return _class;
}(_react.Component);

_class.propTypes = {
  appear: _propTypes2.default.bool,
  children: _propTypes2.default.any,
  classNames: _propTypes2.default.any,
  close: _propTypes2.default.func.isRequired,
  closeOnClick: _propTypes2.default.bool,
  closeOnKeys: _propTypes2.default.arrayOf(_propTypes2.default.number),
  timeout: _propTypes2.default.any.isRequired
};
_class.defaultProps = {
  appear: true,
  classNames: 'olay-fade',
  closeOnClick: true,
  closeOnKeys: [27],
  timeout: 250
};
exports.default = _class;
