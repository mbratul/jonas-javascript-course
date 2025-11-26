import { async } from "regenerator-runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";
export const state = {
  recipe: {},
};

export async function loadRecipe(id) {
  try {
    const resData = await getJSON(`${API_URL}/${id}`);
    const { recipe } = resData.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (error) {
    //temporary erro handling
    console.error(`${error} 🔥🔥🔥🔥`);
  }
}
