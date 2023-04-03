import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";
import React from "react";

const AvailableMeals = () => {
  const [mealsData, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const FetchMeals = async () => {
      const response = await fetch(
        "https://simple-react-app-2b7b6-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );
      if (!response.ok) {
        return;
      }
      const responseData = await response.json();
      const loadedMeals = [];
      for (const key in responseData) {
        const dataObject = {
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        };
        loadedMeals.push(dataObject);
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    FetchMeals();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <h1>Loading...</h1>
      </section>
    );
  }

  const mealsList = mealsData.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
