const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
// console.log("this is a test");

const apikey = "3b9fff7a-46b6-4af2-b1d7-f8c16b4f96b5";
async function showRecipe() {
  try {
    const response = await fetch(
      // `https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886`
      `https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e86b9`
    );
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(`${resData.message}, ${response.status}`);
    }
    let { recipe } = resData.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);
  } catch (error) {
    alert(error);
  }
}
showRecipe();
