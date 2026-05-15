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

  // auth related setings

  const showAuthMessage = ref(false)

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

// this method calls the backend api postMkdToStorage

const passContentToApi = async (article) => {

   console.log("store", JSON.stringify(article))
   const bodyString = JSON.stringify(article)
   const body = JSON.parse(bodyString)
   console.log("markdownContent", body.content)
   console.log("markdownMeta", body.metaData)
   console.log("fileName", body.fileName)

  try{

    const response = await fetch("http://localhost:7071/api/uploadMkdToStorage", {
			method: ['POST'],
      headers: {"Content-Type": "application/text"},
			body: JSON.stringify(article)
		})

    if(!response.ok){
      throw new Error(`there was an error recieving content from the markdown dashboard: ${response.status}`)
    }

		const content = await response.json()
    console.log('sending data:', content)

  } catch(err) {
    console.error('failed to pass content to and call backend api', err)
  }
  
}

// this method calls the backend api postMkdToStorage

const articles = ref([])

// const passSeachTermToApi = async (searchTerm) => {

//   try{

//     const response = await fetch(`http://localhost:7071/api/postMkdToStorage?search=${searchTerm}`)
//     articles.value = await response.json()

//   } catch (err) {
//     console.error('failed to pass search term and call backend api', err)
//   }

// }



// post content from editor to a local location for testing

async function postContentLocal(mkValue) {

  try{

    const response = await fetch('/data/post.md', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'text/markdown',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // filename: 'post2.md',
        content: mkValue
      })
    })

    const mkObject = await response.json()
    // const mkObject = await response.text()
    // const mkObject = response.blob()
    console.log('Saved successfully:', mkObject);
    // return mkObject

  } catch(err) {
    console.error('failed to write markdown to database', err)
  }

}

  // returns from the store

  return {
    sections,
    recipeItems,
    articleItems,
    showAuthMessage,
    fetchRecipes,
    fetchRecipe,
    passContentToApi

  }

})
