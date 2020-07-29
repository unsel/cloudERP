import React from 'react';

import classes from './Customer.module.css';

const Customer = ( props ) => {
    const products = [];

    for ( let product in props.products) {
        products.push(
            {
                name: product,
                amount: props.products[product]
            }
        );
    }

    const productOutput = products.map(prd => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
                }}
            key={prd.name}>{prd.name} ({prd.amount})</span>;
    });

    return (
        <div className={classes.Order}>
            <p>Products: {productOutput}</p>
            <p>Revenue: <strong>USD {Number.parseFloat( props.revenue).toFixed( 2 )}</strong></p>
            <p>Workers: <strong>{Number.parseFloat( props.workers).toFixed( 2 )}</strong></p>
        </div>
    );
};

export default Customer;