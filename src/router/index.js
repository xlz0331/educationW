import Vue from 'vue'
import Router from 'vue-router'
import _RoutePrefix from './modules/route_prefix'

const {StandardPrefix, TaxPrefix, HirePrefix, SalaryPrefix, CalcSalaryPrefix} = _RoutePrefix

import {StandardChildren, TaxChildren, HireChildren, SalaryChildren, CalcSalaryChildren} from './modules'
/* Layout */
import Layout from '@/views/layout'
import HomeLayout from '@/views/layout/home_index'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'Default',
    hidden: true,
    redirect: '/home'
    // redirect: window.global_config.IS_FLOW ? '/approval/waitting/waitting_approval_list' : '/home'
  },
  {
    path: '/home/layout',
    name: '首页',
    component: HomeLayout,
    hidden: true,
    children: [
      {
        path: '/home',
        name: '首页',
        component: () => import('@/views/home/index.vue'),
        hidden: true
      },
      {
        path: '/approval/home',
        name: '审核审批首页',
        component: () => import('@/views/home/approve_index.vue'),
        hidden: true
      }
    ]
  },
  {
    path: '/readcard',
    name: '身份证校验',
    component: HomeLayout,
    hidden: true,
    children: [
      {
        path: '/readcard',
        name: '身份证校验',
        component: () => import('@/views/home/read-card.vue'),
        hidden: true
      }
    ]
  },

  {
    path: `${TaxPrefix}`,
    name: '一、薪酬标准（待完善）',
    component: Layout,
    meta: {
      showChildren: false,
      title: '一、薪酬体系（待完善）',
      icon: 'fa-product-hunt'
    },
    // children: StandardChildren
  },
  {
    path: `/3`,
    name: '二、个人薪酬执行（待完善）',
    component: Layout,
    meta: {
      showChildren: false,
      title: '二、个人薪酬执行',
      icon: 'fa-product-hunt'
    }
    // children: TaxChildren
  },
  {
    path: `${HirePrefix}`,
    name: '三、预注册人员薪酬',
    component: Layout,
    meta: {
      showChildren: false,
      title: '三、预注册人员薪酬',
      icon: 'fa-product-hunt'
    },
    children: HireChildren
  },
  {
    path: `${SalaryPrefix}`,
    name: '四、月工资发放计算',
    component: Layout,
    meta: {
      showChildren: false,
      title: '四、月工资发放计算',
      icon: 'fa-product-hunt'
    },
    children: SalaryChildren
  },
  {
    path: `${CalcSalaryPrefix}`,
    name: '五、月工资发放审核',
    component: Layout,
    meta: {
      showChildren: false,
      title: '五、月工资发放审核',
      childrenDataFrom: 'gradeApi',
      icon: 'fa-product-hunt'
    },
    children: CalcSalaryChildren
  },
  {
    path: `/6`,
    name: '六、薪酬统计报表（待完善）',
    component: Layout,
    meta: {
      showChildren: false,
      title: '五、薪酬统计报表',
      icon: 'fa-product-hunt'
    }
    // children: TaxChildren
  },
  {
    path: `${SalaryPrefix}/system`,
    name: '七、系统权限管理',
    component: Layout,
    meta: {
      showChildren: false,
      title: '七、系统权限管理',
      icon: 'fa-product-hunt'
    },
    children: [
      {
        path: `${SalaryPrefix}/system/grade_category_list`,
        name: '工资职等【分组类别维护】',
        component: () => import('@/views/salary/system/grade_category_list.vue'),
        meta: {
          showChildren: false,
          title: '工资职等【分组类别维护】'
        }
      },
      {
        path: `${HirePrefix}/hire/hire_edit_right`,
        name: '预注册职级权限配置',
        component: () => import('@/views/hire/hire_edit_right.vue'),
        meta: {
          title: '预注册职级权限配置',
          showChildren: false,
          noChildren: true,
        },
      },

    ]
  },

  {
    path: `${HirePrefix}/hire/hire_borrow_file`,
    name: '入职借条',
    component: () => import('@/views/hire/hire_borrow_file.vue'),
    meta: {
      showChildren: false,
      title: '入职借条',
      noChildren: true
    },
    hidden: true
  },
  {
    path: `${HirePrefix}/hire/hire_salary_confirm_file`,
    name: '入职薪酬确认书',
    component: () => import('@/views/hire/hire_salary_confirm_file.vue'),
    meta: {
      showChildren: false,
      title: '入职薪酬确认书',
      noChildren: true
    },
    hidden: true
  },
  {
    path: `${HirePrefix}/hire/hire_salary_confirm_file1`,
    name: '入职薪酬确认书',
    component: () => import('@/views/hire/hire_salary_confirm_file1.vue'),
    meta: {
      showChildren: false,
      title: '入职薪酬确认书',
      noChildren: true
    },
    hidden: true
  },

  {
    path: `/approval`,
    name: '入职薪酬审批',
    component: Layout,
    meta: {
      showChildren: false,
      title: '入职薪酬审批',
      icon: 'fa-product-hunt'
    },
    children: [
      {
        path: `/approval/waitting/detail_prepare_draft`,
        name: '拟稿人拟稿界面',
        component: () => import('@/views/approval/waitting/detail_prepare_draft.vue'),
        meta: {
          showChildren: false,
          title: '拟稿人拟稿界面',
          noChildren: true,
        },
        hidden: true
      },
      {
        path: `/approval/waitting/detail_prepare_draft_demo`,
        name: '拟稿人拟稿界面Demo',
        component: () => import('@/views/approval/waitting/detail_prepare_draft_demo.vue'),
        meta: {
          showChildren: false,
          title: '拟稿人拟稿界面',
          noChildren: true,
        },
        hidden: true
      },
      {
        path: `/approval/waitting/detail_audit`,
        name: '审核人审核',
        component: () => import('@/views/approval/waitting/detail_audit.vue'),
        meta: {
          showChildren: false,
          title: '审核人审核',
          noChildren: true,
        },
        hidden: true
      },
      {
        path: `/approval/waitting/detail_approve`,
        name: '审批人审批',
        component: () => import('@/views/approval/waitting/detail_audit.vue'),
        meta: {
          showChildren: false,
          title: '审批人审批',
          noChildren: true,
        },
        hidden: true
      },
      {
        path: `/approval/waitting/detail_view`,
        name: '查看',
        component: () => import('@/views/approval/waitting/detail_view.vue'),
        meta: {
          showChildren: false,
          title: '审批人审批',
          noChildren: true,
        },
        hidden: true
      },

      {
        path: `/approval/default`,
        name: '一、系统说明',
        component: () => import('@/views/approval/default.vue'),
        meta: {
          showChildren: false,
          title: '系统说明',
          noChildren: true,
        }
      },
      {
        path: `/approval/waitting/layout`,
        name: '二、公文拟稿发起',
        component: () => import('@/views/approval/layout.vue'),
        meta: {
          showChildren: false,
          title: '公文拟稿发起',
          checkUser:true,
          childrenDataFrom: 'subjectApi'//存在动态接口数据的  children:的第一个对象为动态菜单的路径
        },
        children: [
          {
            path: `/approval/doc/doc_draft/create`,
            name: '薪酬调整',
            component: () => import('@/views/approval/doc/doc_draft_create.vue'),
            meta: {
              showChildren: false,
              title: '薪酬调整',
              noChildren: true,
              subjectType: 2,
            }
          },

          {
            path: `/approval/doc/doc_draft`,
            name: '薪酬调整拟稿',
            component: () => import('@/views/approval/doc/doc_draft.vue'),
            meta: {
              showChildren: false,
              title: '薪酬调整拟稿(修改界面)',
              noChildren: true,
            },
            hidden: true
          },
          {
            path: `/approval/doc/doc_audit`,
            name: '薪酬调整审核、审批',
            component: () => import('@/views/approval/doc/doc_audit.vue'),
            meta: {
              showChildren: false,
              title: '薪酬调整审核、审批',
              noChildren: true
            },
            hidden: true
          },
          {
            path: `/approval/doc/doc_view`,
            name: '薪酬调整查看',
            component: () => import('@/views/approval/doc/doc_view.vue'),
            meta: {
              showChildren: false,
              title: '薪酬调整审核、审批',
              noChildren: true
            },
            hidden: true
          },


        ]
      },
      {
        path: `/approval/waitting/waitting_approval_list`,
        name: '三、待审核审批公文',
        component: () => import('@/views/approval/waitting/waitting_approval_list.vue'),
        meta: {
          showChildren: false,
          title: '待审核审批公文',
          noChildren: true,
        }
      },
      {
        path: `/approval/in/approval_in_list`,
        name: '四、公文办理进度查询',
        component: () => import('@/views/approval/in/approval_in_list.vue'),
        meta: {
          title: '公文办理进度查询',
          showChildren: false,
          noChildren: true,
        },
      },
      {
        path: `/approval/done`,
        name: '五、已审批公文查询',
        component: () => import('@/views/approval/layout.vue'),
        meta: {
          showChildren: false,
          title: '已审批公文查询',
          childrenDataFrom: 'allSubjectApi'//存在动态接口数据的  children:的第一个对象为动态菜单的路径
        },
        children: [
          {
            path: `/approval/done/approval_done_list`,
            name: '已审批公文查询',
            component: () => import('@/views/approval/done/approval_done_list.vue'),
            meta: {
              title: '已审批公文查询',
              showChildren: false,
              noChildren: true
            }
          }
        ]
      },
      {
        path: `/approval/system`,
        name: '六、基础资料维护',
        component: () => import('@/views/approval/layout.vue'),
        meta: {
          checkUser:true,
          title: '基础资料',
          showChildren: false,
        },
        children: [
          {
            path: `/approval/system/subject_list`,
            name: '公文主题维护',
            component: () => import('@/views/approval/system/subject_list.vue'),
            meta: {
              title: '公文主题维护',
              showChildren: false,
              noChildren: true
            },
          },


        ]
      }

    ]
  }

]
export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
