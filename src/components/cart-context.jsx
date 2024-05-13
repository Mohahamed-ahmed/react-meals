import React from "react";
import {useReducer } from "react";

export const mealsContext = React.createContext();

const reducerFn=(state,action)=>{
    if(action.identifier==='Add'){
        const ExistingItemIndex = state.items.findIndex((item)=>item.id === action.passedItem.id);

        let updatedItems = [...state.items];

        if(ExistingItemIndex>-1){//findIndex return -1 if it false or it doesnt find matching 

            const updatedItem = {
                ...state.items[ExistingItemIndex],
                amount : state.items[ExistingItemIndex].amount + 1 // this amount will override 
            }

            updatedItems[ExistingItemIndex] = updatedItem 

        }
        else{
                updatedItems = state.items.concat(action.passedItem);
        }

        const updatedtotalPrice = state.totalPrice + (action.passedItem.amount * action.passedItem.price);

        return {
            items:updatedItems,
            totalPrice:updatedtotalPrice
        }
    }

    if(action.identifier==='Delete'){

        const ExisitingItmeIndex = state.items.findIndex((item)=>item.id === action.passedId);
        
        const exisistingCartItem = state.items[ExisitingItmeIndex]

        let updatedItems = [...state.items];

        let updatedtotalPrice;
        let updatedItem;

        if(exisistingCartItem.amount === 1) {
            updatedItems.splice(exisistingCartItem,1);
            updatedtotalPrice = state.totalPrice - exisistingCartItem.price;

            if(updatedItems.length === 0){
                updatedtotalPrice = 0;
            }
        }
        else{
                updatedItem={
                ...exisistingCartItem,
                amount:exisistingCartItem.amount - 1
            }
            updatedItems[ExisitingItmeIndex] = updatedItem;

            updatedtotalPrice = state.totalPrice - updatedItem.amount * updatedItem.price
        }

        
        // return {
        //     items:updatedItems,
        // }
        return{
            items:updatedItems,
            totalPrice:updatedtotalPrice
        }
    }

    return initialFn;
}

const initialFn={
    items:[],
    totalPrice:0
}



function CartProvider(props){

    const [state,dispatch] = useReducer(reducerFn,initialFn);

    const AddMealToCart=(item)=>{
        return dispatch({identifier:'Add' , passedItem:item})
    }

    const DeleteMealFromCart=(id)=>{
        return dispatch({identifier:"Delete" , passedId:id})
    }


    const CrtItems={
        items:state.items,
        totalPrice:state.totalPrice,
        AddItem:AddMealToCart,
        deleteItem:DeleteMealFromCart
    }

    return(
        <mealsContext.Provider value={CrtItems}>
            {props.children}
        </mealsContext.Provider>
    )
}

export default CartProvider;
