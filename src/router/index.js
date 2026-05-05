import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ContactView from '../views/ContactView.vue'
import ArticleDetails from '../views/ArticleDetails.vue'
import LoginSuccess from '@/views/LoginSuccess.vue'
import EditArticles from '@/views/EditArticles.vue'
import Project1 from '../views/Project_ACI.vue'
import Project2 from '../views/Project_Reading.vue'
import Project3 from '../views/Project_Cooking.vue'
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
        },
        {
          path: 'cooking',
          component: Project3,
          children: [
            {
              path: ':id',
              name: 'article-details',
              props: true,
              component: ArticleDetails,
              meta: { hideNav: true } 
            }
          ]
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
        
        const authDetails = await getUserInfo()
        console.log(authDetails)
        const isAdmin = authDetails.userDetails === 'ecedric311@gmail.com' ? true : false;

        if(isAdmin) {
          next()
        } else {
          alert('You need to be a site admin to access this page. Contact Jason to get access...')
          next('/')
        }
      }
    },
    
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
