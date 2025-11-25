import { async } from "regenerator-runtime";
export const state = {
  recipe: {},
};

export async function loadRecipe(id) {
  try {
    const response = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`
      // `https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886`
      // `https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e86b9`
    );
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(`${resData.message}, ${response.status}`);
    }
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
    alert(error);
  }
}
