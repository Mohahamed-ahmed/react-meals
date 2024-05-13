// import './main.css'
import logo from'../assets/logo.jpg'
import { useContext } from 'react';
import { mealsContext } from './cart-context';
function Header(props){
    
    const crtctx = useContext(mealsContext);

    const numberofAmount = crtctx.items.reduce((currentNum,item)=>{
        return currentNum + item.amount;
    },0)

    return (
        <div className="header">
            <div className="logo-text">
                <img src={logo}></img>
                <h2>REACTFOOD</h2>
            </div>
            <div className="cartButton">
                <button onClick={props.CartClicking}>cart({numberofAmount})</button>
            </div>
        </div>   
    )
}

export default Header;