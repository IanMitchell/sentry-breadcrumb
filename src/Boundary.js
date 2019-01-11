import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/minimal';

export default class SentryBoundary extends React.Component {
  static propTypes = {
    team: PropTypes.string,
    children: PropTypes.node.isRequired,
    fallback: PropTypes.func,
    tags: PropTypes.object,
  };

  static defaultProps = { team: 'unknown', fallback: null, tags: {} };

  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  captureException() {
    const { team, tags } = this.props;

    Sentry.withScope(scope => {
      scope.setLevel('error');
      scope.setTag('team', team);

      if (tags) {
        Object.entries(tags).forEach(([key, value]) =>
          scope.setTag(key, value)
        );
      }

      if (this.state.info) {
        Object.entries(this.state.info).forEach(([key, value]) =>
          scope.setExtra(key, value)
        );
      }

      Sentry.captureException(this.state.error);
    });
  }

  componentDidCatch(error, info) {
    this.setState({
      error,
      info,
    });

    const loader = window.Sentry;

    if (loader && loader.SDK_VERSION) {
      this.captureException();
    } else if (loader) {
      loader.onLoad(() => this.captureException());
      loader.forceLoad();
    }
  }

  render() {
    const { fallback } = this.props;

    if (this.state.hasError) {
      return fallback ? fallback(this.state.error, this.state.info) : null;
    }

    return this.props.children;
  }
}
