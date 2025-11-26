import { TIMEOUT_SEC } from "./config.js";
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export async function getJSON(url) {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    // const response = await fetch(url);
    // `https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886`
    // `https://forkify-api.jonas.io/api/v2/recipes/664c8f193e7aa067e94e86b9`
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(`${resData.message}, ${response.status}`);
    }
    return resData;
  } catch (error) {
    throw error;
  }
}
