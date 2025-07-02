import { useEffect, useState } from "react";
import IngredientList from "./IngredientList";
import ClaudeReceipe from "./ClaudeReceipe";
import { getRecipeFromMistral } from "../ai";
import { useRef } from "react";

const Main = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipe, setRecipe] = useState("");
  const recipeSection = useRef(null);
  console.log(recipeSection);

  useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });

      // ---same work the below code do as above---

      // const yCoord =
      //   recipeSection.current.getBoundingClientRect().top + window.scrollY;
      // window.scroll({ 
      //   top: yCoord,
      //   behavior: "smooth",
      // });
    }
  }, [recipe]);

  const ingredientsListItems = ingredients.map((ingredient) => {
    return <li key={ingredient}> {ingredient} </li>;
  });

  async function getRecipe() {
    // setRecipe((prevShown) => !prevShown);
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    setRecipe(recipeMarkdown);
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    console.log(`New ingredient: ${newIngredient}`);

    setIngredients((prevIngredients) => {
      return [...prevIngredients, newIngredient];
    });
  }

  //    * 1. Think about where the recipe response should live and how you're
  //  *    going to make sure it doesn't disappear between each state change in
  //  *    the app. (I don't mean between refreshes of your mini-browser.
  //  *    You don't need to save this to localStorage or anything more permanent
  //  *    than in React's memory for now.)
  //  *
  //  * I'm going to save the response in React state.
  //  *
  //  * 2. What action from the user should trigger getting the recipe?
  //  * When the user clicks the get a recipe button

  return (
    <>
      <main>
        <form action={addIngredient} className="add-ingredient-form">
          <input
            type="text"
            placeholder="e.g. oregano"
            aria-label="Add ingridient"
            name="ingredient"
          />
          <button
          // onClick={handleSubmit}
          >
            {" "}
            Add ingridient
          </button>
        </form>
        {ingredients.length ? (
          <IngredientList
            lists={ingredientsListItems}
            ingredient={ingredients}
            toggle={getRecipe}
            ref={recipeSection}
          />
        ) : null}

        {recipe ? <ClaudeReceipe recipe={recipe} /> : null}
      </main>
    </>
  );
};

export default Main;
