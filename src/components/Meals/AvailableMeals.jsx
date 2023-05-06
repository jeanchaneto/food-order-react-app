import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [httpError, setHttpError] = useState();
  
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://food-order-react-app-ab677-default-rtdb.europe-west1.firebasedatabase.app/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(loadedMeals);
      setIsloading(false);
    }
   
    fetchMeals().catch((error) => {
       setIsloading(false);
       setHttpError(error.message);
    });
                 
  }, [])

  if (isLoading) {
    return (
      <p className={classes.mealsLoader}>Content loading...</p>
    )
  }

  if (httpError) {
    return (
      <section  >
        <p className={classes.mealsError}>{httpError}</p>
      </section>
    )
  }

  return (
    <section className={classes.meal}>
      <Card >
        <ul>
            {meals.map(meal => <MealItem 
            key={meal.id} 
            id={meal.id} 
            name={meal.name} 
            description={meal.description} 
            price={meal.price}/> )}
        </ul>
        </Card>
    </section>
  )
}

export default AvailableMeals