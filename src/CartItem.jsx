import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    // Calculate total amount for all products in the cart
    const total = cart.reduce((accumulator, item) => {
        // 1. Extract the numeric cost from the "$X.XX" string
        const itemCost = parseFloat(item.cost.substring(1));
        
        // 2. Calculate the subtotal for the current item
        const itemSubtotal = item.quantity * itemCost;
        
        // 3. Add the subtotal to the running accumulator
        return accumulator + itemSubtotal;
    }, 0); // Start the accumulator at 0
    
    // Return the total, formatted to two decimal places
    return total;
  };

  const handleContinueShopping = (e) => {
   onContinueShopping(e)
  };



  const handleIncrement = (item) => {
    const updatedItem = { ...item };
    updatedItem.quantity++;
    dispatch(updateQuantity(updatedItem));
  };

  const handleDecrement = (item) => {
    const updatedItem = { ...item };

        if (updatedItem.quantity == 1) {
            // Remove item if number of items gets decremented to 0
            dispatch(removeItem(updatedItem));
        } else {
            updatedItem.quantity--;
            dispatch(updateQuantity(updatedItem));
        }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name))
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let totalCost = 0;
    const itemCost = parseItemCostToInteger(item.cost);
    totalCost = item.quantity * itemCost;

    return totalCost;
  };

//   dispatch(removeItem(item.name));

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


