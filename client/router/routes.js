import { lazy } from 'react';

export default [{
  path: '/',
  name: 'HomePage',
  Component: lazy(() => import(/* webpackChunkName: "push" */ '@/pages/home')),
},{
  path: '/push',
  name: 'PushPage',
  Component: lazy(() => import(/* webpackChunkName: "push" */ '@/pages/push')),
}, {
  path: '/pull',
  name: 'PullPage',
  Component: lazy(() => import(/* webpackChunkName: "pull" */ '@/pages/pull')),
}];
