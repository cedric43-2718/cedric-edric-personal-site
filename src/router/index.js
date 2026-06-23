import { createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue'
import { useGeneralStore } from '@/stores/appStore'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ContactView from '../views/ContactView.vue'
import ArticlesPreview from '../views/ArticlesPreview.vue'
import RecipeDetails from '../views/RecipeDetails.vue'
import ArticleDetails from '@/views/ArticleDetails.vue'
import LoginSuccess from '@/views/LoginSuccess.vue'
import EditArticles from '@/views/EditArticles.vue'
import Project1 from '../views/Project_ACI.vue'
import Project2 from '../views/Project_Reading.vue'
import { getUserInfo } from '@/composables/getAuthInfo'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'one',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesPreview,
      beforeEnter: async (to, from) => {
        const articleStore = useGeneralStore()

        if(from.path === '/create-edit-articles') {
          await articleStore.callGetBlobs('markdown-files')
        } else {
          articleStore.callGetBlobs('markdown-files')
        }
        
      },
      children: [
        {
          path: 'recipe/:id',
          name: 'recipe-details',
          props: true,
          component: RecipeDetails,
          meta: { hideNav: true } 
        },
        {
          path: 'article/:id',
          name: 'article-details',
          props: true,
          component: ArticleDetails,
          meta: { hideNav: true } 
        },
      ]
    },
    {
      path: '/projects/',
      name: 'projects',
      component: ProjectsView,
      children: [
        {
          path: 'aci-explorer',
          component: Project1
        },
        {
          path: 'knowledge',
          component: Project2
        }
      ]
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    {
      path: '/login-success',
      name: 'login-success',
      component: LoginSuccess
    },
    {
      path: '/create-edit-articles',
      name: 'edit-articles',
      component: EditArticles,
      beforeEnter: async (to, from, next) => {

        const generalStore = useGeneralStore()

        const authDetails = await getUserInfo()
        await generalStore.callGetCsv(authDetails.userDetails, 'editor')

        // for testing
        // generalStore.isEditor = true

       if(generalStore.isEditor) {
          generalStore.updateUser(authDetails.userDetails)
          next()
        } else {
            generalStore.showAuthMessage = true
            setTimeout(() => {
              next('/login-success')
              generalStore.showAuthMessage = false
            }, 4000);
        }
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
