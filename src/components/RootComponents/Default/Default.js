import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Default.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';




const Default = props => {

    let cards = [...props.data.cards].map(item=>(
        <Link to={item.link}><div className={classes.ilkler}>{item.name}</div></Link>
    ))
    let tables = [...props.data.tables].map(item=>(
        <div className={classes.Cards}>
            <div className={classes.CardHeader}>{item.title}</div>
            {item.rows.map(row=>(
                <Link to={row.link}><div className={classes.CardItem}><FontAwesomeIcon icon="circle" color={row.touched ?'#ffa00a':'#5e64ff'} size='xs'/>&nbsp;{row.name}</div></Link>
            ))}
        </div>
    ))
    return (
        <div className={classes.Home}>
            <div className={classes.Shortcuts}>
                    <h6 className={classes.MiniTitle}>Your Shortcuts</h6>
                    {cards}
            </div>
            <div className={classes.Reports}>
                    <h6 className={classes.RowMiniTitle}>Reports & Masters</h6>
                <div className='row'>
                    {tables}
                </div>
            </div>
            <div className={classes.dots}>
                <div><FontAwesomeIcon icon="circle" color='#5e64ff' size='xs'/><span>&nbsp;Important</span></div> 
                <div><FontAwesomeIcon icon="circle" color='#ffa00a' size='xs'/><span>&nbsp;No Records Created</span></div> 
            </div>
        </div>
    )
}

export default Default;