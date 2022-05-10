import { Suspense, lazy } from 'react'
import { routesType } from '@/interface/types'
import { useRoutes, RouteObject } from 'react-router-dom'
const routes: routesType[] = [
    // {
    //   path: '/',
    //   redirect: '/Login'
    // },
    {
      path: '/Login',
      component: lazy(() => import('@/views/Login'))
    },
    { path: '/error',
      component: lazy(() => import('@/views/404')) 
    },
    {
      path: '/',
      component: lazy(() => import('@/views/BasicLayout')),
      children: [
        {
          path: '/Home',
          component: lazy(() => import('@/views/Home'))
        },
        {
          path: '/User',
          component: lazy(() => import('@/views/User'))
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