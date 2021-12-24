import React from 'react';
import Default from './Default/Default';

const Home = props => {
    let structure = {
        cards:[
            {link:'/items',name:"Items"},
            {link:'/customers',name:"Customers"},
            {link:'/',name:"Default (NA)"},
            {link:'/',name:"Sales Invoice (NA)"},
            {link:'/',name:"Suppliers (NA)"},
            {link:'/',name:"Employees (NA)"},
        ],
        tables:[
            {title:'Accounting', rows:[
                {link:'/items',name:"Item",touched:true},
                {link:'/customers',name:"Customer",touched:false},
                {link:'/',name:"Company",touched:true},
                {link:'/',name:"Supplier",touched:false},
                {link:'/',name:"Chart of Accounts",touched:true},
             ]},
            {title:'CRM', rows:[
                {link:'/',name:"Lead",touched:false},
                {link:'/',name:"Customer",touched:true},
                {link:'/item',name:"Customer Group",touched:true},
                {link:'/item',name:"Territory",touched:false},
             ]},
            {title:'Human Resources', rows:[
                {link:'/',name:"Employee",touched:true},
                {link:'/',name:"Salary Structure",touched:false},
                {link:'/',name:"Employee Attendance",touched:false},
             ]},
             {title:'Accounting', rows:[
                {link:'/items',name:"Items",touched:true},
                {link:'/customers',name:"Customer",touched:false},
                {link:'/',name:"Company",touched:true},
                {link:'/',name:"Supplier",touched:false},
                {link:'/',name:"Chart of Accounts",touched:true},
             ]},
            {title:'CRM', rows:[
                {link:'/',name:"Lead",touched:false},
                {link:'/',name:"Customer",touched:true},
                {link:'/',name:"Customer Group",touched:true},
                {link:'/',name:"Territory",touched:false},
             ]},
            {title:'Human Resources', rows:[
                {link:'/',name:"Employee",touched:true},
                {link:'/',name:"Salary Structure",touched:false},
                {link:'/',name:"Employee Attendance",touched:false},
             ]},
        ]
    }
    return <Default  data={structure}/>
}

export default Home;