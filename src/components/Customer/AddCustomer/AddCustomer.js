import React, { useState } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../UI/Spinner/Spinner';
import classes from './addCustomer.module.css';
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
  
  const addCustomerHandler = event => {
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
    props.clearChecked();
    clearForm();
  };
  const addExamplesHandler = event => {
    // event.preventDefault();

    const info=[
                  {name:'Customer1',revenue:10,workers:11},
                  {name:'Customer2',revenue:20,workers:22},
                  {name:'Customer3',revenue:30,workers:33},
                  {name:'Customer4',revenue:40,workers:44},
                  {name:'Customer5',revenue:50,workers:55},
                  {name:'Customer6',revenue:60,workers:66},
                  {name:'Customer7',revenue:70,workers:77},
                ]
    info.forEach(i=>{
      props.onAddCustomer(i);
    })
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
    <form onSubmit={addCustomerHandler}>
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
        <button className={classes.SaveBtn} onClick={()=>addCustomerHandler()} disabled={!formIsValid}>Save</button>
        <button className={classes.CloseBtn} onClick={()=> props.closeNew()}>Close</button>
        <button className={classes.ResetBtn} onClick={()=>clearForm()} >Reset</button>
        <button className={classes.SaveBtn} onClick={()=>addExamplesHandler()}>AddExamples</button>
        
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
