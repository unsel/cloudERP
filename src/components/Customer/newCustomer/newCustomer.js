import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../UI/Button/Button'
import Spinner from '../../UI/Spinner/Spinner';
import classes from './newCustomer.module.css';
import axios from '../../../axios-customers';
import Input from '../../UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = props => {
  const [customerForm, setCustomerForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Name'
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
        type: 'text',
        placeholder: 'revenue'
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
          type: 'text',
          placeholder: 'workers'
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
      id: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'customerID'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in customerForm) {
      formData[formElementIdentifier] = customerForm[formElementIdentifier].value;
    }
    const customer = {
      name:formData.name,
      revenue:formData.revenue,
      workers:formData.workers,
      id:formData.id,
      customerId:3
    };
    console.log("customerinfo = " + customer)
    props.onAddCustomer(customer /*, props.token*/);
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
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
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
)(withErrorHandler(ContactData, axios));
