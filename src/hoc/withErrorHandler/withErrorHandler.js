import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <div>
        <Modal show={error} modalClosed={clearError} modalType='Modal1'>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withErrorHandler;
