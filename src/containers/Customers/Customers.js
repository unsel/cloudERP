import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Customer from '../../components/Customer/Customer';
import AddCustomer from '../../components/Customer/AddCustomer/AddCustomer';
import EditCustomer from '../../components/Customer/EditCustomer/EditCustomer';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './customers.module.css';
import Header from '../../components/Header/Header';
import Modal from '../../components/UI/Modal/Modal';

import {Dropdown,DropdownButton} from 'react-bootstrap';



const Customers = props => {
  const { onFetchCustomers } = props;
  const [nameFilter,setNameFilter] = useState(""); const[tempNameFilter,setTempNameFilter]=useState("");
  const [workerFilter,setWorkerFilter] = useState(""); const[tempWorkerFilter,setTempWorkerFilter]=useState("");
  const [addingNew,setAddingNew] = useState(false);
  const [editing,setEditing] = useState(false);
  const [editForm,setEditForm] = useState('initial')
  const [sortFilter,setSortFilter] = useState("");
  const [sortOrder,setSortOrder] = useState(1);
  const [selectedItems,setSelectedItems] = useState([])
  const [checkAll,setCheckAll] = useState(false)
  const [formModalOpen,setFormModalOpen] = useState(false)   // Form Warning
  const [formMissingInfo,setFormMissingInfo]= useState([]);
  const [formInvalidInfo,setFormInvalidInfo]= useState([]);
  const [browserWidth,setBrowserWidth] = useState(document.documentElement.clientWidth)


  useEffect(() => {
    onFetchCustomers(/*props.token, props.userId*/);
  }, [onFetchCustomers]);
 
  // useEffect(()=>{
  //   setInterval(()=>{
  //     setBrowserWidth(document.documentElement.clientWidth)
  //   },100)
  // },[])
  
const sortBy = (a,b) => {
    if(sortFilter === "name"){
    return a[sortFilter] > b[sortFilter] ? sortOrder:-sortOrder;
    } else if (sortFilter ==="workers" || sortFilter ==="revenue"){
      return +a[sortFilter] > +b[sortFilter] ? sortOrder:-sortOrder;
    }
  }

  let dropdown = <DropdownButton
                  alignRight
                  title="Actions"
                  id="dropdown-menu-align-right"
                  size="sm"
                  variant="primary"
                >
                  <Dropdown.Item eventKey="1" onClick={()=>deleteSelected()}>Delete</Dropdown.Item>
                  <Dropdown.Item eventKey="2">Edit</Dropdown.Item>
                  <Dropdown.Item eventKey="3">Print</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </DropdownButton>
  let customers = <Spinner />;
  if (!props.loading) {
    customers= [...props.customers].sort(sortBy)
            .filter(customer => (customer.name.includes(nameFilter) || +customer.workers < workerFilter) )
            .map(customer => (
      <Customer
        key={customer.id}
        name={customer.name}
        revenue={customer.revenue}
        workers={customer.workers}
        id={customer.id}
        type={customer.type}
        status={customer.status}
        mail={customer.mail}
        phoneNumber={customer.phoneNumber}
        editingHandler={(customerData)=>editingHandler(customerData)}
        handleCheckbox={(value,id)=>handleCheckbox(value,id)}
        checked = {checkAll?true:null}
        deleteItem = {(id)=>deleteItem(id)}
        // products={(Object.keys(customer.products)).map((item,i)=>{return <p>{item}</p>})}
      />
    ));
  }

  const clearChecked = () => {
    setCheckAll(false);
    setSelectedItems([]);
  }

  const handleCheckbox = (value,id) =>{
    if(value){
      setSelectedItems(selectedItems => [...selectedItems,id]);
    } else {
      let array = [...selectedItems];
      let index = array.indexOf(id);
      if (index !== -1){
        array.splice(index,1);
        setSelectedItems(array)
      }
    }
    if(selectedItems.length === 1){
      setCheckAll(false)
    }
    if(selectedItems.length === [...props.customers].filter(customer => (customer.name.includes(nameFilter) || +customer.workers < workerFilter) ).length-1){
      setCheckAll(true)
    }
  }

  const deleteSelected = () => {
    [...selectedItems].forEach(id=>{
      props.onRemoveCustomer(id)
    });
    clearChecked();
  }

  const editingHandler = ( customerData ) => {
    setEditForm(customerData)
    setEditing(true);
  }
  const editingClosedHandler = (e) => {
    setEditing(false)
  }
  const editingFinishedHandler = (e) => {
    setEditing(false)
    clearChecked();
  }
  const refreshHandler = () => {
    clearChecked();
    onFetchCustomers();
  }

  const checkAllHandler = () =>{
    if(checkAll){
      setSelectedItems([]);
      setCheckAll(!checkAll);
    } else {
      setSelectedItems([]);
      [...props.customers].filter(customer => (customer.name.includes(nameFilter) || +customer.workers < workerFilter) ).forEach(customer=>setSelectedItems(selectedItems => [...selectedItems,customer.id]));
      
      setCheckAll(!checkAll);
    }
  }

  const deleteItem = (id) =>{
    props.onRemoveCustomer(id);
    clearChecked();
  }

  const resetFilters = () => {
    setSortFilter("");
  }
  const applyFilters = () => {
    setNameFilter(tempNameFilter);
    setWorkerFilter(tempWorkerFilter);
    refreshHandler();
  }
  const nameFilterChangedHandler= (e) => {
    setTempNameFilter(e.target.value)
  }
  const searchNameFilter = (e) => {
    if(e.key === 'Enter'){
      setNameFilter(e.target.value)
      refreshHandler()    // bad practice ?
    }  
  }
  const workerFilterChangedHandler= (e) => {
    setTempWorkerFilter(e.target.value)
  }
  const searchWorkerFilter = (e) => {
    if(e.key === 'Enter'){
      setWorkerFilter(e.target.value)
      refreshHandler()
    }
  }
  
  
  
  const addingNewHandler = (e) => {
    setAddingNew(true)
  }
  const addingClosedHandler = (e) => {
    setAddingNew(false)
  }
  const addedNewHandler = (e) => {
    setAddingNew(false)
    // setFormMissingInfo([]);
    // setFormInvalidInfo([]);
  }
  
  const sortOrderToggleHandler = () => {
    setSortOrder(-sortOrder);
  }
  const formModalOpener = (a,b) => {
    setFormMissingInfo(a);
    setFormInvalidInfo(b);
    setFormModalOpen(true);
  }
  let icon = (sortOrder === -1) ? <FontAwesomeIcon icon="arrow-down" onClick={()=>{sortOrderToggleHandler()}}/>:<FontAwesomeIcon icon="arrow-up" onClick={()=>{sortOrderToggleHandler()}}/>;
  let filterForm = (
    <div className={classes.FilterForm}>
        <input className={classes.NameFilter} placeholder="Name" value={tempNameFilter} type="text" onChange={nameFilterChangedHandler} onKeyDown={searchNameFilter}/>
        <input className={classes.WorkerFilter} placeholder="Worker" value={tempWorkerFilter} type="number" onChange={workerFilterChangedHandler} onKeyDown={searchWorkerFilter}/>
        <div className={classes.WidthMaker1}></div>
        <span className={classes.FilterDiv}>
          <button onClick={()=>{applyFilters()}}>ApplyFilters</button>
          <button onClick={()=>{resetFilters()}}>ResetFilters</button>
          {icon}
        </span>
    </div>
  )
  const headDiv = (
    <div className={classes.HeadDiv}>
          <input checked={checkAll && (selectedItems.length)} type="checkbox" onClick={()=>checkAllHandler()}/>
      {selectedItems.length === 0 ? 
          <div>
            <p className={classes.Name} onClick={()=>{setSortFilter("name")}}> <strong>Full Name</strong></p> 
            <p className={classes.Others} > <strong>Status </strong></p>
            <p className={classes.Workers} onClick={()=>{setSortFilter("workers")}}> <strong>Workers</strong></p>
            <p className={classes.Others} > <strong>Type </strong></p>
            <span className={classes.Rate}> {props.customers.length} of {props.customers.length}</span>  {/*  going to change */}
            </div>
            : <p className={classes.Others}>{selectedItems.length + ' items selected'}</p>
                        }
        </div>
  )
  
  return (
      <div >
          <Modal show={formModalOpen} modalClosed={()=>{setFormModalOpen(false)}} modalType='Modal2'>
              <div className={classes.FormModal}>
                <div className={classes.HeadDiv}>
                  <span className={classes.Text1}>
                    {formMissingInfo[0] ? <strong><FontAwesomeIcon icon="circle" color="orange" size='xs'/> Missing Values Required</strong>
                                      : <strong><FontAwesomeIcon icon="circle" color="red" size='xs'/> Message</strong>}
                      
                    </span>
                      
                  <button className={classes.CloseBtn} onClick={()=>{setFormModalOpen(false)}}>Close</button>
                </div>
                <div className={classes.Missing}>
                  {formMissingInfo[0] ? <p>Following fields have missing values:</p> : <p>Following fields have invalid information:</p>}
                  <ul>
                  {formMissingInfo[0]  ? formMissingInfo.map((el,i)=>{return <li>{el}</li>})  
                                       : formInvalidInfo.map((el,i)=>{return <li>{el}</li>}) }
                  
                  </ul>
                </div>
              </div>
          </Modal>
          <Modal show={addingNew} modalClosed={()=>addingClosedHandler() } modalType='Modal1'>
            <AddCustomer
              addedNew={()=>addedNewHandler()}
              closeNew={()=>addingClosedHandler()}
              clearChecked={()=>clearChecked()}
              formModalOpener={(a,b)=>formModalOpener(a,b)}/>
          </Modal>
          <Modal show={editing} modalClosed={()=>editingClosedHandler()} modalType='Modal1'>
            <EditCustomer
              customerData={editForm}
              editingFinished={()=>editingFinishedHandler()}
              editingClosed={()=>editingClosedHandler()}
              />
          </Modal>
          <button id="bu" onClick={()=>setBrowserWidth(document.documentElement.clientWidth)}>WIDTH</button>
          {browserWidth}
          <Header
            name = {"Customers"}
            addingHandler = {()=>addingNewHandler()} 
            refreshHandler={()=>refreshHandler()}
            dropdown={selectedItems.length?dropdown:null}/>
          <div className={classes.Content}>
            <div className={classes.Sidebar}>
            
            </div>
            <div className={classes.Customers}>
              {filterForm}
              {headDiv}
              {customers}
            </div>
          </div>
      </div>
  )
};

const mapStateToProps = state => {
  return {
    customers: state.customer.customers,
    loading: state.customer.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchCustomers: (/*token, userId*/) =>dispatch(actions.fetchCustomers(/*token, userId*/)),
    onRemoveCustomer: (id) => dispatch(actions.removeCustomer(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Customers, axios));
