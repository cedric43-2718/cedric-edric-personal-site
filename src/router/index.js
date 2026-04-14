import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ContactView from '../views/ContactView.vue'
import Project1 from '../views/Project_ACI.vue'
import Project2 from '../views/Project_Reading.vue'
import Project3 from '../views/Project_Cooking.vue'

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
          component: Project3
        }
      ]
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    },
    
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

export default router
