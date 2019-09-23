import RoutePrefix from './route_prefix'

const {StandardPrefix} = RoutePrefix;
export default [

  {
    path: `${StandardPrefix}/salary`,
    name: '（一）说明',
    component: () => import('@/views/standard/layout.vue'),
    meta: {
      showChildren: false,
      title: '（一）说明',
    },
  },
  {
    path: `${StandardPrefix}`,
    name: '（二）厂长经理(含)以下管理人员',
    component: () => import('@/views/standard/layout.vue'),
    meta: {
      showChildren: false,
      title: '厂长经理（含）以下管理人员'
    },
    children:[
      {
        path: `${StandardPrefix}/standard/layout`,
        name: '1.月薪执行标准',
        component: () => import('@/views/standard/layout.vue'),
        meta: {
          showChildren: false,
          title: '月薪执行标准',
          childrenDataFrom:'FINcompanyApi'
        },
        children:[
          {
            path: `${StandardPrefix}/standard_rpt`,
            name: '集团总部',
            component: () => import('@/views/standard/standard_rpt.vue'),
            meta: {
              showChildren: false,
              title: '集团总部',
            }
          }
        ]

      },
      {
        path: `${StandardPrefix}/standard/adjust/layout1`,
        name: '2.月薪标准调整',
        component: () => import('@/views/standard/layout.vue'),
        meta: {
          showChildren: false,
          title: '月薪标准调整',
          childrenDataFrom:'FINcompanyApi'
        },
        children:[
          {
            path: `${StandardPrefix}/adjust/standard_adjust`,
            name: '集团总部',
            component: () => import('@/views/standard/adjust/standard_adjust.vue'),
            meta: {
              showChildren: false,
              title: '集团总部'
            },
          }
        ]
      }
    ]
  },
  {
    path: `${StandardPrefix}/dev`,
    name: '（三）软件开发人员',
    component: () => import('@/views/standard/layout.vue'),
    meta: {
      showChildren: false,
      title: '软件开发人员'
    },
    children:[
      {
        path: `${StandardPrefix}/standard/layout`,
        name: '1.月薪执行标准',
        component: () => import('@/views/standard/layout.vue'),
        meta: {
          showChildren: false,
          title: '月薪执行标准',
          childrenDataFrom:'FINcompanyApi'
        },
        children:[
          {
            path: `${StandardPrefix}/standard_rpt`,
            name: '集团总部',
            component: () => import('@/views/standard/standard_rpt.vue'),
            meta: {
              showChildren: false,
              title: '集团总部',
            }
          }
        ]

      },
      {
        path: `${StandardPrefix}/standard/adjust/layout1`,
        name: '2.月薪标准调整',
        component: () => import('@/views/standard/layout.vue'),
        meta: {
          showChildren: false,
          title: '月薪标准调整',
          childrenDataFrom:'FINcompanyApi'
        },
        children:[
          {
            path: `${StandardPrefix}/adjust/standard_adjust`,
            name: '集团总部',
            component: () => import('@/views/standard/adjust/standard_adjust.vue'),
            meta: {
              showChildren: false,
              title: '集团总部'
            },
          }
        ]
      }
    ]
  },



]
