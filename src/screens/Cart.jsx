// This is your code in React and it represents the Cart Component of an e-commerce application.

import React from 'react' // Import React library
import Delete from '@material-ui/icons/Delete' // Import Delete icon from material-ui
import { useCart, useDispatchCart } from '../components/ContextReducer' // Import the required hooks from the ContextReducer file

// The Cart component starts here
export default function Cart() {
  let data = useCart() // Fetch the cart data from the useCart hook
  let dispatch = useDispatchCart() // Fetch the dispatch method from the useDispatchCart hook

  // If the cart is empty, return a view with a message saying "The Cart is Empty!"
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-success'>The Cart is Empty!</div>
      </div>
    )
  }

  // This function will handle the checkout process
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail") // Fetch user's email from local storage

    // Send a post request to the server with the order details
    let response = await fetch("https://mernbackend-kfws.onrender.com/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,  // Pass in the cart data
        email: userEmail, // User's email
        order_date: new Date().toDateString() // Current date
      })
    })

    // If the response status is 200, clear the cart
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }

  // Calculate the total price of all items in the cart
  let totalPrice = data.reduce((total, food) => total + food.price, 0)

  // Define some styles for the table
  const myStyles = {
    backgroundColor: 'white',
  };

  // This is what will be returned from the Cart component
  return (
    <div>
      <div className='container m-auto mt-5 bg-white table-responsive table-responsive-sm table-responsive-md overflow-auto' style={{maxHeight: "500px"}}>
        <table className='table text-dark' style={myStyles}>
          <thead className=' text-primary fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {/* Iterate through each item in the cart*/}
            {data.map((food, index) => (
              // For each item, return a table row with the item details
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                {/* Include a delete button for each item that will remove the item from cart when clicked */}
                <td><button type="button" className="btn p-0"><Delete style={{color:'red'}} onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Display the total price */}
        <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
        {/* Include a checkout button */}
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut}> Check Out </button>
        </div>
      </div>
    </div>
  )
}