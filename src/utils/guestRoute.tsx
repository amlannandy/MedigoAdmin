import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface GuestRouteProps extends RouteProps {
  authActions: {
    isAuthenticated: boolean;
    isInitialized: boolean;
    isLoading: boolean;
  };
}

class GuestRoute extends React.Component<GuestRouteProps> {
  render() {
    const {
      authActions: { isAuthenticated, isInitialized, isLoading },
      ...rest
    } = this.props;

    if (isInitialized && !isLoading && isAuthenticated) {
      return <Redirect to='/' />;
    }

    return <Route {...rest} render={props => <React.Component {...props} />} />;
  }
}

const mapStateToProps = (state: any) => {
  return {
    authActions: state.auth.authActions,
  };
};

export default connect(mapStateToProps)(GuestRoute);
