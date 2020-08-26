import React from 'react';
import {Link} from 'react-router-dom';
import classes from './HR.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




const HR = props => {

   
    return (
        <div className={classes.Home}>
            <div className={classes.HomeWrapper}> 
                <div className={classes.Shortcuts}>
                        <h6 className={classes.MiniTitle}>Your Shortcuts</h6>
                        <Link to="/items"><div className={classes.ilkler}>Employee</div></Link>
                        <Link to="/customers"><div className={classes.ilkler}>Attendance</div></Link>
                        <Link to="/customers"><div className={classes.ilkler}>Job Applicant</div></Link>
                        <Link to="/customers"><div className={classes.ilkler}>Monthly Attendance Sheet</div></Link>
                        <Link to="/customers"><div className={classes.ilkler}>Dashboard</div></Link>
                        <Link to="/customers"><div className={classes.ilkler}>NoContext</div></Link>
                </div>
                <div className={classes.Reports}>
                        <h6 className={classes.RowMiniTitle}>Reports & Masters</h6>
                    <div className='row'>
                        <div className={classes.Cards}>
                            <div className={classes.CardHeader}>Accounting</div>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#ffa00a' size='xs'/>&nbsp; Item</div></Link>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Customer</div></Link>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#ffa00a' size='xs'/>&nbsp; Supplier</div></Link>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Company</div></Link>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Chart of Accounts</div></Link>
                        </div>
                        <div className={classes.Cards}>
                            <div className={classes.CardHeader}>CRM</div>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#ffa00a' size='xs'/>&nbsp; Lead</div></Link>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Customer</div></Link>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Customer Group</div></Link>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Territory</div></Link>
                        </div>
                        <div className={classes.Cards}>
                            <div className={classes.CardHeader}>Human Resources</div>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#ffa00a' size='xs'/>&nbsp; Employee</div></Link>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Salary Structure</div></Link>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#ffa00a' size='xs'/>&nbsp; Employee Attendance Tool</div></Link>
                        </div>
                        <div className={classes.Cards}>
                            <div className={classes.CardHeader}>Non-Profit</div>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Item</div></Link>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Customer</div></Link>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Supplier</div></Link>
                        </div>
                        <div className={classes.Cards}>
                            <div className={classes.CardHeader}>Accounting</div>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Item</div></Link>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Customer</div></Link>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Supplier</div></Link>
                        </div>
                        <div className={classes.Cards}>
                            <div className={classes.CardHeader}>Accounting</div>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Item</div></Link>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Customer</div></Link>
                            <Link to="/customers"><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/>&nbsp; Supplier</div></Link>
                        </div>
                    </div>
                </div>
                <div className={classes.dots}>
                    <div><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/><span>&nbsp;Important</span></div> 
                    <div><FontAwesomeIcon icon="circle" color='#ffa00a' size='xs'/><span>&nbsp;No Records Created</span></div> 
               </div>
            </div>
        </div>
    )
}

export default HR;