import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { AuthState } from '../reducers/auth';

interface PrivateRouteProps extends RouteProps {
  auth: AuthState;
}

class PrivateRoute extends React.Component<PrivateRouteProps> {
  render() {
    const {
      auth: {
        user,
        authActions: { isAuthenticated, isInitialized, isLoading },
      },
      ...rest
    } = this.props;

    if (isInitialized && !isLoading && !isAuthenticated) {
      return <Redirect to='/login' />;
    }

    if (!user) {
      return <Redirect to='/complete-profile' />;
    }

    return <Route {...rest} render={props => <React.Component {...props} />} />;
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
