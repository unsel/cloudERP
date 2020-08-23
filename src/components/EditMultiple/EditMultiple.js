import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../UI/Spinner/Spinner';
import classes from './EditMultiple.module.css';
import axios from '../../axios';
import Input from '../UI/Input/Input';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditCustomer = props => {
  
  const [customerForm, setCustomerForm] = useState({
      type : {
        elementType:'select',
        elementConfig:{
            options:[{value:'Company',displayValue:'Company'},
                     {value:'Individual',displayValue:'Individual'}],
            placehold:'Type'
        },
        value: 'Company',
        validation:{}, valid:true
      },
      value: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placehold: 'Value'
        },
        value: '',
        validation: {
          required: true
        },
        valid: true,
        touched: true
      }, 
  });
  
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(()=>{
    const updatedForm = updateObject(customerForm,{
        value: updateObject(customerForm.value,{value:props.customerData.value}),
        workers:updateObject(customerForm.workers,{value:props.customerData.workers}),
        revenue:updateObject(customerForm.revenue,{value:props.customerData.revenue}),
        type:updateObject(customerForm.type,{value:props.customerData.type})
      })
      setCustomerForm(updatedForm)
      // eslint-disable-next-line
  },[props.customerData])

  const clearForm = () =>{
    const updatedForm = updateObject(customerForm,{
      value: updateObject(customerForm.value,{value:""}),
      type:updateObject(customerForm.type,{value:'Individual'})
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
      value:formData.value,
      type:formData.type,
    };
    props.onEditMultipe(props.idArray,customer);
    props.editingFinished();
    clearForm();
    setFormIsValid(false); 
  };

  
  const inputChangedHandler = (event, inputIdentifier,form) => {
    const updatedFormElement = updateObject(form[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        form[inputIdentifier].validation
      ),
      touched: true
    });
    const updatedCustomerForm = updateObject(form, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedCustomerForm) {
      formIsValid = updatedCustomerForm[inputIdentifier].valid && formIsValid;
    }
    setCustomerForm(updatedCustomerForm);
    setFormIsValid(formIsValid)
    
  };

  const formElementsArray = [];
  const arrayFiller = (customerForm,formElementsArray) => {
    for (let key in customerForm) {
      formElementsArray.push({
        id: key,
        config: customerForm[key]
      });
    }
  }
  arrayFiller(customerForm,formElementsArray)
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
          changed={event => inputChangedHandler(event, formElement.id,customerForm)}
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
        <span className={classes.Text1}><strong>Edit Multiple</strong></span>
        <button className={classes.SaveBtn} onClick={()=>editCustomerHandler()} disabled={!formIsValid || !form2IsValid}>Update</button>
        <button className={classes.CloseBtn} onClick={()=> props.editingClosed()}>Close</button>
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
    onEditMultipe: (idArray,data) =>
      dispatch(actions.editMultiple(idArray,data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(EditCustomer, axios));
