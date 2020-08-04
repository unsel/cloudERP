import React from 'react';

import { connect } from 'react-redux';
import axios from '../../axios-customers';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import classes from './Customer.module.css';

const Customer = ( props ) => {
    


    return (
        <div className={classes.Customer}>
            {/* <p>Products: {productOutput}</p> */}
            <p>Name: <strong>{props.name}</strong> &emsp;
             Revenue: <strong>USD {Number.parseFloat( props.revenue).toFixed( 2 )}</strong>&emsp;
             Workers: <strong>{Number.parseFloat( props.workers).toFixed( 0 )}</strong>&emsp;
            Id: <strong>{props.id}</strong></p>
            <button onClick={()=>{props.onRemoveCustomer(props.id)}}>DELETE</button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
     
      loading: state.customer.loading,
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onRemoveCustomer: (id) =>
        dispatch(actions.removeCustomer(id))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withErrorHandler(Customer, axios));

