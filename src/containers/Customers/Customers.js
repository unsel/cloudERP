import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Customer from '../../components/Customer/Customer';
import NewCustomer from '../../components/Customer/newCustomer/newCustomer';
import axios from '../../axios-customers';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import classes from './Customers.module.css';


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
        name={customer.name}
        revenue={customer.revenue}
        workers={customer.workers}
        id={customer.id}
      />
    ));
  }
  return (
      <div className={classes.Customers}>
          {customers}
          <NewCustomer />
          {/* <div className={classes.centerDiv}>
            <button className={classes.OrderButton}> Add Customer </button>
          </div> */}
      </div>
  )
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
