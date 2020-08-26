import React, { useState } from 'react';
import { connect } from 'react-redux';

import Spinner from '../UI/Spinner/Spinner';
import classes from './EditMultiple.module.css';
import axios from '../../axios';
import Input from '../UI/Input/Input';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditMultiple = props => {
  
  const [editMultipleForm, setEditMultipleForm] = useState({
      type : {
        elementType:'select',
        elementConfig:{
            options:[
                    {value:'name',displayValue:'Full Name'},
                    {value:'revenue',displayValue:'Revenue'},
                    {value:'workers',displayValue:'Workers'},
                    {value:'mail',displayValue:'Email'},
                    {value:'phoneNumber',displayValue:'Phone Number'}],
            placehold:'Type'
        },
        value: 'name',
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
  
   // eslint-disable-next-line
  const [formIsValid, setFormIsValid] = useState(false);
  

  // useEffect(()=>{
  //   const updatedForm = updateObject(editMultipleForm,{
  //     type:updateObject(editMultipleForm.type,{value:props.customerData.type}),
  //     value: updateObject(editMultipleForm.value,{value:props.customerData.value})
  //     })
  //     setEditMultipleForm(updatedForm)
  //     // eslint-disable-next-line
  // },[props.customerData])

  const clearForm = () =>{
    const updatedForm = updateObject(editMultipleForm,{
      value: updateObject(editMultipleForm.value,{value:""}),
      type:updateObject(editMultipleForm.type,{value:'Individual'})
    })
    setEditMultipleForm(updatedForm)
  }
  const editMultipleHandler = event => {
    // event.preventDefault();

    let formData = {};
    for (let formElementIdentifier in editMultipleForm) {
      formData[formElementIdentifier] = editMultipleForm[formElementIdentifier].value;
    }
    props.onEditMultiple(props.idArray,formData.type.value,formData.value.value);
    props.editedMultipleHandler();
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
    setEditMultipleForm(updatedCustomerForm);
    setFormIsValid(formIsValid)
    
  };

  const formElementsArray = [];
  const arrayFiller = (editMultipleForm,formElementsArray) => {
    for (let key in editMultipleForm) {
      formElementsArray.push({
        id: key,
        config: editMultipleForm[key]
      });
    }
  }
  arrayFiller(editMultipleForm,formElementsArray)
  let form = (
    <form onSubmit={editMultipleHandler}>
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
          changed={event => inputChangedHandler(event, formElement.id,editMultipleForm)}
        />
      ))}
    </form>
  );

  if (props.editing) {
    form = <Spinner />;
  }
  return (
    <div className={classes.Form}>
      <div className={classes.HeadDiv}>
        <span className={classes.Text1}><strong>Edit Multiple</strong></span>
        <button className={classes.SaveBtn} onClick={()=>editMultipleHandler()}>Update</button>
        <button className={classes.CloseBtn} onClick={()=> props.editingMultipleClosed()}>Close</button>
      </div>
      {form}
    </div>  
  );
};

const mapStateToProps = state => {
  return {
    editing: state.multiple.editing,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEditMultiple: (idArray,property,value) =>
      dispatch(actions.editMultiple(idArray,property,value))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(EditMultiple, axios));
