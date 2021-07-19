import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};


export const loadRecipe = async function (id) {
  try{
     const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=ef74606c-99d7-4aa8-8e84-e7d1164b3d66`
  );
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  console.log(res, data);
  //let {recipe} = data.data <--- the same as bottom
  const recipe = data.data.recipe;
  state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    image: recipe.image_url,
  };

console.log(state.recipe);
  } catch (err){
    alert(err);
  }
}
