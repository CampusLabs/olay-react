import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import CSSTransitionGroup from 'react-addons-css-transition-group';

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

const setFocus = el => {
  if (!el) return;

  const {tabIndex} = el;
  el.tabIndex = 0;
  el.focus();
  el.tabIndex = tabIndex;
};

export default class extends Component {
  static propTypes = {
    children: PropTypes.any,
    close: PropTypes.func.isRequired,
    closeOnClick: PropTypes.bool,
    closeOnKeys: PropTypes.arrayOf(PropTypes.number),
    transitionAppear: PropTypes.bool,
    transitionAppearTimeout: PropTypes.number,
    transitionEnterTimeout: PropTypes.number,
    transitionLeaveTimeout: PropTypes.number,
    transitionName: PropTypes.string
  }

  static defaultProps = {
    closeOnKeys: [27],
    closeOnClick: true,
    component: 'div',
    transitionAppear: true,
    transitionAppearTimeout: 250,
    transitionEnterTimeout: 250,
    transitionLeaveTimeout: 250,
    transitionName: 'olay-fade'
  }

  componentWillMount() {
    requestAnimationFrame(::this.mountRemote);
  }

  componentDidUpdate() {
    this.renderRemote();
  }

  componentWillUnmount() {
    deactivate(this);
    this.renderRemote({
      unmount: true,
      cb: () =>
        setTimeout(::this.unmountRemote, this.props.transitionLeaveTimeout)
    });
  }

  mountRemote() {
    this.prevActiveElement = document.activeElement;
    document.body.appendChild(this.remote = document.createElement('div'));
    this.renderRemote({cb: () => setFocus(this.cell)});
    activate(this);
  }

  unmountRemote() {
    requestAnimationFrame(::this.reallyUnmountRemote);
  }

  reallyUnmountRemote() {
    ReactDOM.unmountComponentAtNode(this.remote);
    document.body.removeChild(this.remote);
    setFocus(this.prevActiveElement);
  }

  handleClick(ev) {
    const {close, closeOnClick} = this.props;
    if (!closeOnClick) return;

    const target = ev.target;
    const els = [].slice.call(ReactDOM.findDOMNode(this.cell).children);
    if (els.some(el => el.contains(target))) return;
    close();
    ev.stopPropagation();
  }

  renderRemote({unmount = false, cb} = {}) {
    if (!this.remote) return;

    ReactDOM.render(
      <CSSTransitionGroup {...this.props}>
        {
          unmount ? null :
          <div className='olay-container' onClick={::this.handleClick}>
            <div className='olay-table'>
              <div ref={c => this.cell = c} className='olay-cell'>
                {this.props.children}
              </div>
            </div>
          </div>
        }
      </CSSTransitionGroup>
    , this.remote, cb);
  }

  render() {
    return null;
  }
}
