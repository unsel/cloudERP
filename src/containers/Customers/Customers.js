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

// import Dropdown from 'react-bootstrap/Dropdown';


const Customers = props => {
  const { onFetchCustomers } = props;
  const [nameFilter,setNameFilter] = useState("");
  const [workerFilter,setWorkerFilter] = useState("");
  const [addingNew,setAddingNew] = useState(false);
  const [editing,setEditing] = useState(false);
  const [editForm,setEditForm] = useState('initial')
  const [sortFilter,setSortFilter] = useState("");
  const [sortOrder,setSortOrder] = useState(1);
  const [selectedItems,setSelectedItems] = useState([])
  const [checkAll,setCheckAll] = useState(false)

  useEffect(() => {
    onFetchCustomers(/*props.token, props.userId*/);
  }, [onFetchCustomers]);

  const sortBy = (a,b) => {
    if(sortFilter === "name"){
    return a[sortFilter] > b[sortFilter] ? sortOrder:-sortOrder;
    } else if (sortFilter ==="workers" || sortFilter ==="revenue"){
      return +a[sortFilter] > +b[sortFilter] ? sortOrder:-sortOrder;
    }
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
    if(selectedItems.length === props.customers.length-1){
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
    setSelectedItems([]);
    onFetchCustomers();
  }

  const checkAllHandler = () =>{
    if(checkAll){
      setSelectedItems([]);
      setCheckAll(!checkAll);
    } else {
      setSelectedItems([]);
      [...props.customers].forEach(customer=>setSelectedItems(selectedItems => [...selectedItems,customer.id]));
      setCheckAll(!checkAll);
    }
  }

  

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
        editingHandler={(customerData)=>editingHandler(customerData)}
        handleCheckbox={(value,id)=>handleCheckbox(value,id)}
        checked = {checkAll?true:null}
        // products={(Object.keys(customer.products)).map((item,i)=>{return <p>{item}</p>})}
      />
    ));
  }

  const resetFilters = () => {
    setSortFilter("");
  }
  const nameFilterChangedHandler= (e) => {
    setNameFilter(e.target.value)
  }
  const workerFilterChangedHandler= (e) => {
    setWorkerFilter(e.target.value)
  }
  const addingNewHandler = (e) => {
    setAddingNew(true)
  }
  const addingClosedHandler = (e) => {
    setAddingNew(false)
  }
  
  const sortOrderToggleHandler = () => {
    setSortOrder(-sortOrder);
  }
  let icon = (sortOrder === -1) ? <FontAwesomeIcon icon="arrow-down" onClick={()=>{sortOrderToggleHandler()}}/>:<FontAwesomeIcon icon="arrow-up" onClick={()=>{sortOrderToggleHandler()}}/>;
  let filterForm = (
    <div className={classes.FilterForm}>
        <input className={classes.NameFilter} placeholder="Name" value={nameFilter} type="text" onChange={nameFilterChangedHandler}/>
        <input className={classes.WorkerFilter} placeholder="Worker" value={workerFilter} type="number" onChange={workerFilterChangedHandler}/>
        <div className={classes.WidthMaker1}></div>
        <span className={classes.FilterDiv}>
          <button>SetFilters</button>
          <button onClick={()=>{resetFilters()}}>ResetFilters</button>
          {icon}
        </span>
    </div>
  )
  const headDiv = (
    <div className={classes.HeadDiv}>
            <input checked={checkAll && (selectedItems.length)} type="checkbox" onClick={()=>checkAllHandler()}/>
            <p className={classes.Name} onClick={()=>{setSortFilter("name")}}> <strong>Full Name</strong></p> 
            <p className={classes.Others} onClick={()=>{setSortFilter("revenue")}}> <strong>Revenue </strong></p>
            <p className={classes.Others} onClick={()=>{setSortFilter("workers")}}> <strong>Workers</strong></p>
        </div>
  )
  return (
      <div >
          <Modal show={addingNew} modalClosed={()=>addingClosedHandler()}>
            <AddCustomer
              addedNew={()=>addingClosedHandler()}
              closeNew={()=>addingClosedHandler()}
              clearChecked={()=>clearChecked()}/>
          </Modal>
          <Modal show={editing} modalClosed={()=>editingClosedHandler()}>
            <EditCustomer
              customerData={editForm}
              editingFinished={()=>editingFinishedHandler()}
              editingClosed={()=>editingClosedHandler()}
              />
          </Modal>
          
          <Header
            name = {"Customers"}
            addingHandler = {()=>addingNewHandler()} 
            refreshHandler={()=>refreshHandler()}/>
          <div className={classes.Content}>
            <div className={classes.Sidebar}>
              <button onClick={()=>checkAllHandler()}>SelectAll </button>
              {checkAll?<div>true</div>:<div>false</div>}
              {props.customers.length}
              {selectedItems.length}
              <button onClick={()=>deleteSelected()}>DeleteSelected</button>
            </div>
            <div className={classes.Customers}>
              {selectedItems}
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
