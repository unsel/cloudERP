import React, { useState } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../UI/Spinner/Spinner';
import classes from './AddCustomer.module.css';
import axios from '../../../axios';
import Input from '../../UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const AddCustomer = props => {
  const [customerForm, setCustomerForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placehold: 'Name'
      },
      value: '',
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    
    revenue: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        placehold: 'Revenue'
      },
      value: '',
      validation: {
        required: true,
        minLength: 1,
        maxLength: 7,
        isNumeric: true
      },
      valid: false,
      touched: false
    },
    workers: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placehold: 'Workers'
        },
        value: '',
        validation: {
          required: true,
          minLength: 1,
          maxLength: 7,
          isNumeric: true
        },
        valid: false,
        touched: false
      },
      
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const clearForm = () =>{
    const updatedForm = updateObject(customerForm,{
      name: updateObject(customerForm.name,{value:""}),
      workers:updateObject(customerForm.workers,{value:''}),
      revenue:updateObject(customerForm.revenue,{value:''})
    })
    setCustomerForm(updatedForm)
  }
  const orderHandler = event => {
    // event.preventDefault();

    let formData = {};
    for (let formElementIdentifier in customerForm) {
      formData[formElementIdentifier] = customerForm[formElementIdentifier].value;
    }
    const customer = {
      name:formData.name,
      revenue:formData.revenue,
      workers:formData.workers,
    };

    props.onAddCustomer(customer /*, props.token*/);
    props.addedNew();
    clearForm();
  };

  
  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(customerForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        customerForm[inputIdentifier].validation
      ),
      touched: true
    });
    const updatedCustomerForm = updateObject(customerForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedCustomerForm) {
      formIsValid = updatedCustomerForm[inputIdentifier].valid && formIsValid;
    }
    setCustomerForm(updatedCustomerForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (let key in customerForm) {
    formElementsArray.push({
      id: key,
      config: customerForm[key]
    });
  }
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          label={formElement.config.elementConfig.placehold}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
 
  
  return (
    <div className={classes.Form}>
      <div className={classes.HeadDiv}>
        <span className={classes.Text1}><strong>New Customer</strong></span>
        <button className={classes.SaveBtn} onClick={()=>orderHandler()} disabled={!formIsValid}>Save</button>
        <button className={classes.CloseBtn} onClick={()=> props.closeNew()}>Close</button>
        <button className={classes.ResetBtn} onClick={()=>clearForm()} >Reset</button>
      </div>
      {form}
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
    onAddCustomer: (customerData) =>
      dispatch(actions.addCustomer(customerData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(AddCustomer, axios));
