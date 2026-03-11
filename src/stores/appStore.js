import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGeneralStore = defineStore('content',{
  state: () => {
    return {
      sections: [
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
      ],
      cart: []
    }
  },
  actions: {
    async getWorks(){
      
    }
  }
})