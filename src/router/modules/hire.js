import RoutePrefix from './route_prefix'

const { HirePrefix } = RoutePrefix
// const {HirePrefix} = RoutePrefix;
export default [
  {
    path: `${HirePrefix}/hire`,
    name: '（一）【入职薪酬】报批',
    component: () => import('@/views/hire/layout.vue'),
    meta: {
      showChildren: false,
      title: '【入职薪酬】报批',
      childrenDataFrom: 'companyApi'
    },
    children: [
      {
        path: `${HirePrefix}/hire/approval/entry_pay_list`,
        name: '【入职薪酬】报批表',
        component: () => import('@/views/hire/approval/entry_pay_list.vue'),
        meta: {
          showChildren: false,
          title: '【入职薪酬】报批表'
        }
      },

      {
        path: `${HirePrefix}/hire/approval/entry_pay_add`,
        name: '【入职薪酬】录入表',
        component: () => import('@/views/hire/approval/entry_pay_add.vue'),
        meta: {
          showChildren: false,
          title: '【入职薪酬】录入表',
        },
        hidden: true
      },

      {
        path: `${HirePrefix}/hire/approval/entry_pay_add_demo`,
        name: '【入职薪酬】录入表(demo)',
        component: () => import('@/views/approval/waitting/entry_pay_add_demo.vue'),
        meta: {
          showChildren: false,
          title: '【入职薪酬】录入表(demo)',
        },
        hidden: true
      },
    ]
  },
  {
    path: `${HirePrefix}/hire`,
    name: '（二）【谈薪不成功】明细',
    component: () => import('@/views/hire/layout.vue'),
    meta: {
      showChildren: false,
      childrenDataFrom: 'companyApi',
      title: '【谈薪不成功】明细'
    },
    children: [
      {
        path: `${HirePrefix}/hire/notEntry/entry_not_pay_list`,
        name: '1.【谈薪不成功】明细',
        component: () => import('@/views/hire/notEntry/entry_not_pay_list.vue'),
        meta: {
          showChildren: false,
          title: '【谈薪不成功】明细'
        },
        hidden: true
      },
    ]
  },
  {
    path: `${HirePrefix}/hire`,
    name: '（三）【入职薪酬已审批】明细',
    component: () => import('@/views/hire/layout.vue'),
    meta: {
      showChildren: false,
      title: '【入职薪酬已审批】明细'
    },
    children: [
      {
        path: `${HirePrefix}/hire/hire_entry_before1`,
        name: '1.【入职薪酬已审批待入职】明细',
        component: () => import('@/views/hire/layout.vue'),
        meta: {
          childrenDataFrom: 'companyApi',
          showChildren: false,
          title: '【入职薪酬已审批待入职】明细'
        },
        children: [
          {
            path: `${HirePrefix}/hire/hire_entry_before`,
            name: '集团总部',
            component: () => import('@/views/hire/hire_entry_before.vue'),
            meta: {
              showChildren: false,
              title: '集团总部',
              noChildren: true
            }
          }
        ]
      },
      {
        path: `${HirePrefix}/hire/hire_entry_accept_offer1`,
        name: '2.【入职薪酬已审批已入职】明细',
        component: () => import('@/views/hire/layout.vue'),
        meta: {
          childrenDataFrom: 'companyApi',
          showChildren: false,
          title: '【入职薪酬已审批已入职】明细',
          noChildren: true
        },
        children: [
          {
            path: `${HirePrefix}/hire/hire_entry_accept_offer`,
            name: '集团总部',
            component: () => import('@/views/hire/hire_entry_accept_offer.vue'),
            meta: {
              title: '集团总部',
              showChildren: false,
              noChildren: true
            }
          }
        ]
      },
      {
        path: `${HirePrefix}/hire/hire_entry_refuse_offer1`,
        name: '3.【入职薪酬已审批不入职】明细',
        component: () => import('@/views/hire/layout.vue'),
        meta: {
          childrenDataFrom: 'companyApi',
          showChildren: false,
          title: '【入职薪酬已审批不入职】明细',
          noChildren: true
        },
        children: [
          {
            path: `${HirePrefix}/hire/hire_entry_refuse_offer`,
            name: '集团总部',
            component: () => import('@/views/hire/hire_entry_refuse_offer.vue'),
            meta: {
              showChildren: false,
              title: '集团总部',
              noChildren: true
            }
          },
          {
            path: `${HirePrefix}/hire/hire_entry_borrow_money_search/:companyId`,
            name: '入职借款（副表）',
            component: () => import('@/views/hire/hire_entry_borrow_money_search.vue'),
            meta: {
              title: '入职借款（副表）',
              noChildren: true
            },
            hidden: true
          },
          {
            path: `${HirePrefix}/hire/hire_entry_salary_search/:companyId`,
            name: '入职薪酬（副表）',
            component: () => import('@/views/hire/hire_entry_salary_search.vue'),
            meta: {
              title: '入职薪酬（副表）',
              noChildren: true
            },
            hidden: true
          }
        ]
      }
    ]
  },
  {
    path: `${HirePrefix}/hire`,
    name: '（四）【入职借款归还】登记',
    component: () => import('@/views/hire/layout.vue'),
    meta: {
      showChildren: false,
      title: '【入职借款归还】登记'
    },
    children: [
      {
        path: `${HirePrefix}/hire/hire_entry_accept_offer_repay1`,
        name: '1.已入职人员归还借款',
        component: () => import('@/views/hire/layout.vue'),
        meta: {
          childrenDataFrom: 'companyApi',
          showChildren: false,
          title: '已入职人员归还借款'
        },
        children: [
          {
            path: `${HirePrefix}/hire/hire_entry_accept_offer_repay`,
            name: '集团总部',
            component: () => import('@/views/hire/hire_entry_accept_offer_repay.vue'),
            meta: {
              showChildren: false,
              title: '已入职人员归还借款(台账)',
              noChildren: true
            }
          }
        ]
      },
      {
        path: `${HirePrefix}/hire/hire_entry_accept_offer_repaid/:companyId`,
        name: '已入职人员归还借款结束台账（副表）',
        component: () => import('@/views/hire/hire_entry_accept_offer_repaid.vue'),
        meta: {
          title: '已入职人员归还借款结束台账（副表）',
          noChildren: true
        },
        hidden: true
      },
      {
        path: `${HirePrefix}/hire/hire_entry_repay_detail/:companyId`,
        name: '已入职人员归还借款明细记录表',
        component: () => import('@/views/hire/hire_entry_repay_detail.vue'),
        meta: {
          title: '已入职人员归还借款明细记录表',
          noChildren: true
        },
        hidden: true
      },
      {
        path: `${HirePrefix}/hire/hire_entry_repay_detail_search/:companyId`,
        name: '已入职人员归还借款明细表',
        component: () => import('@/views/hire/hire_entry_repay_detail_search.vue'),
        meta: {
          title: '已入职人员归还借款明细表',
          noChildren: true
        },
        hidden: true
      },

      {
        path: `${HirePrefix}/hire/hire_entry_refuse_offer_repay`,
        name: '2.不入职人员归还借款及违约金',
        component: () => import('@/views/hire/hire_entry_refuse_offer_repay.vue'),
        meta: {
          childrenDataFrom: 'companyApi',
          title: '不入职人员归还借款及违约金(台账)'
        },
        children: [
          {
            path: `${HirePrefix}/hire/hire_entry_refuse_offer_repay`,
            name: '不入职人员归还借款及违约金(台账)',
            component: () => import('@/views/hire/hire_entry_refuse_offer_repay.vue'),
            meta: {
              title: '不入职人员归还借款及违约金(台账)',
              noChildren: true
            }
          }
        ]
      },
      {
        path: `${HirePrefix}/hire/hire_entry_refuse_offer_repaid/:companyId`,
        name: '不入职人员归已还借款及违约金(台账)',
        component: () => import('@/views/hire/hire_entry_refuse_offer_repaid.vue'),
        meta: {
          childrenDataFrom: 'companyApi',
          title: '不入职人员已归还借款及违约金(台账)',
          noChildren: true
        },
        hidden: true
      },
      {
        path: `${HirePrefix}/hire/hire_upload_test`,
        name: '测试上传附件',
        component: () => import('@/views/hire/hire_upload_test.vue'),
        meta: {
          title: '测试上传附件',
          noChildren: true
        },
        hidden: true
      }
    ]
  },



  // {
  //   path: `${HirePrefix}/hire`,
  //   name: '（一）入职薪酬录入与查询',
  //   component: () => import('@/views/hire/layout.vue'),
  //   meta: {
  //     showChildren: false,
  //     title: '入职薪酬录入与查询'
  //   },
  //   children: [
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_salary_comfire`,
  //       name: '1.入职薪酬确认表',
  //       component: () => import('@/views/hire/hire_entry_salary_comfire.vue'),
  //       meta: {
  //         showChildren: false,
  //         childrenDataFrom: 'companyApi',
  //         title: '入职薪酬确认表'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_comfire`,
  //           name: '集团总部',
  //           component: () => import('@/views/hire/hire_entry_salary_comfire.vue'),
  //           meta: {
  //             showChildren: false,
  //             noChildren: true,
  //             title: '集团总部'
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_salary_proof`,
  //       name: '2.入职薪酬录入凭证查询',
  //       component: () => import('@/views/hire/hire_entry_salary_proof.vue'),
  //       meta: {
  //         childrenDataFrom: 'companyApi',
  //         showChildren: false,
  //         title: '入职薪酬录入凭证查询'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_proof`,
  //           name: '集团总部',
  //           component: () => import('@/views/hire/hire_entry_salary_proof.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '集团总部',
  //             noChildren: true
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_borrow_money/:companyId`,
  //       name: '入职借款录入（副表）',
  //       component: () => import('@/views/hire/hire_entry_borrow_money.vue'),
  //       meta: {
  //         title: '入职借款录入（副表）',
  //         noChildren: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_salary/:companyId`,
  //       name: '入职薪酬录入（副表）',
  //       component: () => import('@/views/hire/hire_entry_salary.vue'),
  //       meta: {
  //         title: '入职薪酬录入（副表）',
  //         noChildren: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_borrow_money_search/:companyId`,
  //       name: '入职借款（副表）',
  //       component: () => import('@/views/hire/hire_entry_borrow_money_search.vue'),
  //       meta: {
  //         title: '入职借款（副表）',
  //         noChildren: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_salary_search/:companyId`,
  //       name: '入职薪酬（副表）',
  //       component: () => import('@/views/hire/hire_entry_salary_search.vue'),
  //       meta: {
  //         title: '入职薪酬（副表）',
  //         noChildren: true
  //       },
  //       hidden: true
  //     }
  //   ]
  // },
  // {
  //   path: `${HirePrefix}/hire`,
  //   name: '（二）入职薪酬确认明细',
  //   component: () => import('@/views/hire/layout.vue'),
  //   meta: {
  //     showChildren: false,
  //     title: '入职薪酬确认明细'
  //   },
  //   children: [
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_before`,
  //       name: '1.入职薪酬已确认待入职明细',
  //       component: () => import('@/views/hire/hire_entry_before.vue'),
  //       meta: {
  //         childrenDataFrom: 'companyApi',
  //         showChildren: false,
  //         title: '入职薪酬已确认待入职明细'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_before`,
  //           name: '集团总部',
  //           component: () => import('@/views/hire/hire_entry_before.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '集团总部',
  //             noChildren: true
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_accept_offer`,
  //       name: '2.入职薪酬已确认已入职明细',
  //       component: () => import('@/views/hire/hire_entry_accept_offer.vue'),
  //       meta: {
  //         childrenDataFrom: 'companyApi',
  //         showChildren: false,
  //         title: '入职薪酬已确认已入职明细',
  //         noChildren: true
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer`,
  //           name: '集团总部',
  //           component: () => import('@/views/hire/hire_entry_accept_offer.vue'),
  //           meta: {
  //             title: '集团总部',
  //             showChildren: false,
  //             noChildren: true
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_refuse_offer`,
  //       name: '3.入职薪酬已确认不入职明细',
  //       component: () => import('@/views/hire/hire_entry_refuse_offer.vue'),
  //       meta: {
  //         childrenDataFrom: 'companyApi',
  //         showChildren: false,
  //         title: '入职薪酬已确认不入职明细',
  //         noChildren: true
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer`,
  //           name: '集团总部',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '集团总部',
  //             noChildren: true
  //           }
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   path: `${HirePrefix}/hire_entry`,
  //   name: '（三）入职借款归还',
  //   component: () => import('@/views/hire/layout.vue'),
  //   meta: {
  //     showChildren: false,
  //     title: '入职借款归还'
  //   },
  //   children: [
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_accept_offer_repay`,
  //       name: '1.已入职人员归还借款',
  //       component: () => import('@/views/hire/hire_entry_accept_offer_repay.vue'),
  //       meta: {
  //         childrenDataFrom: 'companyApi',
  //         showChildren: false,
  //         title: '已入职人员归还借款'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer_repay`,
  //           name: '集团总部',
  //           component: () => import('@/views/hire/hire_entry_accept_offer_repay.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '已入职人员归还借款(台账)',
  //             noChildren: true
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_accept_offer_repaid/:companyId`,
  //       name: '已入职人员归还借款结束台账（副表）',
  //       component: () => import('@/views/hire/hire_entry_accept_offer_repaid.vue'),
  //       meta: {
  //         title: '已入职人员归还借款结束台账（副表）',
  //         noChildren: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_repay_detail/:companyId`,
  //       name: '已入职人员归还借款明细记录表',
  //       component: () => import('@/views/hire/hire_entry_repay_detail.vue'),
  //       meta: {
  //         title: '已入职人员归还借款明细记录表',
  //         noChildren: true
  //       },
  //       hidden: true
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_repay_detail_search/:companyId`,
  //       name: '已入职人员归还借款明细表',
  //       component: () => import('@/views/hire/hire_entry_repay_detail_search.vue'),
  //       meta: {
  //         title: '已入职人员归还借款明细表',
  //         noChildren: true
  //       },
  //       hidden: true
  //     },
  //
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_refuse_offer_repay`,
  //       name: '2.不入职人员归还借款及违约金',
  //       component: () => import('@/views/hire/hire_entry_refuse_offer_repay.vue'),
  //       meta: {
  //         childrenDataFrom: 'companyApi',
  //         title: '不入职人员归还借款及违约金(台账)'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer_repay`,
  //           name: '不入职人员归还借款及违约金(台账)',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer_repay.vue'),
  //           meta: {
  //             title: '不入职人员归还借款及违约金(台账)',
  //             noChildren: true
  //           }
  //         }
  //       ]
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_refuse_offer_repaid/:companyId`,
  //       name: '不入职人员归已还借款及违约金(台账)',
  //       component: () => import('@/views/hire/hire_entry_refuse_offer_repaid.vue'),
  //       meta: {
  //         childrenDataFrom: 'companyApi',
  //         title: '不入职人员已归还借款及违约金(台账)',
  //         noChildren: true
  //       },
  //       hidden: true
  //     }
  //   ]
  // }

  //
  // {
  //   path: `${HirePrefix}/hire/10002`,
  //   name: '集团总部',
  //   component: () => import('@/views/hire/layout.vue'),
  //   meta: {
  //     showChildren: false,
  //     title: '集团总部'
  //   },
  //   children:[
  //     {
  //       path: `${HirePrefix}/hire/10002`,
  //       name: '入职薪酬确认',
  //       component: () => import('@/views/hire/layout.vue'),
  //       meta: {
  //         title: '入职薪酬确认'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_comfire/10002`,
  //           name: '入职薪酬确认表',
  //           component: () => import('@/views/hire/hire_entry_salary_comfire.vue'),
  //           meta: {
  //             title: '入职薪酬确认表'
  //           }
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_borrow_money/10002`,
  //           name: '入职借款录入（副表）',
  //           component: () => import('@/views/hire/hire_entry_borrow_money.vue'),
  //           meta: {
  //             title: '入职借款录入（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary/10002`,
  //           name: '入职薪酬录入（副表）',
  //           component: () => import('@/views/hire/hire_entry_salary.vue'),
  //           meta: {
  //             title: '入职薪酬录入（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_borrow_money_search/10002`,
  //           name: '入职借款（副表）',
  //           component: () => import('@/views/hire/hire_entry_borrow_money_search.vue'),
  //           meta: {
  //             title: '入职借款（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_search/10002`,
  //           name: '入职薪酬（副表）',
  //           component: () => import('@/views/hire/hire_entry_salary_search.vue'),
  //           meta: {
  //             title: '入职薪酬（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         //hire_entry_salary_proof
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_proof/10002`,
  //           name: '入职薪酬录入凭证查询',
  //           component: () => import('@/views/hire/hire_entry_salary_proof.vue'),
  //           meta: {
  //             title: '入职薪酬录入凭证查询',
  //             noChildren:true,
  //           },
  //         },
  //       ]
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_before/10002`,
  //       name: '入职薪酬已确认待入职明细表',
  //       component: () => import('@/views/hire/hire_entry_before.vue'),
  //       meta: {
  //         title: '入职薪酬已确认待入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_accept_offer/10002`,
  //       name: '入职薪酬已确认已入职明细表',
  //       component: () => import('@/views/hire/hire_entry_accept_offer.vue'),
  //       meta: {
  //         title: '入职薪酬已确认已入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_refuse_offer/10002`,
  //       name: '入职薪酬已确认不入职明细表',
  //       component: () => import('@/views/hire/hire_entry_refuse_offer.vue'),
  //       meta: {
  //         title: '入职薪酬已确认不入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //
  //     {
  //       path: `${HirePrefix}/hire_entry/10002`,
  //       name: '入职借款归还',
  //       component: () => import('@/views/hire/layout.vue'),
  //       meta: {
  //         title: '入职借款归还'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer_repay/10002`,
  //           name: '已入职人员归还借款(台账)',
  //           component: () => import('@/views/hire/hire_entry_accept_offer_repay.vue'),
  //           meta: {
  //             title: '已入职人员归还借款(台账)',
  //             noChildren:true,
  //           },
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer_repaid/10002`,
  //           name: '已入职人员归还借款结束台账（副表）',
  //           component: () => import('@/views/hire/hire_entry_accept_offer_repaid.vue'),
  //           meta: {
  //             title: '已入职人员归还借款结束台账（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_repay_detail/10002`,
  //           name: '已入职人员归还借款明细记录表',
  //           component: () => import('@/views/hire/hire_entry_repay_detail.vue'),
  //           meta: {
  //             title: '已入职人员归还借款明细记录表',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_repay_detail_search/10002`,
  //           name: '已入职人员归还借款明细表',
  //           component: () => import('@/views/hire/hire_entry_repay_detail_search.vue'),
  //           meta: {
  //             title: '已入职人员归还借款明细表',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer_repay/10002`,
  //           name: '不入职人员归还借款及违约金(台账)',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer_repay.vue'),
  //           meta: {
  //             title: '不入职人员归还借款及违约金(台账)',
  //             noChildren:true,
  //           },
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer_repaid/10002`,
  //           name: '不入职人员归已还借款及违约金(台账)',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer_repaid.vue'),
  //           meta: {
  //             title: '不入职人员已归还借款及违约金(台账)',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //
  //       ]
  //     },
  //   ]
  // },
  // {
  //   path: `${HirePrefix}/hire/11000`,
  //   name: '销售公司',
  //   component: () => import('@/views/hire/layout.vue'),
  //   meta: {
  //     showChildren: false,
  //     title: '销售公司'
  //   },
  //   children:[
  //     {
  //       path: `${HirePrefix}/hire/11000`,
  //       name: '入职薪酬确认',
  //       component: () => import('@/views/hire/layout.vue'),
  //       meta: {
  //         showChildren: false,
  //         title: '入职薪酬确认'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_comfire/11000`,
  //           name: '入职薪酬确认表',
  //           component: () => import('@/views/hire/hire_entry_salary_comfire.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '入职薪酬确认表'
  //           }
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_borrow_money/11000`,
  //           name: '入职借款录入（副表）',
  //           component: () => import('@/views/hire/hire_entry_borrow_money.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '入职借款录入（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary/11000`,
  //           name: '入职薪酬录入（副表）',
  //           component: () => import('@/views/hire/hire_entry_salary.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '入职薪酬录入（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_borrow_money_search/11000`,
  //           name: '入职借款（副表）',
  //           component: () => import('@/views/hire/hire_entry_borrow_money_search.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '入职借款（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_search/11000`,
  //           name: '入职薪酬（副表）',
  //           component: () => import('@/views/hire/hire_entry_salary_search.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '入职薪酬（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         //hire_entry_salary_proof
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_proof/11000`,
  //           name: '入职薪酬录入凭证查询',
  //           component: () => import('@/views/hire/hire_entry_salary_proof.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '入职薪酬录入凭证查询',
  //             noChildren:true,
  //           },
  //         },
  //
  //       ]
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_before/11000`,
  //       name: '入职薪酬已确认待入职明细表',
  //       component: () => import('@/views/hire/hire_entry_before.vue'),
  //       meta: {
  //         title: '入职薪酬已确认待入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_accept_offer/11000`,
  //       name: '入职薪酬已确认已入职明细表',
  //       component: () => import('@/views/hire/hire_entry_accept_offer.vue'),
  //       meta: {
  //         showChildren: false,
  //         title: '入职薪酬已确认已入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_refuse_offer/11000`,
  //       name: '入职薪酬已确认不入职明细表',
  //       component: () => import('@/views/hire/hire_entry_refuse_offer.vue'),
  //       meta: {
  //         showChildren: false,
  //         title: '入职薪酬已确认不入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //
  //     {
  //       path: `${HirePrefix}/hire_entry/11000`,
  //       name: '入职借款归还',
  //       component: () => import('@/views/hire/layout.vue'),
  //       meta: {
  //         title: '入职借款归还'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer_repay/11000`,
  //           name: '已入职人员归还借款(台账)',
  //           component: () => import('@/views/hire/hire_entry_accept_offer_repay.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '已入职人员归还借款(台账)',
  //             noChildren:true,
  //           },
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer_repaid/11000`,
  //           name: '已入职人员归还借款结束台账（副表）',
  //           component: () => import('@/views/hire/hire_entry_accept_offer_repaid.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '已入职人员归还借款结束台账（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_repay_detail/11000`,
  //           name: '已入职人员归还借款明细记录表',
  //           component: () => import('@/views/hire/hire_entry_repay_detail.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '已入职人员归还借款明细记录表',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_repay_detail_search/11000`,
  //           name: '已入职人员归还借款明细表',
  //           component: () => import('@/views/hire/hire_entry_repay_detail_search.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '已入职人员归还借款明细表',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer_repay/11000`,
  //           name: '不入职人员归还借款及违约金(台账)',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer_repay.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '不入职人员归还借款及违约金(台账)',
  //             noChildren:true,
  //           },
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer_repaid/11000`,
  //           name: '不入职人员归已还借款及违约金(台账)',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer_repaid.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '不入职人员已归还借款及违约金(台账)',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //
  //       ]
  //     },
  //   ]
  // },
  // {
  //   path: `${HirePrefix}/hire/16000`,
  //   name: '赣州纸业',
  //   component: () => import('@/views/hire/layout.vue'),
  //   meta: {
  //     title: '赣州纸业'
  //   },
  //   children:[
  //     {
  //       path: `${HirePrefix}/hire/16000`,
  //       name: '入职薪酬确认',
  //       component: () => import('@/views/hire/layout.vue'),
  //       meta: {
  //         title: '入职薪酬确认'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_comfire/16000`,
  //           name: '入职薪酬确认表',
  //           component: () => import('@/views/hire/hire_entry_salary_comfire.vue'),
  //           meta: {
  //             showChildren: false,
  //             title: '入职薪酬确认表'
  //           }
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_borrow_money/16000`,
  //           name: '入职借款录入（副表）',
  //           component: () => import('@/views/hire/hire_entry_borrow_money.vue'),
  //           meta: {
  //             title: '入职借款录入（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary/16000`,
  //           name: '入职薪酬录入（副表）',
  //           component: () => import('@/views/hire/hire_entry_salary.vue'),
  //           meta: {
  //             title: '入职薪酬录入（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_borrow_money_search/16000`,
  //           name: '入职借款（副表）',
  //           component: () => import('@/views/hire/hire_entry_borrow_money_search.vue'),
  //           meta: {
  //             title: '入职借款（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_search/16000`,
  //           name: '入职薪酬（副表）',
  //           component: () => import('@/views/hire/hire_entry_salary_search.vue'),
  //           meta: {
  //             title: '入职薪酬（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         //hire_entry_salary_proof
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_proof/16000`,
  //           name: '入职薪酬录入凭证查询',
  //           component: () => import('@/views/hire/hire_entry_salary_proof.vue'),
  //           meta: {
  //             title: '入职薪酬录入凭证查询',
  //             noChildren:true,
  //           },
  //         },
  //
  //       ]
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_before/16000`,
  //       name: '入职薪酬已确认待入职明细表',
  //       component: () => import('@/views/hire/hire_entry_before.vue'),
  //       meta: {
  //         title: '入职薪酬已确认待入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_accept_offer/16000`,
  //       name: '入职薪酬已确认已入职明细表',
  //       component: () => import('@/views/hire/hire_entry_accept_offer.vue'),
  //       meta: {
  //         title: '入职薪酬已确认已入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_refuse_offer/16000`,
  //       name: '入职薪酬已确认不入职明细表',
  //       component: () => import('@/views/hire/hire_entry_refuse_offer.vue'),
  //       meta: {
  //         title: '入职薪酬已确认不入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //
  //     {
  //       path: `${HirePrefix}/hire_entry/16000`,
  //       name: '入职借款归还',
  //       component: () => import('@/views/hire/layout.vue'),
  //       meta: {
  //         title: '入职借款归还'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer_repay/16000`,
  //           name: '已入职人员归还借款(台账)',
  //           component: () => import('@/views/hire/hire_entry_accept_offer_repay.vue'),
  //           meta: {
  //             title: '已入职人员归还借款(台账)',
  //             noChildren:true,
  //           },
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer_repaid/16000`,
  //           name: '已入职人员归还借款结束台账（副表）',
  //           component: () => import('@/views/hire/hire_entry_accept_offer_repaid.vue'),
  //           meta: {
  //             title: '已入职人员归还借款结束台账（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_repay_detail/16000`,
  //           name: '已入职人员归还借款明细记录表',
  //           component: () => import('@/views/hire/hire_entry_repay_detail.vue'),
  //           meta: {
  //             title: '已入职人员归还借款明细记录表',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_repay_detail_search/16000`,
  //           name: '已入职人员归还借款明细表',
  //           component: () => import('@/views/hire/hire_entry_repay_detail_search.vue'),
  //           meta: {
  //             title: '已入职人员归还借款明细表',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer_repay/16000`,
  //           name: '不入职人员归还借款及违约金(台账)',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer_repay.vue'),
  //           meta: {
  //             title: '不入职人员归还借款及违约金(台账)',
  //             noChildren:true,
  //           },
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer_repaid/16000`,
  //           name: '不入职人员归已还借款及违约金(台账)',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer_repaid.vue'),
  //           meta: {
  //             title: '不入职人员已归还借款及违约金(台账)',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //
  //       ]
  //     },
  //   ]
  // },
  // {
  //   path: `${HirePrefix}/hire/19000`,
  //   name: '赣州纸品',
  //   component: () => import('@/views/hire/layout.vue'),
  //   meta: {
  //     title: '赣州纸品'
  //   },
  //   children:[
  //     {
  //       path: `${HirePrefix}/hire/19000`,
  //       name: '入职薪酬确认',
  //       component: () => import('@/views/hire/layout.vue'),
  //       meta: {
  //         title: '入职薪酬确认'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_comfire/19000`,
  //           name: '入职薪酬确认表',
  //           component: () => import('@/views/hire/hire_entry_salary_comfire.vue'),
  //           meta: {
  //             title: '入职薪酬确认表'
  //           }
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_borrow_money/19000`,
  //           name: '入职借款录入（副表）',
  //           component: () => import('@/views/hire/hire_entry_borrow_money.vue'),
  //           meta: {
  //             title: '入职借款录入（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary/19000`,
  //           name: '入职薪酬录入（副表）',
  //           component: () => import('@/views/hire/hire_entry_salary.vue'),
  //           meta: {
  //             title: '入职薪酬录入（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_borrow_money_search/19000`,
  //           name: '入职借款（副表）',
  //           component: () => import('@/views/hire/hire_entry_borrow_money_search.vue'),
  //           meta: {
  //             title: '入职借款（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_search/19000`,
  //           name: '入职薪酬（副表）',
  //           component: () => import('@/views/hire/hire_entry_salary_search.vue'),
  //           meta: {
  //             title: '入职薪酬（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         //hire_entry_salary_proof
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_proof/19000`,
  //           name: '入职薪酬录入凭证查询',
  //           component: () => import('@/views/hire/hire_entry_salary_proof.vue'),
  //           meta: {
  //             title: '入职薪酬录入凭证查询',
  //             noChildren:true,
  //           },
  //         },
  //
  //       ]
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_before/19000`,
  //       name: '入职薪酬已确认待入职明细表',
  //       component: () => import('@/views/hire/hire_entry_before.vue'),
  //       meta: {
  //         title: '入职薪酬已确认待入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_accept_offer/19000`,
  //       name: '入职薪酬已确认已入职明细表',
  //       component: () => import('@/views/hire/hire_entry_accept_offer.vue'),
  //       meta: {
  //         title: '入职薪酬已确认已入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_refuse_offer/19000`,
  //       name: '入职薪酬已确认不入职明细表',
  //       component: () => import('@/views/hire/hire_entry_refuse_offer.vue'),
  //       meta: {
  //         title: '入职薪酬已确认不入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //
  //     {
  //       path: `${HirePrefix}/hire_entry/19000`,
  //       name: '入职借款归还',
  //       component: () => import('@/views/hire/layout.vue'),
  //       meta: {
  //         title: '入职借款归还'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer_repay/19000`,
  //           name: '已入职人员归还借款(台账)',
  //           component: () => import('@/views/hire/hire_entry_accept_offer_repay.vue'),
  //           meta: {
  //             title: '已入职人员归还借款(台账)',
  //             noChildren:true,
  //           },
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer_repaid/19000`,
  //           name: '已入职人员归还借款结束台账（副表）',
  //           component: () => import('@/views/hire/hire_entry_accept_offer_repaid.vue'),
  //           meta: {
  //             title: '已入职人员归还借款结束台账（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_repay_detail/19000`,
  //           name: '已入职人员归还借款明细记录表',
  //           component: () => import('@/views/hire/hire_entry_repay_detail.vue'),
  //           meta: {
  //             title: '已入职人员归还借款明细记录表',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_repay_detail_search/19000`,
  //           name: '已入职人员归还借款明细表',
  //           component: () => import('@/views/hire/hire_entry_repay_detail_search.vue'),
  //           meta: {
  //             title: '已入职人员归还借款明细表',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer_repay/19000`,
  //           name: '不入职人员归还借款及违约金(台账)',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer_repay.vue'),
  //           meta: {
  //             title: '不入职人员归还借款及违约金(台账)',
  //             noChildren:true,
  //           },
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer_repaid/19000`,
  //           name: '不入职人员归已还借款及违约金(台账)',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer_repaid.vue'),
  //           meta: {
  //             title: '不入职人员已归还借款及违约金(台账)',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //
  //       ]
  //     },
  //   ]
  // },
  // {
  //   path: `${HirePrefix}/hire/22320`,
  //   name: '华劲人纸品',
  //   component: () => import('@/views/hire/layout.vue'),
  //   meta: {
  //     title: '华劲人纸品'
  //   },
  //   children:[
  //     {
  //       path: `${HirePrefix}/hire/22320`,
  //       name: '入职薪酬确认',
  //       component: () => import('@/views/hire/layout.vue'),
  //       meta: {
  //         title: '入职薪酬确认'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_comfire/22320`,
  //           name: '入职薪酬确认表',
  //           component: () => import('@/views/hire/hire_entry_salary_comfire.vue'),
  //           meta: {
  //             title: '入职薪酬确认表'
  //           }
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_borrow_money/22320`,
  //           name: '入职借款录入（副表）',
  //           component: () => import('@/views/hire/hire_entry_borrow_money.vue'),
  //           meta: {
  //             title: '入职借款录入（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary/22320`,
  //           name: '入职薪酬录入（副表）',
  //           component: () => import('@/views/hire/hire_entry_salary.vue'),
  //           meta: {
  //             title: '入职薪酬录入（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_borrow_money_search/22320`,
  //           name: '入职借款（副表）',
  //           component: () => import('@/views/hire/hire_entry_borrow_money_search.vue'),
  //           meta: {
  //             title: '入职借款（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_search/22320`,
  //           name: '入职薪酬（副表）',
  //           component: () => import('@/views/hire/hire_entry_salary_search.vue'),
  //           meta: {
  //             title: '入职薪酬（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         //hire_entry_salary_proof
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_proof/22320`,
  //           name: '入职薪酬录入凭证查询',
  //           component: () => import('@/views/hire/hire_entry_salary_proof.vue'),
  //           meta: {
  //             title: '入职薪酬录入凭证查询',
  //             noChildren:true,
  //           },
  //         },
  //
  //       ]
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_before/22320`,
  //       name: '入职薪酬已确认待入职明细表',
  //       component: () => import('@/views/hire/hire_entry_before.vue'),
  //       meta: {
  //         title: '入职薪酬已确认待入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_accept_offer/22320`,
  //       name: '入职薪酬已确认已入职明细表',
  //       component: () => import('@/views/hire/hire_entry_accept_offer.vue'),
  //       meta: {
  //         title: '入职薪酬已确认已入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_refuse_offer/22320`,
  //       name: '入职薪酬已确认不入职明细表',
  //       component: () => import('@/views/hire/hire_entry_refuse_offer.vue'),
  //       meta: {
  //         title: '入职薪酬已确认不入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //
  //     {
  //       path: `${HirePrefix}/hire_entry/22320`,
  //       name: '入职借款归还',
  //       component: () => import('@/views/hire/layout.vue'),
  //       meta: {
  //         title: '入职借款归还'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer_repay/22320`,
  //           name: '已入职人员归还借款(台账)',
  //           component: () => import('@/views/hire/hire_entry_accept_offer_repay.vue'),
  //           meta: {
  //             title: '已入职人员归还借款(台账)',
  //             noChildren:true,
  //           },
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer_repaid/22320`,
  //           name: '已入职人员归还借款结束台账（副表）',
  //           component: () => import('@/views/hire/hire_entry_accept_offer_repaid.vue'),
  //           meta: {
  //             title: '已入职人员归还借款结束台账（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_repay_detail/22320`,
  //           name: '已入职人员归还借款明细记录表',
  //           component: () => import('@/views/hire/hire_entry_repay_detail.vue'),
  //           meta: {
  //             title: '已入职人员归还借款明细记录表',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_repay_detail_search/22320`,
  //           name: '已入职人员归还借款明细表',
  //           component: () => import('@/views/hire/hire_entry_repay_detail_search.vue'),
  //           meta: {
  //             title: '已入职人员归还借款明细表',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer_repay/22320`,
  //           name: '不入职人员归还借款及违约金(台账)',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer_repay.vue'),
  //           meta: {
  //             title: '不入职人员归还借款及违约金(台账)',
  //             noChildren:true,
  //           },
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer_repaid/22320`,
  //           name: '不入职人员归已还借款及违约金(台账)',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer_repaid.vue'),
  //           meta: {
  //             title: '不入职人员已归还借款及违约金(台账)',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //
  //       ]
  //     },
  //   ]
  // },
  // {
  //   path: `${HirePrefix}/hire/15000`,
  //   name: '广西竹林',
  //   component: () => import('@/views/hire/layout.vue'),
  //   meta: {
  //     title: '广西竹林'
  //   },
  //   children:[
  //     {
  //       path: `${HirePrefix}/hire/15000`,
  //       name: '入职薪酬确认',
  //       component: () => import('@/views/hire/layout.vue'),
  //       meta: {
  //         title: '入职薪酬确认'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_comfire/15000`,
  //           name: '入职薪酬确认表',
  //           component: () => import('@/views/hire/hire_entry_salary_comfire.vue'),
  //           meta: {
  //             title: '入职薪酬确认表'
  //           }
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_borrow_money/15000`,
  //           name: '入职借款录入（副表）',
  //           component: () => import('@/views/hire/hire_entry_borrow_money.vue'),
  //           meta: {
  //             title: '入职借款录入（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary/15000`,
  //           name: '入职薪酬录入（副表）',
  //           component: () => import('@/views/hire/hire_entry_salary.vue'),
  //           meta: {
  //             title: '入职薪酬录入（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_borrow_money_search/15000`,
  //           name: '入职借款（副表）',
  //           component: () => import('@/views/hire/hire_entry_borrow_money_search.vue'),
  //           meta: {
  //             title: '入职借款（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_search/15000`,
  //           name: '入职薪酬（副表）',
  //           component: () => import('@/views/hire/hire_entry_salary_search.vue'),
  //           meta: {
  //             title: '入职薪酬（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         //hire_entry_salary_proof
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_proof/15000`,
  //           name: '入职薪酬录入凭证查询',
  //           component: () => import('@/views/hire/hire_entry_salary_proof.vue'),
  //           meta: {
  //             title: '入职薪酬录入凭证查询',
  //             noChildren:true,
  //           },
  //         },
  //
  //       ]
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_before/15000`,
  //       name: '入职薪酬已确认待入职明细表',
  //       component: () => import('@/views/hire/hire_entry_before.vue'),
  //       meta: {
  //         title: '入职薪酬已确认待入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_accept_offer/15000`,
  //       name: '入职薪酬已确认已入职明细表',
  //       component: () => import('@/views/hire/hire_entry_accept_offer.vue'),
  //       meta: {
  //         title: '入职薪酬已确认已入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_refuse_offer/15000`,
  //       name: '入职薪酬已确认不入职明细表',
  //       component: () => import('@/views/hire/hire_entry_refuse_offer.vue'),
  //       meta: {
  //         title: '入职薪酬已确认不入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //
  //     {
  //       path: `${HirePrefix}/hire_entry/15000`,
  //       name: '入职借款归还',
  //       component: () => import('@/views/hire/layout.vue'),
  //       meta: {
  //         title: '入职借款归还'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer_repay/15000`,
  //           name: '已入职人员归还借款(台账)',
  //           component: () => import('@/views/hire/hire_entry_accept_offer_repay.vue'),
  //           meta: {
  //             title: '已入职人员归还借款(台账)',
  //             noChildren:true,
  //           },
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer_repaid/15000`,
  //           name: '已入职人员归还借款结束台账（副表）',
  //           component: () => import('@/views/hire/hire_entry_accept_offer_repaid.vue'),
  //           meta: {
  //             title: '已入职人员归还借款结束台账（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_repay_detail/15000`,
  //           name: '已入职人员归还借款明细记录表',
  //           component: () => import('@/views/hire/hire_entry_repay_detail.vue'),
  //           meta: {
  //             title: '已入职人员归还借款明细记录表',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_repay_detail_search/15000`,
  //           name: '已入职人员归还借款明细表',
  //           component: () => import('@/views/hire/hire_entry_repay_detail_search.vue'),
  //           meta: {
  //             title: '已入职人员归还借款明细表',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer_repay/15000`,
  //           name: '不入职人员归还借款及违约金(台账)',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer_repay.vue'),
  //           meta: {
  //             title: '不入职人员归还借款及违约金(台账)',
  //             noChildren:true,
  //           },
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer_repaid/15000`,
  //           name: '不入职人员归已还借款及违约金(台账)',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer_repaid.vue'),
  //           meta: {
  //             title: '不入职人员已归还借款及违约金(台账)',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //
  //       ]
  //     },
  //   ]
  // },
  // {
  //   path: `${HirePrefix}/hire/14000`,
  //   name: '赣州竹林',
  //   component: () => import('@/views/hire/layout.vue'),
  //   meta: {
  //     title: '赣州竹林'
  //   },
  //   children:[
  //     {
  //       path: `${HirePrefix}/hire/14000`,
  //       name: '入职薪酬确认',
  //       component: () => import('@/views/hire/layout.vue'),
  //       meta: {
  //         title: '入职薪酬确认'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_comfire/14000`,
  //           name: '入职薪酬确认表',
  //           component: () => import('@/views/hire/hire_entry_salary_comfire.vue'),
  //           meta: {
  //             title: '入职薪酬确认表'
  //           }
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_borrow_money/14000`,
  //           name: '入职借款录入（副表）',
  //           component: () => import('@/views/hire/hire_entry_borrow_money.vue'),
  //           meta: {
  //             title: '入职借款录入（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary/14000`,
  //           name: '入职薪酬录入（副表）',
  //           component: () => import('@/views/hire/hire_entry_salary.vue'),
  //           meta: {
  //             title: '入职薪酬录入（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_borrow_money_search/14000`,
  //           name: '入职借款（副表）',
  //           component: () => import('@/views/hire/hire_entry_borrow_money_search.vue'),
  //           meta: {
  //             title: '入职借款（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_search/14000`,
  //           name: '入职薪酬（副表）',
  //           component: () => import('@/views/hire/hire_entry_salary_search.vue'),
  //           meta: {
  //             title: '入职薪酬（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         //hire_entry_salary_proof
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_salary_proof/14000`,
  //           name: '入职薪酬录入凭证查询',
  //           component: () => import('@/views/hire/hire_entry_salary_proof.vue'),
  //           meta: {
  //             title: '入职薪酬录入凭证查询',
  //             noChildren:true,
  //           },
  //         },
  //
  //       ]
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_before/14000`,
  //       name: '入职薪酬已确认待入职明细表',
  //       component: () => import('@/views/hire/hire_entry_before.vue'),
  //       meta: {
  //         title: '入职薪酬已确认待入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_accept_offer/14000`,
  //       name: '入职薪酬已确认已入职明细表',
  //       component: () => import('@/views/hire/hire_entry_accept_offer.vue'),
  //       meta: {
  //         title: '入职薪酬已确认已入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //     {
  //       path: `${HirePrefix}/hire/hire_entry_refuse_offer/14000`,
  //       name: '入职薪酬已确认不入职明细表',
  //       component: () => import('@/views/hire/hire_entry_refuse_offer.vue'),
  //       meta: {
  //         title: '入职薪酬已确认不入职明细表',
  //         noChildren:true,
  //       },
  //     },
  //
  //     {
  //       path: `${HirePrefix}/hire_entry/14000`,
  //       name: '入职借款归还',
  //       component: () => import('@/views/hire/layout.vue'),
  //       meta: {
  //         title: '入职借款归还'
  //       },
  //       children: [
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer_repay/14000`,
  //           name: '已入职人员归还借款(台账)',
  //           component: () => import('@/views/hire/hire_entry_accept_offer_repay.vue'),
  //           meta: {
  //             title: '已入职人员归还借款(台账)',
  //             noChildren:true,
  //           },
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_accept_offer_repaid/14000`,
  //           name: '已入职人员归还借款结束台账（副表）',
  //           component: () => import('@/views/hire/hire_entry_accept_offer_repaid.vue'),
  //           meta: {
  //             title: '已入职人员归还借款结束台账（副表）',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_repay_detail/14000`,
  //           name: '已入职人员归还借款明细记录表',
  //           component: () => import('@/views/hire/hire_entry_repay_detail.vue'),
  //           meta: {
  //             title: '已入职人员归还借款明细记录表',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_repay_detail_search/14000`,
  //           name: '已入职人员归还借款明细表',
  //           component: () => import('@/views/hire/hire_entry_repay_detail_search.vue'),
  //           meta: {
  //             title: '已入职人员归还借款明细表',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer_repay/14000`,
  //           name: '不入职人员归还借款及违约金(台账)',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer_repay.vue'),
  //           meta: {
  //             title: '不入职人员归还借款及违约金(台账)',
  //             noChildren:true,
  //           },
  //         },
  //         {
  //           path: `${HirePrefix}/hire/hire_entry_refuse_offer_repaid/14000`,
  //           name: '不入职人员归已还借款及违约金(台账)',
  //           component: () => import('@/views/hire/hire_entry_refuse_offer_repaid.vue'),
  //           meta: {
  //             title: '不入职人员已归还借款及违约金(台账)',
  //             noChildren:true,
  //           },
  //           hidden:true,
  //         },
  //
  //       ]
  //     },
  //   ]
  // },
  // {
  //   path: `${HirePrefix}/hire/hire_edit_right`,
  //   name: '人员权限配置',
  //   component: () => import('@/views/hire/hire_edit_right.vue'),
  //   meta: {
  //     title: '人员权限配置',
  //     noChildren:true,
  //   },
  //   // hidden:true,
  // },
  // {
  //   path: `${HirePrefix}/hire/hire_edit_grade`,
  //   name: '职级权限配置',
  //   component: () => import('@/views/hire/hire_edit_grade.vue'),
  //   meta: {
  //     title: '职级权限配置',
  //     noChildren:true,
  //   },
  //   hidden:true,
  // },

  // {
  //   path: `${HirePrefix}/hire/hire_borrow_file`,
  //   name: '入职借条',
  //   component: () => import('@/views/hire/hire_borrow_file.vue'),
  //   meta: {
  //     title: '入职借条',
  //     noChildren:true,
  //   },
  //   hidden:true,
  // },
  // {
  //   path: `${HirePrefix}/hire/hire_salary_confirm_file`,
  //   name: '入职薪酬确认书',
  //   component: () => import('@/views/hire/hire_salary_confirm_file.vue'),
  //   meta: {
  //     title: '入职薪酬确认书',
  //     noChildren:true,
  //   },
  //   hidden:true,
  // },
]
