import { useContext } from "react";
import { mealsContext } from "./cart-context";
import { useRef } from "react";
function CheckOut(){

    const crtctx = useContext(mealsContext);

    const nameref = useRef('');
    const emailref = useRef('');
    const streetref = useRef('');
    const postalref = useRef('');
    const cityref = useRef('');


    const SubmitFormDataHandler=(event)=>{
        event.preventDefault();

        const CustomerData = {
            name:nameref.current.value,
            email:emailref.current.value,
            street:streetref.current.value,
            postal:postalref.current.value,
            city:cityref.current.value
        }

        fetch('http://localhost:3000/orders', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    order:{
                        items:crtctx.items,
                        customer:CustomerData
                    }
                })
            })
    }

    return (
        <div>
            <h2>CheckOut</h2>
            <p>{crtctx.totalPrice}</p>
            <form className="form-container" onSubmit={SubmitFormDataHandler}>
                <div className="input">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" ref={nameref} name="name"></input>
                </div>
                <div className="input">
                    <label htmlFor="email">E-Mail Address</label>
                    <input type="email" id="email" ref={emailref} name="email"></input>
                </div>
                <div className="input">
                    <label htmlFor="street">Street</label>
                    <input type="text" id="street" ref={streetref} name="street"></input>
                </div>
                <div className="input">
                    <label htmlFor="postal-code">Postal Code</label>
                    <input type="text" id="postal-code" ref={postalref} name="postal"></input>
                </div>
                <div className="input">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" ref={cityref} name="city"></input>
                </div>
                <div className="buttons">
                    <button>Cancel</button>
                    <button>Submit Order</button>
                </div>
            </form>
        </div>
    )
}

export default CheckOut;