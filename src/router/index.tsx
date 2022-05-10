import { Suspense, lazy } from 'react'
import { routesType } from '@/interface/types'
import { useRoutes, RouteObject } from 'react-router-dom'
// import BasicLayout from '@/views/BasicLayout'
const routes: routesType[] = [
    {
      path: '/',
      component: lazy(() => import('@/views/BasicLayout')),
      children: [
        {
          path: '/Home',
          component: lazy(() => import('@/views/Home'))
        },
        {
          path: '/Index',
          component: lazy(() => import('@/views/Index'))
        },
        {
          path: '/User',
          component: lazy(() => import('@/views/User'))
        },
        {
          path: '/Login',
          component: lazy(() => import('@/views/Login'))
        },
        {
          path: '/Register',
          component: lazy(() => import('@/views/Register'))
        },
        {
          path: '/Error',
          component: lazy(() => import('@/views/Error'))
        },
      ]
    },
    {
      path: '/404',
      component: lazy(() => import('@/views/404'))
    }
];
const syncRouter = (table: routesType[]): RouteObject[] => {
  let mRouteTable: routesType[] = []
  table.forEach(route => {
    mRouteTable.push({
      path: route.path,
      element: (
        <Suspense fallback={''}>
          <route.component />
        </Suspense>
      ),
      children: route.children && syncRouter(route.children)
    })
  })
  return mRouteTable
}

export default syncRouter(routes)