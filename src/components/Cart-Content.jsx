import { useContext } from "react";
import { mealsContext } from "./cart-context";
import { useState } from "react";
import CheckOut from "./CheckOut-form";
function CartContent(){
    const crtctx = useContext(mealsContext);

    const [CheckOutIsClicked,SetCheckOutIsClicked] = useState(false);

    const increaseitemshandler=(item)=>{
        crtctx.AddItem({
            id:item.id,
            name:item.name,
            price:item.price,
            amount:1
        })
    }

    const decreaseItemHandler=(item)=>{
        crtctx.deleteItem(item.id)
    }

    const CheckOutClickHandelr = ()=>{
        SetCheckOutIsClicked(true);
    }

    return (
        <div>
            {!CheckOutIsClicked && <div className="cart-container">
            {crtctx.items.map((item)=>(
                <div key={item.id} className="cart">
                    <div className="text">
                    <p>{item.name}</p>
                    <p>{item.price}$</p>
                    <p>x{item.amount}</p>
                    </div>
                    <div className="buttons">
                    <button onClick={()=>increaseitemshandler(item)}>+</button>
                    <button onClick={()=>decreaseItemHandler(item)}>-</button>
                    </div>
                </div>
            ))}
            <div>
                <p>{crtctx.totalPrice}</p>
            </div>
            <div className="Buttons">
                <button>Cancel</button>
                {crtctx.items.length > 0  && <button onClick={CheckOutClickHandelr}>CheckOut</button>}
            </div>
        </div>}
        {CheckOutIsClicked && <CheckOut></CheckOut>}
    </div>
    )
}

export default CartContent;