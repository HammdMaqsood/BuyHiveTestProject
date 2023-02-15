import { createRouter, createWebHistory } from 'vue-router'
import Showblog from '../components/Showblog.vue'
// import SingleBlog from '../components/SingleBlog.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ShowBlog',
      component: Showblog,
    },
    
    
    
  ]
})

export default router
