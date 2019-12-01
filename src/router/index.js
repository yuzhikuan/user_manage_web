import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/user-manage/list'
  },

  {
    path: '/user-manage',
    component: Layout,
    redirect: '/user-manage/list',
    name: 'UserManage',
    meta: { title: '用户管理', icon: 'user-management' },
    children: [
      {
        path: 'list',
        name: 'UserManageList',
        component: () => import('@/views/user-manage/index'),
        meta: { title: '用户管理列表', icon: 'gyyonghuliebiao' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
