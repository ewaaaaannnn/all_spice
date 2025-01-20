import { AppState } from "@/AppState.js"
import { api } from "./AxiosService.js"
import { logger } from "@/utils/Logger.js"
import { Ingredient } from "@/models/Ingredient.js"

class IngredientsService {
  async createIngredient(ingredientData) {
    const response = await api.post('api/ingredients', ingredientData)
    logger.log(response.data)
    const ingredient = new Ingredient(response.data)
    AppState.ingredients.push(ingredient)
  }
  async getIngredients(recipeId) {
    AppState.ingredients = []
    const response = await api.get(`api/recipes/${recipeId}/ingredients`)
    logger.log('ingredients', response.data)
    const ingredients = response.data.map(ingredientPOJO => new Ingredient(ingredientPOJO))
    AppState.ingredients = ingredients
  }

}

export const ingredientsService = new IngredientsService