import { mealsContext} from "./cart-context";
import { useContext , useState} from "react";
function MealsList({meals}){

    const crtctx = useContext(mealsContext);
    // const [amountNumber,SetAmountNumber] = useState('1')


    const AddItemToCart=(meal)=>{
        
            crtctx.AddItem({
                id:meal.id,
                name:meal.name,
                price:meal.price,
                amount:1
            })
        
    }

    return(
        <div className="meals-container">
            {meals.map((meal)=>(
                <div className="box" key={meal.id}>
                    <img src={`http://localhost:3000/${meal.image}`}></img>
                    <div className="text">
                        <p>{meal.name}</p>
                        <p>{meal.price}</p>
                        <p>{meal.description}</p>
                    </div>
                    <button onClick={()=>AddItemToCart(meal)}>Add To Cart</button>
                </div>
            ))}
        </div>
    )
}

export default MealsList;