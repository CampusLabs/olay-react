import React, {Component} from 'react';
import OlayReact from 'olay-react';

class UserListItem extends Component {
  handleColorChange(ev) {
    this.props.onColorChange(ev.target.value);
  }

  render() {
    const {color, name} = this.props.user;
    return (
      <div style={{color}}>
        <span className='user-name'>{name}</span>
        <input onChange={::this.handleColorChange} value={color} />
        <input type='button' onClick={this.props.onSelect} value='Olay!' />
      </div>
    );
  }
}

export default class UsersList extends Component {
  state = {
    users: this.props.users
  }

  closeOlay() {
    this.setState({currentUserIndex: null});
  }

  handleColorChange(i, color) {
    const {onColorChange} = this.props;
    const {users} = this.state;
    users[i].color = color;
    this.setState({users});
    if (onColorChange) onColorChange(i, color);
  }

  handleSelect(i) {
    this.setState({currentUserIndex: i});
  }

  renderUserListItem(user, i) {
    return (
      <UserListItem
        key={i}
        index={i}
        user={user}
        onColorChange={this.handleColorChange.bind(this, i)}
        onSelect={this.handleSelect.bind(this, i)}
      />
    );
  }

  renderCurrentUser() {
    const {currentUserIndex, users} = this.state;
    const user = users[currentUserIndex];
    if (!user) return;
    return (
      <div className='current-user' style={{color: user.color}}>
        <h1>{`${user.name}'s Olay!`}</h1>
        <UsersList users={users} onColorChange={::this.handleColorChange} />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.users.map(::this.renderUserListItem)}
        <OlayReact close={::this.closeOlay}>
          {this.renderCurrentUser()}
        </OlayReact>
      </div>
    );
  }
};
