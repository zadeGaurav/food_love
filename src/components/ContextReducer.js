import React, { createContext, useContext, useReducer } from 'react'


const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
switch(action.type){
    case "ADD":
        return [...state,{id:action.id, name:action.name, qty:action.qty, size:action.size, img: action.img, price:action.price}]
    case "REMOVE":
        let newArr = [...state]
        newArr.splice(action.index, 1)
        return newArr;
    case "UPDATE":
        let arr = [...state]
        arr.find((food, index) =>{
            if (food.id === action.id){
                console.log(food.qty, parseInt(action.qty), action.price + food.price)
                arr[index] = {...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price}
            }
            return arr
        })
        return arr
    case "DROP":
        //will overide and returns empty array (splice decreses effeciency)
        let empArray = []
        return empArray
    default: 
        console.log("Error in Reducer")
}
}

export const CartProvider = ({ children }) => {
    // intial state is [] as cart is empty at first and we are appending the data
    const [state, disptch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={disptch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)