import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: ''
    }
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    const { hasError, errorInfo } = this.state;
    const { children } = this.props;

    return hasError ? (
      <h1>{errorInfo}</h1>
    ) : children
  }
};

export default ErrorBoundary;