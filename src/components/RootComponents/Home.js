import React from 'react';
import Default from './Default/Default';

const Home = props => {
    let structure = {
        cards:[
            {link:'/items',name:"Items"},
            {link:'/customers',name:"Customers"},
            {link:'/item',name:"Default"},
            {link:'/item',name:"Sales Invoice"},
            {link:'/customers',name:"Suppliers"},
            {link:'/item',name:"Employees"},
        ],
        tables:[
            {title:'Accounting', rows:[
                {link:'/item',name:"Item",touched:true},
                {link:'/customers',name:"Customer",touched:false},
                {link:'/item',name:"Company",touched:true},
                {link:'/item',name:"Supplier",touched:false},
                {link:'/item',name:"Chart of Accounts",touched:true},
             ]},
            {title:'CRM', rows:[
                {link:'/item',name:"Lead",touched:false},
                {link:'/customers',name:"Customer",touched:true},
                {link:'/item',name:"Customer Group",touched:true},
                {link:'/item',name:"Territory",touched:false},
             ]},
            {title:'Human Resources', rows:[
                {link:'/item',name:"Employee",touched:true},
                {link:'/customers',name:"Salary Structure",touched:false},
                {link:'/item',name:"Employee Attendance",touched:false},
             ]},
             {title:'Accounting', rows:[
                {link:'/item',name:"Item",touched:true},
                {link:'/customers',name:"Customer",touched:false},
                {link:'/item',name:"Company",touched:true},
                {link:'/item',name:"Supplier",touched:false},
                {link:'/item',name:"Chart of Accounts",touched:true},
             ]},
            {title:'CRM', rows:[
                {link:'/item',name:"Lead",touched:false},
                {link:'/customers',name:"Customer",touched:true},
                {link:'/item',name:"Customer Group",touched:true},
                {link:'/item',name:"Territory",touched:false},
             ]},
            {title:'Human Resources', rows:[
                {link:'/item',name:"Employee",touched:true},
                {link:'/customers',name:"Salary Structure",touched:false},
                {link:'/item',name:"Employee Attendance",touched:false},
             ]},
        ]
    }
    return <Default  data={structure}/>
}

export default Home;