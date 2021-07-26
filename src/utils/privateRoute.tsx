import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  authActions: {
    isAuthenticated: boolean;
    isInitialized: boolean;
    isLoading: boolean;
  };
}

class PrivateRoute extends React.Component<PrivateRouteProps> {
  render() {
    const {
      authActions: { isAuthenticated, isInitialized, isLoading },
      ...rest
    } = this.props;

    if (isInitialized && !isLoading && !isAuthenticated) {
      return <Redirect to='/login' />;
    }

    return <Route {...rest} render={props => <React.Component {...props} />} />;
  }
}

const mapStateToProps = (state: any) => {
  return {
    authActions: state.auth.authActions,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
