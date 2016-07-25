(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'react', 'react-dom', 'react-addons-css-transition-group'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('react'), require('react-dom'), require('react-addons-css-transition-group'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.React, global.ReactDOM, global.CSSTransitionGroup);
    global.OlayReact = mod.exports;
  }
})(this, function (exports, module, _react, _reactDom, _reactAddonsCssTransitionGroup) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  var _React = _interopRequireDefault(_react);

  var _ReactDOM = _interopRequireDefault(_reactDom);

  var _CSSTransitionGroup = _interopRequireDefault(_reactAddonsCssTransitionGroup);

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
        deactivate(this);
        this.renderRemote(setTimeout.bind(null, this.unmountRemote.bind(this), this.props.transitionLeaveTimeout));
      }
    }, {
      key: 'mountRemote',
      value: function mountRemote() {
        document.body.appendChild(this.remote = document.createElement('div'));
        this.renderRemote();
        activate(this);
      }
    }, {
      key: 'unmountRemote',
      value: function unmountRemote() {
        requestAnimationFrame(this.reallyUnmountRemote.bind(this));
      }
    }, {
      key: 'reallyUnmountRemote',
      value: function reallyUnmountRemote() {
        _ReactDOM['default'].unmountComponentAtNode(this.remote);
        document.body.removeChild(this.remote);
      }
    }, {
      key: 'handleClick',
      value: function handleClick(ev) {
        var _props = this.props;
        var close = _props.close;
        var closeOnClick = _props.closeOnClick;

        if (!closeOnClick) return;
        var target = ev.target;
        var els = [].slice.call(_ReactDOM['default'].findDOMNode(this.cell).children);
        if (els.some(function (el) {
          return el.contains(target);
        })) return;
        close();
        ev.stopPropagation();
      }
    }, {
      key: 'renderRemote',
      value: function renderRemote(cb) {
        var _this = this;

        if (!this.remote) return;
        _ReactDOM['default'].render(_React['default'].createElement(
          _CSSTransitionGroup['default'],
          this.props,
          cb ? null : _React['default'].createElement(
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
          )
        ), this.remote, cb);
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
        transitionAppear: _react.PropTypes.bool,
        transitionAppearTimeout: _react.PropTypes.number,
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
        transitionAppear: true,
        transitionAppearTimeout: 250,
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
