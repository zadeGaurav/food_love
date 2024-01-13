import React from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
// import trash from '../trash.svg'
// import from '../'

//When i referesh on cart data vanished. React is not storing the data
//State is not reliabel source of storing the data.
const Cart = () => {
    let data = useCart();
    let dispatch = useDispatchCart();
    //As we are getting data in array I checked if length is zero or not
    if (data.length === 0) {
        return (
            <div>
                <div className=' m-5 text-center fs-3'>The cart is empty!</div>
            </div>
        )
    }

    // for hiting /orderData in Checkoout functionality using fetch api
    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail")
        let response = await fetch("http://localhost:5000/api/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                order_data: data,
                order_date: new Date().toDateString()
            })
        }
        );
        console.log("Order Response:", response)
        if(response.status === 200){
            //cart to be empty as he checkout the order
            dispatch({type: "DROP"})
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name} </td>
                                <td>{food.qty} </td>
                                <td>{food.size} </td>
                                <td>{food.price} </td>
                                <td><button type='button' className='btn p-0'><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbXbycCWEcJB2d5JMANHyktTsNBHcX1I2lWEFZZM4AsQ&s'
                                    style={{ height: '22px', width: '22px' }} alt="delete" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}
                                /> </button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    {/* When i check out data will be sent from frontend to backend(server) (mongodb)
                1. Server must have collection where you want to store the data
                2. End point hona chahiye (part of backend)*/}
                    <button className='btn bg-success mt-5' onClick={handleCheckOut}> Check out</button>
                    {/* This data:- let data = useCart(); will be sent but insure that it is 
                associated with the login email only. 
                So I am storing email just after login line 27
                and sending*/}
                </div>
            </div>
        </div>
    )
}

export default Cart