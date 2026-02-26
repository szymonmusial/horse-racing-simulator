import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'race',
    component: () => import('@/views/RaceView.vue'),
  },
]

export default routes
