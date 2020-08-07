import React from 'react';

import { connect } from 'react-redux';
import axios from '../../axios-customers';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import classes from './Customer.module.css';

const Customer = ( props ) => {
    


    return (
        <div className={classes.Customer}>
            <p> <strong>{props.name}</strong></p> 
            <p> <strong>USD {Number.parseFloat( props.revenue).toFixed( 2 )}</strong></p>
            <p> <strong>{Number.parseFloat( props.workers).toFixed( 0 )}</strong></p>
            {/* Id: <strong>{props.id}</strong>&emsp;&emsp; */}
            <p><button onClick={()=>{props.onRemoveCustomer(props.id)}}>DELETE</button></p>
          {/* <p>{props.products.map((item,i)=>{ 
            return <p>Product {i} - {item.product1}</p>
          })}</p> */}
          {/* <p>{props.products}</p> */}
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

