(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'react'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('react'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.React);
    global.OlayReact = mod.exports;
  }
})(this, function (exports, module, _react) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var ReactDOM = typeof window === 'object' && window.ReactDOM || _React['default'];
  try {
    ReactDOM = require('react-dom');
  } catch (er) {}

  var CSSTransitionGroup = _React['default'].addons.CSSTransitionGroup;

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

  var active = [];

  var activate = function activate(component) {
    if (active.indexOf(component) !== -1) return;
    active.push(component);
    document.body.classList.add('olay-active');
  };

  var deactivate = function deactivate(component) {
    var i = active.indexOf(component);
    if (i === -1) return;
    active.splice(i, 1);
    if (!active.length) document.body.classList.remove('olay-active');
  };

  var _default = (function (_Component) {
    _inherits(_default, _Component);

    function _default() {
      _classCallCheck(this, _default);

      _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(_default, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        document.body.appendChild(this.remote = document.createElement('div'));
        this.mounted = true;
        this.update();
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        this.update();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.mounted = false;
        this.update();
        setTimeout(this.unmountRemote.bind(this), this.props.transitionLeaveTimeout);
      }
    }, {
      key: 'unmountRemote',
      value: function unmountRemote() {
        ReactDOM.unmountComponentAtNode(this.remote);
        document.body.removeChild(this.remote);
      }
    }, {
      key: 'update',
      value: function update() {
        ReactDOM.render(this.renderRemote(), this.remote);
        if (this.isActive()) activate(this);else deactivate(this);
      }
    }, {
      key: 'isActive',
      value: function isActive() {
        return this.mounted && _React['default'].Children.count(this.props.children);
      }
    }, {
      key: 'handleClick',
      value: function handleClick(ev) {
        var _props = this.props;
        var close = _props.close;
        var closeOnClick = _props.closeOnClick;

        if (!closeOnClick) return;
        var target = ev.target;
        var els = [].slice.call(ReactDOM.findDOMNode(this.cell).children);
        var containsTarget = function containsTarget(el) {
          return el.contains(target);
        };
        if (!els.some(containsTarget)) {
          close();
          ev.stopPropagation();
        }
      }
    }, {
      key: 'renderChildren',
      value: function renderChildren() {
        var _this = this;

        if (!this.isActive()) return;
        return _React['default'].createElement(
          'div',
          { className: 'olay-container', onClick: this.handleClick.bind(this) },
          _React['default'].createElement(
            'div',
            { className: 'olay-table' },
            _React['default'].createElement(
              'div',
              { ref: function (c) {
                  return _this.cell = c;
                }, className: 'olay-cell' },
              this.props.children
            )
          )
        );
      }
    }, {
      key: 'renderRemote',
      value: function renderRemote() {
        return _React['default'].createElement(
          CSSTransitionGroup,
          this.props,
          this.renderChildren()
        );
      }
    }, {
      key: 'render',
      value: function render() {
        return null;
      }
    }], [{
      key: 'propTypes',
      value: {
        children: _react.PropTypes.any,
        close: _react.PropTypes.func.isRequired,
        closeOnClick: _react.PropTypes.bool,
        closeOnKeys: _react.PropTypes.arrayOf(_react.PropTypes.number),
        transitionEnterTimeout: _react.PropTypes.number,
        transitionLeaveTimeout: _react.PropTypes.number,
        transitionName: _react.PropTypes.string
      },
      enumerable: true
    }, {
      key: 'defaultProps',
      value: {
        closeOnKeys: [27],
        closeOnClick: true,
        component: 'div',
        transitionEnterTimeout: 250,
        transitionLeaveTimeout: 250,
        transitionName: 'olay-fade'
      },
      enumerable: true
    }]);

    return _default;
  })(_react.Component);

  module.exports = _default;
});
