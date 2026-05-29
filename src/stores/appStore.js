import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { marked } from 'marked'
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

  // auth related setings

  const showAuthMessage = ref(false)

  // production getters for recipe and store items

  const recipeItems = ref(recipesData)
  const articleItems = ref(articlesData)

  // when the markdown content data flow is set up for production I'm inclined to bring articles into the store
  // first if implementing search... might be benificial
  // articles would be a container for a get request

  const articles = ref([])

  // simulate an api call for dynamic routing experiment

  const recipes = ref([])
  const recipe = ref({})
  const isLoading = ref(false)
  const isError = ref(null)

  async function fetchRecipes() {
    isLoading.value = true
    isError.value = null

    try{

      const response = await fetch('/data/recipes-public.json')
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

    console.log("the id", id)

    try{

      const response = await fetch('/data/recipes-public.json')
      if(!response.ok) throw new Error('Failed to get data from public folder')

      const data = await response.json()
      // i might not need to parse this
      // recipe.value = JSON.parse(data).find(recipe.id === id)
      return data.recipes.find(recipe => recipe.id === id)

    } catch(err) {

      isError.value = err.message
      console.error("Fetch Error:", err);

    } finally {

      isLoading.value = false
 
    }

  }

  // Methods related to article content these methods call backent apis to post and get articles
  // from an azure blob storage 

  // this method calls the backend api uploadMkdToStorage

  const callUploadMkd = async (article) => {
    try{

      console.log("store", JSON.stringify(article))

      const response = await fetch("http://localhost:7071/api/uploadMkdToStorage", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(article)
      })

      if(!response.ok){
        const errorText = await response.text()
        throw new Error(`there was an error recieving content from the markdown dashboard: ${response.status} - ${errorText}`)
      }

      // return await response.json()

    } catch(err) {
      console.error('failed to pass content to and call backend api', err)
    }
    
  }

  // get markdown files from storage

  const htmlFromMkdFile = ref('')
  const articleMeta = ref(null)
  const isMkdLoading = ref(true)

  const callGetMkd = async (file) => {

    try {

      const response = await fetch(`http://localhost:7071/api/getMkdFromStorage?fileName=${file}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      })

      if(!response.ok) {
        throw new Error('Error Getting Markdown from backend. Check you are passing the right filename.', response.statusText)
      }

      const { markdown = '', metadata = 'none' } = await response.json()
      console.log("markdown from storage", markdown)
      console.log("metadata from storage", metadata)

      htmlFromMkdFile.value = await marked(markdown)
      isMkdLoading.value = false
      articleMeta.value = metadata

    } catch(err) {
      console.log("from store: there was an error when calling backend api", err)
      isMkdLoading.value = true
    }
    
  }

  // returns from the store

  return {
    sections,
    recipeItems,
    articleItems,
    showAuthMessage,
    htmlFromMkdFile,
    isMkdLoading,
    articleMeta,
    fetchRecipes,
    fetchRecipe,
    callUploadMkd,
    callGetMkd

  }

})
