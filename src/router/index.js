import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'




function isAuthenticated() {
  return !!localStorage.getItem('access_token');
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home/:id/:itemId/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'admin-home',
          component: () => import('../components/admin/AdminEntry.vue'),
        },
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../components/admin/AdminUsers.vue'),
        },
        {
          path: 'users/create',
          name: 'user-create',
          component: () => import('../components/admin/AdminUsersCreate.vue'),
        },
        {
          path: 'users/edit/:id',
          name: 'user-edit',
          component: () => import('../components/admin/AdminUsersUpdate.vue'),
        },
        {
          path: 'articles',
          name: 'admin-articles',
          component: () => import('../components/admin/AdminArticles.vue'),
        },
        {
          path: 'articles/category/create',
          name: 'category-create',
          component: () => import('../components/admin/AdminArticleCreate.vue'),
        },
        {
          path: 'articles/edit/:id',
          name: 'category-edit',
          component: () => import('../components/admin/AdminArticlesUpdate.vue'),
        },
        {
          path: 'item/create',
          name: 'item-create',
          component: () => import('../components/admin/AdminItemCreate.vue'),
        },
        {
          path: 'item/edit/:id',
          name: 'item-edit',
          component: () => import('../components/admin/AdminItemUpdate.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    if (isAuthenticated() && (to.name === 'login')) {
      next({ path: '/admin' });
    } else {
      next();
    }
  }
});


export default router
