import React from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from './actions';
import SentryBoundary from './Boundary';
import BadComponent from './BadComponent';

class App extends React.Component {
  onIncrement = () => {
    this.props.increment();
  };

  onDecrement = () => {
    this.props.decrement();
  };

  render() {
    return (
      <div className="App">
        <p>
          The buttons below fire Redux actions. Click the button below to
          trigger an error!
        </p>

        <div>
          <button onClick={this.onDecrement}> - </button>
          <span>{this.props.count}</span>
          <button onClick={this.onIncrement}> + </button>
        </div>

        <br />
        <br />

        <SentryBoundary
          team="SentryExample"
          fallback={(error, info) => <h1>SentryBoundary caught an error!</h1>}
          tags={{ LOCAL: true, metadata: { service: 'CRA', time: Date.now() } }}
        >
          <BadComponent />
        </SentryBoundary>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.count,
});

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
