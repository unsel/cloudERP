import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../UI/Spinner/Spinner';
import classes from './EditItem.module.css';
import axios from '../../../axios';
import Input from '../../UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EditItem = props => {
  
  const [itemForm, setItemForm] = useState({
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
      touched: false
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
      type : {
        elementType:'select',
        elementConfig:{
            options:[{value:'Company',displayValue:'Company'},
                     {value:'Individual',displayValue:'Individual'}],
            placehold:'Type'
            
        },
        value: 'Company',
        validation:{}, valid:true ,touched:false
      }, 
  });
  const [contactForm,setContactForm] = useState({
    mail: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placehold: 'Mail'
      },
      value: '',
      validation: { required: false , isEmail:true },
      valid: true, touched: false
    },
    phoneNumber: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        placehold: 'PhoneNo'
      },
      value: '',
      validation: { required: false,minLength:3 },
      valid: true, touched: false
    }
  });

  const [formIsValid, setFormIsValid] = useState(true);
  const [form2IsValid,setForm2IsValid] = useState(true)
  const [contactFormOpen,setContactFormOpen] = useState(false)


  useEffect(()=>{
    const updatedForm = updateObject(itemForm,{
        name: updateObject(itemForm.name,{value:props.itemData.name,valid:true,touched:false}),
        workers:updateObject(itemForm.workers,{value:props.itemData.workers,valid:true,touched:false}),
        revenue:updateObject(itemForm.revenue,{value:props.itemData.revenue,valid:true,touched:false}),
        type:updateObject(itemForm.type,{value:props.itemData.type,valid:true,touched:false})
      })
    const updatedForm2 = updateObject(contactForm,{
        mail:updateObject(contactForm.mail,{value:props.itemData.mail,valid:true,touched:false}),
        phoneNumber:updateObject(contactForm.phoneNumber,{value:props.itemData.phoneNumber,valid:true,touched:false})
      })
      setItemForm(updatedForm); setFormIsValid(true);
      setContactForm(updatedForm2);  setForm2IsValid(true) ;
      
      // eslint-disable-next-line
  },[props.itemData])

  const clearForm = () =>{
    const updatedForm = updateObject(itemForm,{
      name: updateObject(itemForm.name,{value:""}),
      workers:updateObject(itemForm.workers,{value:''}),
      revenue:updateObject(itemForm.revenue,{value:''}),
      // type:updateObject(itemForm.type,{value:'Individual'})
    })
    const updatedForm2 = updateObject(contactForm,{
      mail:updateObject(contactForm.mail,{value:''}),
      phoneNumber:updateObject(contactForm.phoneNumber,{value:''})
    })
    setItemForm(updatedForm)
    setContactForm(updatedForm2)
  }
  const editItemHandler = event => {
    // event.preventDefault();
    if(!(formIsValid && form2IsValid)){
      let a=[];
      for (const property in itemForm){
        if(itemForm[property].validation.required && itemForm[property].value === ''){
          a.push(itemForm[property].elementConfig.placehold)
        }
      }
      for (const property in contactForm){
          if(contactForm[property].validation.required && contactForm[property].value === ''){
            a.push(contactForm[property].elementConfig.placehold)
          }
      }
      let b = [];
      for (const property in itemForm){
        if(!itemForm[property].valid && itemForm[property].value !== ''){
          b.push(itemForm[property].elementConfig.placehold)
        }
      }
      for (const property in contactForm ){
        if(!contactForm[property].valid && contactForm[property].value !== ''){
            b.push(contactForm[property].elementConfig.placehold)
          }
      }
      props.formModalOpener(a,b)
      return
    }

    let formData = {};
    for (let formElementIdentifier in itemForm) {
      formData[formElementIdentifier] = itemForm[formElementIdentifier].value;
    }
    for (let formElementIdentifier in contactForm) {
      formData[formElementIdentifier] = contactForm[formElementIdentifier].value;
    }
    const item = {
      name:formData.name,
      revenue:formData.revenue,
      workers:formData.workers,
      type:formData.type,
      status:'Enabled',
      mail:formData.mail,
      phoneNumber:formData.phoneNumber
    };

    props.onEditItem(props.itemData.id,item);
    props.editingFinished();
    clearForm();
    setFormIsValid(true); setForm2IsValid(true);
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
    const updatedItemForm = updateObject(form, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedItemForm) {
      formIsValid = updatedItemForm[inputIdentifier].valid && formIsValid;
    }
    if(form === itemForm){setItemForm(updatedItemForm);setFormIsValid(formIsValid);}
    if(form === contactForm){setContactForm(updatedItemForm);setForm2IsValid(formIsValid);}
  };

  const formElementsArray = []; const formElementsArray2=[];
  const arrayFiller = (itemForm,formElementsArray) => {
    for (let key in itemForm) {
      formElementsArray.push({
        id: key,
        config: itemForm[key]
      });
    }
  }
  arrayFiller(itemForm,formElementsArray)
  arrayFiller(contactForm,formElementsArray2)
  let form = (
    <form onSubmit={editItemHandler}>
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
          changed={event => inputChangedHandler(event, formElement.id,itemForm)}
        />
      ))}
    </form>
  );
  let form2 = (
    <div className={classes.form2}>
      <p className={classes.FormHeader} >PRIMARY CONTACT DETAILS &nbsp; <FontAwesomeIcon onClick={()=>{setContactFormOpen(!contactFormOpen)}} icon={contactFormOpen?'angle-up':'angle-down'}/></p>
      {contactFormOpen ? 
    <form  onSubmit={editItemHandler}>
      {formElementsArray2.map(formElement => (
        <Input
          key={formElement.id}
          label={formElement.config.elementConfig.placehold}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldValidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={event => inputChangedHandler(event, formElement.id,contactForm)}
        />
      ))}
    </form> : null}
    </div>
  );
  if (props.loading) {
    form = <Spinner />;
  }
 
  
  return (
    <div className={classes.Form}>
      <div className={classes.HeadDiv}>
        <span className={classes.Text1}><strong>Editing Item</strong></span>
        <button className={classes.SaveBtn} onClick={()=>editItemHandler()}>Save</button>
        <button className={classes.CloseBtn} onClick={()=> props.editingClosed()}>Close</button>
        <button className={classes.ResetBtn} onClick={()=>clearForm()} >Reset</button>
      </div>
      {form}
      {form2}
    </div>  
  );
};

const mapStateToProps = state => {
  return {
    loading: state.item.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEditItem: (itemId,itemData) =>
      dispatch(actions.editItem(itemId,itemData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(EditItem, axios));
