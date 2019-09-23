import fetch from '@/utils/request'

const Tax_API = {
  getCompanyList_Deduct: (params) => {
    return fetch.get(`/tax/taxPersonDeductDetail/getCompanyList`, {params})
  },

  getCurrentMonth_Deduct: (params) => {
    return fetch.get(`/tax/taxPersonDeductDetail/getCurrentMonth`, {params})
  },
  getMonthList_Deduct: (params) => {
    return fetch.get(`/GET /tax/taxPersonDeductDetail/getMonthList`, {params})
  },

  queryReport_Deduct: (params) => {
    return fetch.get(`/tax/taxPersonDeductDetail/queryReport`, {params})
  },
  exportExcel_Deduct: (params) => {
    return  window.global_config.BASE_API + `/tax/taxPersonDeductDetail/exportExcel?company=` + params.company + "&year=" + params.year
      + "&month=" + params.month + "&gpPaygroup=" + params.gpPaygroup;
  },
  getSalaryGroupList_Deduct: (params) => {
    return fetch.get(`/tax/taxPersonDeductDetail/getSalaryGroupList`, {params})
  },

  queryReport_taxPersonCalculate: (params) => {
    return fetch.get(`/tax/taxPersonCalculate/queryReport`, {params})
  },
  calculateTax_taxPersonCalculate: (params) => {
    return fetch.get(`/tax/taxPersonCalculate/calculateTax`, {params})
  },


  aduitLock_taxPersonCalculate: (params) => {
    return fetch.get(`/tax/taxPersonCalculate/aduitLock`, {params})
  },

  getOneAndInit_taxPersonCalculate: (params) => {
    return fetch.get(`/tax/taxPersonCalculate/getOneAndInit`, {params})
  },
  sentDataToSalarySqlDb_taxPersonCalculate: (params) => {
    return fetch.get(`/tax/taxPersonCalculate/sentDataToSalarySqlDb`, {params})
  },
  queryMonthlyForEmp_taxPersonCalculate: (params) => {
    return fetch.get(`/tax/taxPersonCalculate/queryMonthlyForEmp`, {params})
  }

}

export default Tax_API;
