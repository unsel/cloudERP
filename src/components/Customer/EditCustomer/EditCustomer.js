import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../UI/Spinner/Spinner';
import classes from './EditCustomer.module.css';
import axios from '../../../axios';
import Input from '../../UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const EditCustomer = props => {
  
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
      valid: true,
      touched: true
    },
    
    revenue: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        placehold: 'Revenue'
      },
      value:  '',
      validation: {
        required: true,
        minLength: 1,
        maxLength: 7,
        isNumeric: true
      },
      valid: true,
      touched: false
    },
    workers: {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placehold: 'Workers'
        },
        value:  '',
        validation: {
          required: true,
          minLength: 1,
          maxLength: 7,
          isNumeric: true
        },
        valid: true,
        touched: false
      },
      
  });
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(()=>{
    const updatedForm = updateObject(customerForm,{
        name: updateObject(customerForm.name,{value:props.customerData.name}),
        workers:updateObject(customerForm.workers,{value:props.customerData.workers}),
        revenue:updateObject(customerForm.revenue,{value:props.customerData.revenue})
      })
      setCustomerForm(updatedForm)
      // eslint-disable-next-line
  },[props.customerData])

  const clearForm = () =>{
    const updatedForm = updateObject(customerForm,{
      name: updateObject(customerForm.name,{value:""}),
      workers:updateObject(customerForm.workers,{value:''}),
      revenue:updateObject(customerForm.revenue,{value:''})
    })
    setCustomerForm(updatedForm)
  }
  const editCustomerHandler = event => {
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

    props.onEditCustomer(props.customerData.id,customer);
    props.editingFinished();
    clearForm();
    setFormIsValid(false)
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
    <form onSubmit={editCustomerHandler}>
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
        <span className={classes.Text1}><strong>Editing Customer</strong></span>
        <button className={classes.SaveBtn} onClick={()=>editCustomerHandler()} disabled={!formIsValid}>Save</button>
        <button className={classes.CloseBtn} onClick={()=> props.editingClosed()}>Close</button>
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
    onEditCustomer: (customerId,customerData) =>
      dispatch(actions.editCustomer(customerId,customerData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(EditCustomer, axios));
