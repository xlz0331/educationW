import fetch from '@/utils/request'

const Salary_API = {

  querySalaryDetailList_payaudit: (params) => {
    return fetch.get(`/payaudit/payAuditSalary/querySalaryDetailList`, {params})
  },

  getAndInit_payAuditSalary: (params) => {
    return fetch.get(`/payaudit/payAuditSalary/getAndInit`, {params})
  },

  salaryCalculate_payAuditSalary: (params) => {
    return fetch.get(`/payaudit/payAuditSalary/salaryCalculate`, {params})
  },

  payAudit_payAuditSalary: (params) => {
    return fetch.post(`/payaudit/payAuditSalary/payAudit?fdId=`+ params.fdId)
  },

  payUnAudit_payAuditSalary: (params) => {
    return fetch.post(`/payaudit/payAuditSalary/payUnAudit?fdId=`+ params.fdId)
  },

  payApproval_payAuditSalary: (params) => {
    return fetch.post(`/payaudit/payAuditSalary/payApproval?fdId=`+ params.fdId)
  },

  payUnApproval_payAuditSalary: (params) => {
    return fetch.post(`/payaudit/payAuditSalary/payUnApproval?fdId=`+ params.fdId)
  },
    queryPeopleDistribute_payAuditSalary: (params) => {
    return fetch.get(`/payaudit/payAuditSalary/queryPeopleDistribute`, {params})
  },

  queryMonthStandardList_payAuditSalary: (params) => {
    return fetch.get(`/payaudit/payAuditSalary/queryMonthStandardList`, {params})
  },
  querySalaryDetailList_payAuditSalary: (params) => {
    return fetch.get(`/payaudit/payAuditSalary/querySalaryDetailList`, {params})
  },
  queryTaxDetailList_payAuditSalary: (params) => {
    return fetch.get(`/payaudit/payAuditSalary/queryTaxDetailList`, {params})
  },


  //本月人员变动审核
  queryEmployeeDiffList_payAuditSalary: (params) => {
    return fetch.get(`/payaudit/payAuditSalary/queryEmployeeDiffList`, {params})
  },
  querySalaryDetailChangeList_payAuditSalary: (params) => {
    return fetch.get(`/payaudit/payAuditSalary/querySalaryDetailChangeList`, {params})
  },

  queryOthersByEmpMonth_payAuditSalary: (params) => {
    return fetch.get(`/payaudit/payAuditSalary/queryOthersByEmpMonth`, {params})
  },

}

export default Salary_API;
