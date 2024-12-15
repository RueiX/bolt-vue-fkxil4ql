import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/workflow',
      component: Layout,
      redirect: '/workflow/list',
      name: 'Workflow',
      meta: { title: '工作流管理' },
      children: [
        {
          path: 'list',
          component: () => import('@/views/workflow/ProcessList.vue'),
          name: 'ProcessList',
          meta: { title: '流程列表' }
        },
        {
          path: 'start',
          component: () => import('@/views/workflow/StartProcess.vue'),
          name: 'StartProcess',
          meta: { title: '发起流程' }
        },
        {
          path: 'approval/:id',
          component: () => import('@/views/workflow/ProcessApproval.vue'),
          name: 'ProcessApproval',
          meta: { title: '流程审批' }
        }
      ]
    }
  ]
})

export default router