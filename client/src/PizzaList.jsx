import React from 'react';

const PizzaList = props => {
    let pizzas;
    if (props.pizzas.length) {
        pizzas = props.pizzas.map((pizza, index) => {
            return <p className='pizzarow' key={index}>TYPE: {pizza.type}</p>
        })
    }else {
        pizzas = <p>No Pizza Data!</p>
    }
    return (
        <div className='PizzaList'>
            <h3>All the Pizzas:</h3>
            {pizzas}
            <hr />
            <form onSubmit={props.handleSubmit}>
                <input onChange={props.handlePizzaTypeChange} type="text" name="type" value={props.type} />
                <input type="submit" value="Add a Pizza" />
            </form>
        </div>
    );

};

export default PizzaList;