import React, { forwardRef } from 'react'

const IngredientList = forwardRef((props, recipeSection) => {
  return (
          <section className="ingredients-section">
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">
              {props.lists}
            </ul>
            {props.ingredient.length > 3 ? (
              <div className="get-recipe-container">
                <div ref={recipeSection}>
                  <h3>Ready for a recipe?</h3>
                  <p>Generate a recipe from your list of ingredients.</p>
                </div>
                <button 
                onClick={props.toggle}
                > Get a recipe</button>
              </div>
            ) : null}
          </section>
  )
})

export default IngredientList