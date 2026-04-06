import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import articleData from '@/data/articles.json'

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
    }
  ])

  const articleItems = ref(articleData)

  function addArticle(article){
    articleItems.value.data.push({
      name: article,
    })
  }

  return {
    sections,
    articleItems,
    addArticle
  }

})
