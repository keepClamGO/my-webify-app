import { Suspense, lazy } from 'react'
import { routesType } from '@/interface/types'
import { RouteObject } from 'react-router-dom'
import NProgress from '@/components/Nprogress';
const routes: routesType[] = [
    {
      path: '/',
      redirect: '/Login',
      component: lazy(() => import('@/views/Login'))
    },
    {
      path: '/Login',
      component: lazy(() => import('@/views/Login'))
    },
    { path: '/error',
      component: lazy(() => import('@/views/404')) 
    },
    {
      path: '/BasicLayout',
      component: lazy(() => import('@/views/BasicLayout')),
      children: [
        {
          path: 'UpdateCheck',
          component: lazy(() => import('@/views/RingManagement/UpdateCheck'))
        },
        {
          path: 'UploadCheck',
          component: lazy(() => import('@/views/RingManagement/uploadCheck'))
        },
        {
          path: 'Home',
          component: lazy(() => import('@/views/Home'))
        },
        {
          path: 'User',
          component: lazy(() => import('@/views/User'))
        },
        {
          path: 'Register',
          component: lazy(() => import('@/views/Register'))
        },
        {
          path: 'Error',
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
        <Suspense fallback={<NProgress/>}>
          <route.component />
        </Suspense>
      ),
      children: route.children && syncRouter(route.children)
    })
  })
  return mRouteTable
}

export default syncRouter(routes)