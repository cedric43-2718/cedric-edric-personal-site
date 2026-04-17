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

  const recipeItems = ref(recipesData)
  const articleItems = ref(articlesData)

  // function addArticle(article){
  //   articleItems.value.data.push({
  //     name: article,
  //   })
  // }

  return {
    sections,
    recipeItems,
    articleItems
  }

})
