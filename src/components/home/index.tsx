import React from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import Navbar from '../layout/navbar';

interface IndexProps {
  authActions: {
    isLoading: boolean;
  };
}

class Index extends React.Component<IndexProps> {
  render() {
    const {
      authActions: { isLoading },
    } = this.props;

    return (
      <React.Fragment>
        {isLoading ? (
          <Dimmer active>
            <Loader indeterminate>Please wait a minute...</Loader>
          </Dimmer>
        ) : null}
        <React.Fragment>
          <Navbar />
        </React.Fragment>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    authActions: state.auth.authActions,
  };
};

export default connect(mapStateToProps)(Index);
