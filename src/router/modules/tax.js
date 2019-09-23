import RoutePrefix from './route_prefix'

const {TaxPrefix} = RoutePrefix;
// const {HirePrefix} = RoutePrefix;
export default [

  //
  // {
  //   path: `${TaxPrefix}/tax`,
  //   name: '个税管理',
  //   component: () => import('@/views/tax/layout.vue'),
  //   meta: {
  //     showChildren: false,
  //     title: '个税管理'
  //   },
  //   children: [
  //     {
  //       path: `${TaxPrefix}/tax/person_deduct_detail_list`,
  //       name: '专项附加扣除信息表',
  //       component: () => import('@/views/tax/person_deduct_detail_list.vue'),
  //       meta: {
  //         showChildren: false,
  //         title: '专项附加扣除信息表'
  //       }
  //     },
  //     {
  //       path: `${TaxPrefix}/tax`,
  //       name: '当月预缴税款计算',
  //       component: () => import('@/views/tax/person_deduct_calculate_list.vue'),
  //       meta: {
  //         showChildren: false,
  //         title: '当月预缴税款计算',
  //       },
  //     }
  //   ]
  // },

]
