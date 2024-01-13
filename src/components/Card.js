import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card({ foodItems, options }) {
  let dispatch = useDispatchCart()
  //for console logging
  let data = useCart()
  //useRef in price option
  const priceRef = useRef()
  let option = options
  //options Array 0: Object regular: "100"
  let priceOptions = Object.keys(options)
  //collectively sent by home 
  let foodItem = foodItems
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState('')
  const handleAddToCart = async () => {
    let food = []
    // const [food, setFood] = useState([])
    //We can't use react hook inside the function this gives error(tried using coz- if(food !== []) but this references object 
    // and give always true on line 30)  12th next half
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        // setFood(item)

        break;
      }
    }
    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      // if the size (large, medium) is changing we are adding into the cart else we are updating(adding the qty to the same)
      else if (food.size !== size) {
        await dispatch({
          type: "ADD", id: foodItem._id, name: foodItem.name,
          img: foodItem.img, qty: qty, size: size, price: finalPrice
        })
        return
      }
      return
    }
    await dispatch({
      type: "ADD", id: foodItem._id, name: foodItem.name,
      img: foodItem.img, qty: qty, size: size, price: finalPrice
    })
    // await console.log(data)
  }
  let finalPrice = qty * parseInt(option[size])
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (
    <div>
      <div>
        <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
          <img src={foodItem.img} className="" alt="..." style={{ height: "140px", objectFit: "fill" }} />
          <div className="card-body">
            <h5 className="card-title">{foodItem.name}</h5>
            {/* <p className="card-text">Some quick example.</p> */}
            <div className='container w-100' >
              <select className='m-2 h-100 bg-success rounded' onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1} >
                      {i + 1}
                    </option>
                  )
                })}
              </select>

              <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)} >
                {/* <option value="half">Half</option>
                <option value="full">Full</option> 
                hard coded value for privious reference*/}
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  )
                })}

              </select>

              <div className='d-inline h-100 fs-5'>
                ̥̥₹{finalPrice}/-
              </div>
            </div>
            <hr></hr>
            {/* hr for HoRizontal line */}
            <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  )
};