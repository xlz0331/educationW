import RoutePrefix from './route_prefix'

const {CalcSalaryPrefix} = RoutePrefix;
export default [
  {
    path: `${CalcSalaryPrefix}/salary/salary_pay_audit_list`,
    name: '集团总部副总以上人员',
    component: () => import('@/views/salary/salary_pay_audit_list.vue'),
    meta: {
      keepAlive: true,  //使用缓存
      showChildren: false,
      title: '集团总部'
    },
  },

  {
    path: `${CalcSalaryPrefix}/salary/salary_month_standard_list`,
    name: '月发工资标准',
    component: () => import('@/views/salary/salary_month_standard_list.vue'),
    meta: {
      showChildren: false,
      title: '月发工资标准'
    },
    hidden: true
  },
  {
    path: `${CalcSalaryPrefix}/salary/salary_people_distribute`,
    name: '职级人数分布',
    component: () => import('@/views/salary/salary_people_distribute.vue'),
    meta: {
      showChildren: false,
      title: '职级人数分布'
    },
    hidden: true
  },
  {
    path: `${CalcSalaryPrefix}/salary/salary_detail_list`,
    name: '实发工资明细',
    component: () => import('@/views/salary/salary_detail_list.vue'),
    meta: {
      showChildren: false,
      title: '实发工资明细'
    },
    hidden: true
  },
  {
    path: `${CalcSalaryPrefix}/salary/salary_detail_award_list`,
    name: '奖扣项目明细',
    component: () => import('@/views/salary/salary_detail_award_list.vue'),
    meta: {
      showChildren: false,
      title: '奖扣项目明细'
    },
    hidden: true
  },
  {
    path: `${CalcSalaryPrefix}/salary/salary_detail_tax_list`,
    name: '个人所得税计算',
    component: () => import('@/views/salary/salary_detail_tax_list.vue'),
    meta: {
      showChildren: false,
      title: '个人所得税计算'
    },
    hidden: true
  },
  {
    path: `${CalcSalaryPrefix}/salary/salary_employee_diff_list`,
    name: '本月人员变动审核',
    component: () => import('@/views/salary/salary_employee_diff_list.vue'),
    meta: {
      showChildren: false,
      title: '本月人员变动审核'
    },
    hidden: true
  },
  {
    path: `${CalcSalaryPrefix}/salary/salary_detail_change_list`,
    name: '与上月工资对比审核',
    component: () => import('@/views/salary/salary_detail_change_list.vue'),
    meta: {
      showChildren: false,
      title: '与上月工资对比审核'
    },
    hidden: true
  },
  // {
  //   path: `${CalcSalaryPrefix}/salary`,
  //   name: '（二）月工资发放审核',
  //   component: () => import('@/views/salary/layout.vue'),
  //   meta: {
  //     showChildren: false,
  //     title: '月工资发放审核',
  //     childrenDataFrom:'gradeApi'
  //   },
  //   children: [
  //
  //   ]
  // },


]
