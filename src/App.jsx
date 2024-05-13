import Header from "./components/Header";
import MealsList from "./components/Meals-list";
import CartProvider from './components/cart-context'
import CartContent from "./components/Cart-Content";
import { useEffect,useState,useCallback } from "react";

function App() {
  const [fetchedMeals,SetFetchedMeals] = useState([]);
  const [CartIsClicked, SetCartIsClicked] = useState(false);

  const fetchingMeals = useCallback(async()=>{
    const response = await fetch('http://localhost:3000/meals');

    if(!response.ok){
      throw new Error('something went wrong');
    }

    const data = await response.json();

    SetFetchedMeals(data)
  },[])

  useEffect(()=>{
    fetchingMeals()
  },[fetchingMeals]);


  const ClickCartHandler=()=>{
    SetCartIsClicked(true);
  }

  return (
    <>
    <CartProvider>
      <Header CartClicking={ClickCartHandler}></Header>
      <MealsList meals={fetchedMeals}></MealsList>
      {CartIsClicked && <CartContent></CartContent>}
    </CartProvider>
    </>
  );
}

export default App;
