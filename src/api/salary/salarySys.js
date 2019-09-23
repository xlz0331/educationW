import fetch from '@/utils/request'

const SalarySys_API = {
  getCompanyList_orgDepartment: (params) => {
    return fetch.get(`org/orgDepartment/getCompanyList`, {params})
  },
    findByType_sysBaseData: (params) => {
    return fetch.get(`base/sysBaseData/findByType`, {params})
  },


  findListByCompany_payAuditSalaryGradeCategory: (params) => {
    return fetch.get(`/payaudit/payAuditSalaryGradeCategory/findListByCompany`, {params})
  },
  delete_payAuditSalaryGradeCategory: (params) => {
    return fetch.get(`/payaudit/payAuditSalaryGradeCategory/delete`, {params})
  },
  checkHaveAllSalaryGrade_payAuditSalaryGradeCategory: (params) => {
    return fetch.get(`/payaudit/payAuditSalaryGradeCategory/checkHaveAllSalaryGrade`, {params})
  },
  save_payAuditSalaryGradeCategory: (params) => {
    return fetch.post(`/payaudit/payAuditSalaryGradeCategory/save`, params)
  },
  update_payAuditSalaryGradeCategory: (params) => {
    return fetch.post(`/payaudit/payAuditSalaryGradeCategory/update`, params)
  },


  findAll_payAuditSalaryGrade: (params) => {
    return fetch.get(`/payaudit/payAuditSalaryGrade/findAll`, {params})
  },
  queryListBySalarySystem_payAuditSalaryGrade: (params) => {
    return fetch.get(`/payaudit/payAuditSalaryGrade/queryListBySalarySystem`, {params})
  },
  querySalarySystemList_payAuditSalaryGrade: (params) => {
    return fetch.get(`/payaudit/payAuditSalaryGrade/querySalarySystemList`, {params})
  },
  syncSalaryGradeData_payAuditSalaryGrade: (params) => {
    return fetch.get(`/payaudit/payAuditSalaryGrade/syncSalaryGradeData`, {params})
  },
queryListBySalarySystem_payAuditSalaryGrade: (params) => {
  return fetch.get(`/payaudit/payAuditSalaryGrade/queryListBySalarySystem`, {params})
},
queryRankListByGrade_payAuditSalaryGrade: (params) => {
  return fetch.get(`/payaudit/payAuditSalaryGrade/queryRankListByGrade`, {params})
},
querySomeSalaryGradeInfo_payAuditSalaryGrade: (params) => {
  return fetch.get(`/payaudit/payAuditSalaryGrade/querySomeSalaryGradeInfo`, {params})
}

}

export default SalarySys_API;
