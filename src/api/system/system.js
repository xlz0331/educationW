import fetch from '@/utils/request'

const System_API = {
  //身份证校验
  checkNid_sysBaseData: (params) => {
    return fetch.get(`base/sysBaseData/checkNid`, {params})
  },

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
    return fetch.get(`/payaudit/payAuditSalaryGradeCategory/save`, {params})
  },
  update_payAuditSalaryGradeCategory: (params) => {
    return fetch.get(`/payaudit/payAuditSalaryGradeCategory/update`, {params})
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
  getMenu_sysBaseData: (params) => {
    return fetch.get(`/base/sysBaseData/getMenu`, {params})
  }

}

export default System_API;
