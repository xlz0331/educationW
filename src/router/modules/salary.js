import RoutePrefix from './route_prefix'

const {SalaryPrefix} = RoutePrefix;
export default [

  {
    path: `${SalaryPrefix}/salary`,
    name: '（一）未休年休假补助',
    component: () => import('@/views/salary/layout.vue'),
    meta: {
      showChildren: false,
      title: '（一）未休年休假补助',
      // childrenDataFrom:'gradeApi'
    },
    children: [
      {
        path: `${SalaryPrefix}/salary`,
        name: '1.未休年休假补助计算表',
        component: () => import('@/views/salary/layout.vue'),
        meta: {
          showChildren: false,
          title: '未休年休假补助计算表',
          childrenDataFrom:'FINcompanyApi'
        },
        children:[
          {
            path: `${SalaryPrefix}/salary/subsidy_year_vacation_list`,
            name: '集团总部',
            component: () => import('@/views/salary/subsidy_year_vacation_list.vue'),
            meta: {
              keepAlive: true,  //使用缓存
              showChildren: false,
              title: '集团总部'
            },
          },
        ]
      },
      {
        path: `${SalaryPrefix}/subsidy_year_vacation_stand`,
        name: '2.未休年休假补助标准维护表',
        component: () => import('@/views/salary/subsidy_year_vacation_stand.vue'),
        meta: {
          showChildren: false,
          title: '未休年休假补助标准维护表'
        },

      },
      {
        path: `${SalaryPrefix}/subsidy_year_vacation_stand_his`,
        name: '（二）未休年休假【补助标准历史查询】表',
        component: () => import('@/views/salary/subsidy_year_vacation_stand_his.vue'),
        meta: {
          showChildren: false,
          title: '（二）未休年休假【补助标准历史查询】表'
        },
        hidden:true
      },
    ]
  },
  {
    path: `${SalaryPrefix}/tax`,
    name: '（二）个人所得税计算',
    component: () => import('@/views/salary/layout.vue'),
    meta: {
      showChildren: false,
      title: '个人所得税计算'
    },
    children:[
      {
        path: `${SalaryPrefix}/tax/layout`,
        name: '1.专项附加扣除信息表',
        component: () => import('@/views/salary/layout.vue'),
        meta: {
          showChildren: false,
          title: '专项附加扣除信息表',
          childrenDataFrom:'FINcompanyApi'
        },
        children:[
          {
            path: `${SalaryPrefix}/tax/person_deduct_detail_list`,
            name: '集团总部',
            component: () => import('@/views/salary/tax/person_deduct_detail_list.vue'),
            meta: {
              showChildren: false,
              title: '集团总部',
            }
          }
        ]

      },
      {
        path: `${SalaryPrefix}/tax/layout1`,
        name: '2.当月预缴税款计算',
        component: () => import('@/views/salary/layout.vue'),
        meta: {
          showChildren: false,
          title: '当月预缴税款计算',
          childrenDataFrom:'FINcompanyApi'
        },
        children:[
          {
            path: `${SalaryPrefix}/tax/person_deduct_calculate_list`,
            name: '集团总部',
            component: () => import('@/views/salary/tax/person_deduct_calculate_list.vue'),
            meta: {
              showChildren: false,
              title: '集团总部'
            },
          }
        ]
      }
    ]
  },

  // {
  //   path: `${SalaryPrefix}/salary`,
  //   name: '（二）月工资发放审核',
  //   component: () => import('@/views/salary/layout.vue'),
  //   meta: {
  //     showChildren: false,
  //     title: '月工资发放审核',
  //     childrenDataFrom:'gradeApi'
  //   },
  //   children: [
  //     {
  //       path: `${SalaryPrefix}/salary/salary_pay_audit_list`,
  //       name: '集团总部副总以上人员',
  //       component: () => import('@/views/salary/salary_pay_audit_list.vue'),
  //       meta: {
  //         keepAlive: true,  //使用缓存
  //         showChildren: false,
  //         title: '集团总部'
  //       },
  //     },
  //
  //     {
  //       path: `${SalaryPrefix}/salary/salary_month_standard_list`,
  //       name: '月发工资标准',
  //       component: () => import('@/views/salary/salary_month_standard_list.vue'),
  //       meta: {
  //         showChildren: false,
  //         title: '月发工资标准'
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: `${SalaryPrefix}/salary/salary_people_distribute`,
  //       name: '职级人数分布',
  //       component: () => import('@/views/salary/salary_people_distribute.vue'),
  //       meta: {
  //         showChildren: false,
  //         title: '职级人数分布'
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: `${SalaryPrefix}/salary/salary_detail_list`,
  //       name: '实发工资明细',
  //       component: () => import('@/views/salary/salary_detail_list.vue'),
  //       meta: {
  //         showChildren: false,
  //         title: '实发工资明细'
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: `${SalaryPrefix}/salary/salary_detail_award_list`,
  //       name: '奖扣项目明细',
  //       component: () => import('@/views/salary/salary_detail_award_list.vue'),
  //       meta: {
  //         showChildren: false,
  //         title: '奖扣项目明细'
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: `${SalaryPrefix}/salary/salary_detail_tax_list`,
  //       name: '个人所得税计算',
  //       component: () => import('@/views/salary/salary_detail_tax_list.vue'),
  //       meta: {
  //         showChildren: false,
  //         title: '个人所得税计算'
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: `${SalaryPrefix}/salary/salary_employee_diff_list`,
  //       name: '本月人员变动审核',
  //       component: () => import('@/views/salary/salary_employee_diff_list.vue'),
  //       meta: {
  //         showChildren: false,
  //         title: '本月人员变动审核'
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: `${SalaryPrefix}/salary/salary_detail_change_list`,
  //       name: '与上月工资对比审核',
  //       component: () => import('@/views/salary/salary_detail_change_list.vue'),
  //       meta: {
  //         showChildren: false,
  //         title: '与上月工资对比审核'
  //       },
  //       hidden: true
  //     },
  //   ]
  // },


]
