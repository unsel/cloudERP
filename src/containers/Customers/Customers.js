import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Customer from '../../components/Customer/Customer';
import axios from '../../axios-customers';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Customers = props => {
  const { onFetchCustomers } = props;

  useEffect(() => {
    onFetchCustomers(/*props.token, props.userId*/);
  }, [onFetchCustomers]);

  let customers = <Spinner />;
  if (!props.loading) {
    customers= props.customers.map(customer => (
      <Customer
        key={customer.id}
        products={customer.products}
        revenue={customer.revenue}
        workers={customer.workers}
      />
    ));
  }
  return <div>{customers}</div>;
};

const mapStateToProps = state => {
  return {
    customers: state.customer.customers,
    loading: state.customer.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCustomers: (/*token, userId*/) =>
      dispatch(actions.fetchCustomers(/*token, userId*/))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Customers, axios));
