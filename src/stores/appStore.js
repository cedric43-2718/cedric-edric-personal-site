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
      title: 'Articles'

    },
    {
      id: 4,
      title: 'Projects'
    },
    {
      id: 5,
      title: 'Contact'
    }
  ])

  // dark mode

  const keyCount = ref(0)

  // auth related setings

  const showAuthMessage = ref(false)
  const isEditor = ref(false)

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

      const response = await fetch("https://func-cedric-edric-contactapi-d6adccexftctabaw.eastus-01.azurewebsites.net/api/uploadMkdToStorage", {
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

  // call get markdown file from storage

  const htmlFromMkdFile = ref('')
  const articleMeta = ref(null)
  const isMkdLoading = ref(true)

  const callGetMkd = async (article) => {

    try {

      const response = await fetch(`https://func-cedric-edric-contactapi-d6adccexftctabaw.eastus-01.azurewebsites.net/api/getMkdFromStorage?articleId=${article}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      })

      if(!response.ok) {
        throw new Error('Error Getting Markdown from backend. Check you are passing the right filename.')
      }

      const data = await response.json()
      // console.log('getMkdFromStorage response', data)

      const { markdown , metadata } = data

      htmlFromMkdFile.value = await marked(markdown || '')
      articleMeta.value = metadata ?? {}

    } catch(err) {
      console.log("from store: there was an error when calling backend api", err)
      articleMeta.value = {}
    } finally {
      isMkdLoading.value = false
    }
    
  }

  // call get a list of blobs from a storage container

  const latestBlobs = ref([])
  const loadedBlobs = ref(false)

  const callGetBlobs = async (containerName) => {
    try {
      const response = await fetch(`https://func-cedric-edric-contactapi-d6adccexftctabaw.eastus-01.azurewebsites.net/api/getBlobs?containerName=${containerName}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      })

      if(!response.ok) {
        throw new Error('Error Getting Blob List From Container. Check you are passing the right filename.')
      }

      const data = await response.json()
      const { fetchedBlobs } = data
      // console.log('getBlobs response', data)
      latestBlobs.value = fetchedBlobs
      loadedBlobs.value = true

    } catch(err) {
      console.log("from store: there was an error when calling backend api", err)
    }

  }

  // generate SAS url for image uploads

  const sasUploadUrl = ref('')
  const sasImageUrl = ref('')
  const ImageUrl = ref('')

  const callGetSASUrl = async (fileName, fileType) => {
    
    try {

      const params = new URLSearchParams({ fileName, fileType });
      const url = `https://func-cedric-edric-contactapi-d6adccexftctabaw.eastus-01.azurewebsites.net/api/getSASUploadUrl?${params.toString()}`;

      const response = await fetch(url, {
        method: 'GET'
      })

      if(!response.ok) {
        throw new Error('Error Getting SAS Token. Check you are passing the right filename.')
      }

      const data = await response.json()
      // console.log('getSASUploadUrl response', data)

      const { uploadUrl , imageUrl, publicImageUrl } = data
      sasUploadUrl.value = uploadUrl
      sasImageUrl.value = imageUrl
      ImageUrl.value = publicImageUrl

    } catch(err) {
      console.log("from store: there was an error when calling backend api", err)
    } 
  }

  // call getValuesFromCsv to verify logged in user has site editor role

  const userRoleExists = ref(false)

  const callGetCsv = async (email, role) => {
    try {
      const response = await fetch(`http://localhost:7071/api/getValuesFromCsv?email=${email}&role=${role}`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
      })

      if(!response.ok) {
        throw new Error('From Store: Error Getting the response.')
      }

      const data = await response.json()
      const { valueExists } = data
      console.log('getValuesFromCsv response', data)
      userRoleExists.value = valueExists
      

    } catch(err) {
      console.log("from store: there was an error when calling backend api getValuesFromCsv", err)
    }

  }



  // returns from the store

  return {
    sections,
    keyCount,
    recipeItems,
    articleItems,
    showAuthMessage,
    htmlFromMkdFile,
    isMkdLoading,
    articleMeta,
    latestBlobs,
    sasUploadUrl,
    sasImageUrl,
    ImageUrl,
    isEditor,
    loadedBlobs, 
    fetchRecipes,
    fetchRecipe,
    callUploadMkd,
    callGetMkd,
    callGetBlobs,
    callGetSASUrl
  }

})
