import React from 'react';

import { connect } from 'react-redux';
import axios from '../../axios';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import classes from './Customer.module.css';

const Customer = ( props ) => {
    


    return (
        <div className={classes.Customer}>
            <input type="checkbox"/>
            <p className={classes.Name}> <strong>{props.name}</strong></p> 
            <p className={classes.Others}> <strong>USD {Number.parseFloat( props.revenue).toFixed( 2 )}</strong></p>
            <p className={classes.Others}> <strong>{Number.parseFloat( props.workers).toFixed( 0 )}</strong></p>
            <button onClick={()=>{props.onRemoveCustomer(props.id)}}>DELETE</button>
            <button onClick={()=>{props.editingHandler(props)}}>EDIT</button>
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
      onRemoveCustomer: (id) => dispatch(actions.removeCustomer(id)),
    };
    
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withErrorHandler(Customer, axios));

