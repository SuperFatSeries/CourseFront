export default [
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/course' },
      {
        path: '/course',
            name: 'course',
            icon: 'profile',
            routes:[
              // course
              {
                path: '/course',
                name: 'course',
                component: './Course/CourseList',
              },
              // coursedetail
              {
                path: '/course/:courseId',
                name: 'coursedetail',
                component: './Course/CourseDetail',
                routes:[
                  {
                    path: '/course/:courseId',
                    redirect: '/course/:courseId/info',
                  },
                  // courseInfo
                  {
                    path: '/course/:courseId/info',
                    component: './Course/Info/CourseInfo',
                  },
                  // coursewares
                  {
                    path: '/course/:courseId/ware',
                    component: './Course/Ware/Coursewares',
                  },
                  // coursedetail
                  {
                    path: '/course/:courseId/homework',
                    component: './Course/Homework/Homeworks',
                  },
                ],
              },
            ],
      },
      {
        component: '404',
      },
    ],
  },
];
