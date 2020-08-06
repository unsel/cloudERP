import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Customer from '../../components/Customer/Customer';
import AddCustomer from '../../components/Customer/AddCustomer/AddCustomer';
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
        // products={(Object.keys(customer.products)).map((item,i)=>{
        //   return <p>{item}</p>
        // })}
      />
    ));
  }
  return (
      <div >
          {customers}
          <AddCustomer/>
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
