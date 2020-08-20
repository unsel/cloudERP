import React, { useState } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../UI/Spinner/Spinner';
import classes from './addCustomer.module.css';
import axios from '../../../axios';
import Input from '../../UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const AddCustomer = props => {
  const [customerForm, setCustomerForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placehold: 'Name'
      },
      value: '',
      validation: { required: true },
      valid: false, touched: false
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
      valid: false,  touched: false
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
        valid: false, touched: false
      },
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
  const [formIsValid, setFormIsValid] = useState(false);
  const [form2IsValid,setForm2IsValid] = useState(true)
  const [contactFormOpen,setContactFormOpen] = useState(false)


  const clearForm = () =>{
    const updatedForm = updateObject(customerForm,{
      name: updateObject(customerForm.name,{value:"",valid:false,touched:false}),
      workers:updateObject(customerForm.workers,{value:'',valid:false,touched:false}),
      revenue:updateObject(customerForm.revenue,{value:'',valid:false,touched:false}),
      // type:updateObject(customerForm.type,{value:'company'})
    })
    const updatedContactForm = updateObject(contactForm,{
      mail:updateObject(contactForm.mail,{value:"",touched:false}),
      phoneNumber:updateObject(contactForm.phoneNumber,{value:"",touched:false}),
    })
    setCustomerForm(updatedForm)
    setContactForm(updatedContactForm)
  }
  
  const addCustomerHandler = event => {
    // event.preventDefault();
    if(!(formIsValid && form2IsValid)){
      let a=[];
      for (const property in customerForm){
        if(customerForm[property].validation.required && customerForm[property].value === ''){
          a.push(customerForm[property].elementConfig.placehold)
        }
      }
      for (const property in contactForm){
          if(contactForm[property].validation.required && contactForm[property].value === ''){
            a.push(contactForm[property].elementConfig.placehold)
          }
      }
      let b = [];
      for (const property in customerForm){
        if(!customerForm[property].valid && customerForm[property].value !== ''){
          b.push(customerForm[property].elementConfig.placehold)
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
    for (let formElementIdentifier in customerForm) {
      formData[formElementIdentifier] = customerForm[formElementIdentifier].value;
    }
    for (let formElementIdentifier in contactForm) {
      formData[formElementIdentifier] = contactForm[formElementIdentifier].value;
    }
    const customer = {
      name:formData.name,
      revenue:formData.revenue,
      workers:formData.workers,
      type:formData.type,
      status:'Enabled',
      mail:formData.mail,
      phoneNumber:formData.phoneNumber
    };

    props.onAddCustomer(customer /*, props.token*/);
    props.addedNew();
    props.clearChecked();
    clearForm();
    setFormIsValid(false); setForm2IsValid(true)
  };
  const addExamplesHandler = event => {
    // event.preventDefault();

    const info=[
                  {name:'Customer1',revenue:10,workers:11,type:'Company',status:'Enabled',mail:'deneme@deneme.com',phoneNumber:5324323232},
                  {name:'Customer2',revenue:20,workers:22,type:'Company',status:'Enabled',mail:'deneme@deneme.com',phoneNumber:5324323232},
                  {name:'Customer3',revenue:30,workers:33,type:'Company',status:'Enabled',mail:'deneme@deneme.com',phoneNumber:5324323232},
                  {name:'Customer4',revenue:40,workers:44,type:'Company',status:'Enabled',mail:'deneme@deneme.com',phoneNumber:5324323232},
                  {name:'Customer5',revenue:50,workers:55,type:'Company',status:'Enabled',mail:'deneme@deneme.com',phoneNumber:5324323232},
                  {name:'Customer6',revenue:60,workers:66,type:'Company',status:'Enabled',mail:'deneme@deneme.com',phoneNumber:5324323232},
                  {name:'Customer7',revenue:70,workers:77,type:'Company',status:'Enabled',mail:'deneme@deneme.com',phoneNumber:5324323232},
                ]
    info.forEach(i=>{
      props.onAddCustomer(i);
    })
    props.addedNew();
    clearForm();
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
    if(form === customerForm){setCustomerForm(updatedCustomerForm);setFormIsValid(formIsValid);}
    if(form === contactForm){setContactForm(updatedCustomerForm);setForm2IsValid(formIsValid);}
    
    
  };

  const formElementsArray = []; const formElementsArray2=[];
  const arrayFiller = (customerForm,formElementsArray) => {
    for (let key in customerForm) {
      formElementsArray.push({
        id: key,
        config: customerForm[key]
      });
    }
  }
  arrayFiller(customerForm,formElementsArray)
  arrayFiller(contactForm,formElementsArray2)

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
          changed={event => inputChangedHandler(event, formElement.id,customerForm)}
        />
      ))}
    </form>
  );
  let form2 = (
    <div className={classes.form2}>
      <p className={classes.FormHeader} >PRIMARY CONTACT DETAILS &nbsp; <FontAwesomeIcon onClick={()=>{setContactFormOpen(!contactFormOpen)}} icon={contactFormOpen?'angle-up':'angle-down'}/></p>
      {contactFormOpen ? 
    <form  onSubmit={addCustomerHandler}>
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
          <span className={classes.Text1}><strong>New Customer</strong></span>
          <button className={classes.SaveBtn} onClick={()=>addCustomerHandler()}>Save</button>
          <button className={classes.CloseBtn} onClick={()=> props.closeNew()}>Close</button>
          <button className={classes.CloseBtnSmall} onClick={()=> props.closeNew()}><FontAwesomeIcon icon="times" size="4px" color="#696969"/></button>
          <button className={classes.ResetBtn} onClick={()=>clearForm()} >Reset</button>
          <button className={classes.ExamplesBtn} onClick={()=>addExamplesHandler()}>AddExamples</button>
        </div>
        {form}
        {form2}
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
