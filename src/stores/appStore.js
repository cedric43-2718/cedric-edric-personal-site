import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import recipesData from '@/data/recipes.json'
import articlesData from '@/data/articles.json'

export const useGeneralStore = defineStore('content', () => {

  const sections = ref([
    {
      id: 1,
      title: 'One'
    },
    {
      id: 2,
      title: 'About'
    },
    {
      id: 3,
      title: 'Projects'
    },
    {
      id: 3,
      title: 'Contact'
    }
  ])

  // production getters for recipe and store items

  const recipeItems = ref(recipesData)
  const articleItems = ref(articlesData)

  // simulate an api call for dynamic routing experiment

  const recipes = ref([])
  const recipe = ref({})
  const isLoading = ref(false)
  const isError = ref(null)

  async function fetchRecipes() {
    isLoading.value = true
    isError.value = null

    try{

      const response = await fetch('/public/data/recipes-public.json')
      if(!response.ok) throw new Error('Failed to get data from public folder')

      const data = await response.json()
      recipes.value = data

    } catch(err) {

      isError.value = err.message
      console.error("Fetch Error:", err);

    } finally {

      isLoading.value = false

    }

  }

  async function fetchRecipe(id) {
    isLoading.value = true
    isError.value = null

    try{

      const response = await fetch('/public/data/recipes-public.json')
      if(!response.ok) throw new Error('Failed to get data from public folder')

      const data = await response.json()
      // i might not need to parse this
      recipe.value = JSON.parse(data).find(recipe.id === id)

    } catch(err) {

      isError.value = err.message
      console.error("Fetch Error:", err);

    } finally {

      isLoading.value = false

    }

  }

  // returns from the store

  return {
    sections,
    recipeItems,
    articleItems,
    fetchRecipes,
    fetchRecipe

  }

})
