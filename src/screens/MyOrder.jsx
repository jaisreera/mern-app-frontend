// Importing necessary hooks and components
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// Definition of MyOrder component
export default function MyOrder() {
    // State storing order data, initiates as empty object
    const [orderData, setOrderData] = useState({});

    // Function to fetch order data from server
    const fetchMyOrder = async () => {
        try {
            // Sending POST request to server, including user email stored in local storage
            const res = await fetch("https://mernbackend-kfws.onrender.com/api/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });

            // Parse response into JSON and set state
            const response = await res.json();
            setOrderData(response);
        } catch (error) {
            // Errors are displayed in the console
            console.error("Error fetching order data:", error.message);
        }
    };

    // useEffect hook to fetch order data when component mounts
    useEffect(() => {
        fetchMyOrder();
    }, []);

    // Render method returning component JSX
    return (
        <div>
            <Navbar />
            <div className='container mt-3'>
                <div className='row'>
                    { // Check if order data has been fetched and mapped to components
                    Object.keys(orderData).length !== 0 &&
                        orderData.orderData &&
                        orderData.orderData.order_data.slice(0).reverse().map((item, index) => (
                            <div className='col-12 col-md-6 col-lg-4 mb-3' key={index}>
                                {item.map((arrayData, arrayIndex) => (
                                    <div key={arrayIndex} className='card'>
                                        {arrayData.Order_date ? (
                                            // Order date is displayed if it exists
                                            <div className='m-auto mt-3'>
                                                {arrayData.Order_date}
                                            </div>
                                        ) : (
                                            // Otherwise, order product details are displayed
                                            <div>
                                                <img src={arrayData.img} className="card-img-top img-fluid" alt="..." style={{ height: "160px", objectFit: "fill" }} />
                                                <div className="card-body">
                                                    <h5 className="card-title text-truncate">{arrayData.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                         {/* Each item detail is displayed separately */}
                                                        <span className='m-2 text-truncate'>{arrayData.qty}</span>
                                                        <span className='m-2 text-truncate'>{arrayData.size}</span>
                                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                            ₹{arrayData.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}