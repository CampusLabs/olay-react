import React, {Component, PropTypes} from 'react';

let ReactDOM = typeof window === 'object' && window.ReactDOM || React;
try { ReactDOM = require('react-dom'); } catch (er) {}
const {findDOMNode} = ReactDOM;

const {CSSTransitionGroup} = React.addons;

document.addEventListener('keydown', function (ev) {
  if (!active.length) return;
  const last = active[active.length - 1];
  const keys = last.props.closeOnKeys || [];
  const which = ev.which;
  for (let i = 0, l = keys.length; i < l; ++i) {
    if (which !== keys[i]) continue;
    last.props.close();
    return false;
  }
});

const active = [];

const activate = function (component) {
  if (active.indexOf(component) !== -1) return;
  active.push(component);
  document.body.classList.add('olay-active');
};

const deactivate = function (component) {
  const i = active.indexOf(component);
  if (i === -1) return;
  active.splice(i, 1);
  if (!active.length) document.body.classList.remove('olay-active');
};

export default class extends Component {
  static propTypes = {
    children: PropTypes.any,
    close: PropTypes.func.isRequired,
    closeOnClick: PropTypes.bool,
    closeOnKeys: PropTypes.arrayOf(PropTypes.number),
    transitionEnterTimeout: PropTypes.number,
    transitionLeaveTimeout: PropTypes.number,
    transitionName: PropTypes.string
  }

  static defaultProps = {
    closeOnKeys: [27],
    closeOnClick: true,
    component: 'div',
    transitionEnterTimeout: 250,
    transitionLeaveTimeout: 250,
    transitionName: 'olay-fade'
  }

  componentDidMount() {
    document.body.appendChild(this.el = document.createElement('div'));
    this.mounted = true;
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    this.mounted = false;
    this.update();
    setTimeout(
      () => document.body.removeChild(this.el),
      this.props.transitionLeaveTimeout
    );
  }

  update() {
    ReactDOM.render(this.actualRender(), this.el);
    if (this.isActive()) activate(this); else deactivate(this);
  }

  isActive() {
    return this.mounted && React.Children.count(this.props.children);
  }

  handleClick(ev) {
    const {close, closeOnClick} = this.props;
    if (!closeOnClick) return;
    const target = ev.target;
    const els = [].slice.call(findDOMNode(this.cell).children);
    const containsTarget = function (el) { return el.contains(target); };
    if (!els.some(containsTarget)) {
      close();
      ev.stopPropagation();
    }
  }

  renderChildren() {
    if (!this.isActive()) return;
    return (
      <div className='olay-container' onClick={::this.handleClick}>
        <div className='olay-table'>
          <div ref={c => this.cell = c} className='olay-cell'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

  actualRender() {
    return (
      <CSSTransitionGroup {...this.props}>
        {this.renderChildren()}
      </CSSTransitionGroup>
    );
  }

  render() {
    return null;
  }
}
