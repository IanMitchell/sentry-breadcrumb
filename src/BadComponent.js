import React from 'react';

function Visibility({ isVisible, children }) {
  if (isVisible) {
    return React.Children.only(children);
  }

  return null;
}

export default class BadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  onClick = () => {
    this.setState({ isVisible: true });
  };

  render() {
    return (
      <React.Fragment>
        <Visibility isVisible={this.state.isVisible}>
          <p>One Child</p>
          <p>Two Child</p>
        </Visibility>
        <button onClick={this.onClick}>Break App</button>
      </React.Fragment>
    );
  }
}
