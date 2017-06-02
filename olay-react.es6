import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const FOCUSABLE = [
  '[contenteditable]',
  '[tabindex]',
  'a',
  'button',
  'embed',
  'iframe',
  'input',
  'object',
  'select',
  'textarea'
].join(', ');

document.addEventListener('keydown', ev => {
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

const activate = component => {
  if (active.indexOf(component) !== -1) return;

  active.push(component);
  restrictFocusTo(component.remote);
  document.body.classList.add('olay-active');
};

const deactivate = component => {
  const i = active.indexOf(component);
  if (i === -1) return;

  active.splice(i, 1);
  if (active.length) {
    restrictFocusTo(active[active.length - 1].remote);
  } else {
    restrictFocusTo(document.body);
    const {body} = document;
    body.classList.remove('olay-active');
    if (!body.className) body.removeAttribute('class');
  }
};

const getTabIndex = el => {
  const {attributes} = el;
  for (let i = 0, l = attributes.length; i < l; ++i) {
    const {name, value} = attributes[i];
    if (name === 'tabindex') return value;
  }
};

const saveTabIndex = el => {
  if ('olaySavedTabIndex' in el) return;

  el.olaySavedTabIndex = getTabIndex(el);
};

const restoreTabIndex = el => {
  if (!('olaySavedTabIndex' in el)) return;

  if (el.olaySavedTabIndex) el.tabIndex = el.olaySavedTabIndex;
  else el.removeAttribute('tabindex');
  delete el.olaySavedTabIndex;
};

const restrictFocusTo = parent => {
  const els = document.body.querySelectorAll(FOCUSABLE);
  for (let i = 0, l = els.length; i < l; ++i) {
    const el = els[i];
    if (parent.contains(el)) {
      restoreTabIndex(els[i]);
    } else {
      saveTabIndex(els[i]);
      els[i].tabIndex = -1;
    }
  }
};

const setFocus = el => {
  if (!el) return;

  if (el.tabIndex >= 0) return el.focus();

  saveTabIndex(el);
  el.tabIndex = 0;
  el.focus();
  restoreTabIndex(el);
};

export default class extends Component {
  static propTypes = {
    children: PropTypes.any,
    close: PropTypes.func.isRequired,
    closeOnClick: PropTypes.bool,
    closeOnKeys: PropTypes.arrayOf(PropTypes.number),
    component: PropTypes.node,
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
    this.renderRemote({
      unmount: true,
      cb: () =>
        setTimeout(::this.unmountRemote, this.props.transitionLeaveTimeout)
    });
  }

  mountRemote() {
    this.prevActiveElement = document.activeElement;
    document.body.appendChild(this.remote = document.createElement('div'));
    activate(this);
    this.renderRemote({cb: () => setFocus(this.cell)});
  }

  unmountRemote() {
    requestAnimationFrame(::this.reallyUnmountRemote);
  }

  reallyUnmountRemote() {
    ReactDOM.unmountComponentAtNode(this.remote);
    deactivate(this);
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

    const {children, close, closeOnClick, closeOnKeys, ...rest} = this.props;
    ReactDOM.render(
      <CSSTransitionGroup {...rest}>
        {
          unmount ? null :
          <div className='olay-container' onClick={::this.handleClick}>
            <div className='olay-table'>
              <div ref={c => this.cell = c} className='olay-cell'>
                {children}
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
