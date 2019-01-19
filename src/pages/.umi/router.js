import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/lxx/git/SFSNew/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/BasicLayout'),
  LoadingComponent: require('/Users/lxx/git/SFSNew/src/components/PageLoading/index').default,
}),
    "Routes": [require('../Authorized').default],
    "authority": [
      "admin",
      "user"
    ],
    "routes": [
      {
        "path": "/",
        "redirect": "/course",
        "exact": true
      },
      {
        "path": "/course",
        "name": "course",
        "icon": "profile",
        "routes": [
          {
            "path": "/course",
            "name": "course",
            "component": _dvaDynamic({
  
  component: () => import('../Course/CourseList'),
  LoadingComponent: require('/Users/lxx/git/SFSNew/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/course/:courseId",
            "name": "coursedetail",
            "component": _dvaDynamic({
  
  component: () => import('../Course/CourseDetail'),
  LoadingComponent: require('/Users/lxx/git/SFSNew/src/components/PageLoading/index').default,
}),
            "routes": [
              {
                "path": "/course/:courseId",
                "redirect": "/course/:courseId/info",
                "exact": true
              },
              {
                "path": "/course/:courseId/info",
                "component": _dvaDynamic({
  
  component: () => import('../Course/Info/CourseInfo'),
  LoadingComponent: require('/Users/lxx/git/SFSNew/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/course/:courseId/ware",
                "component": _dvaDynamic({
  
  component: () => import('../Course/Ware/Coursewares'),
  LoadingComponent: require('/Users/lxx/git/SFSNew/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "path": "/course/:courseId/homework",
                "component": _dvaDynamic({
  
  component: () => import('../Course/Homework/Homeworks'),
  LoadingComponent: require('/Users/lxx/git/SFSNew/src/components/PageLoading/index').default,
}),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/Users/lxx/git/SFSNew/node_modules/_umi-build-dev@1.4.3@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/Users/lxx/git/SFSNew/node_modules/_umi-build-dev@1.4.3@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": _dvaDynamic({
  
  component: () => import('../404'),
  LoadingComponent: require('/Users/lxx/git/SFSNew/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/Users/lxx/git/SFSNew/node_modules/_umi-build-dev@1.4.3@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/lxx/git/SFSNew/node_modules/_umi-build-dev@1.4.3@umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
