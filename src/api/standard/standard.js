import fetch from '@/utils/request'

const Standard_API = {

  queryReport: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/queryReport`, {params})
  },

  queryHistory: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/queryHistory`, {params})
  },

  queryBaseGradeList: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/queryBaseGradeList`, {params})
  },
  queryCompanyCategoryList: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/queryCompanyCategoryList`, {params})
  },


  //职级调整
  adjustQueryReport: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/adjustQueryReport`, {params})
  },

  adjustGiveUp: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/adjustGiveUp`, {params})
  },

  adjustSave: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/adjustSave`, {params})
  },
  gradeAddOne: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/gradeAddOne`, {params})
  },

  gradeChangeAddMoney: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/gradeChangeAddMoney`, {params})
  },
  gradeDeleteOne: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/gradeDeleteOne`, {params})
  },
  gradeFindOne: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/gradeFindOne`, {params})
  },

  gradeSaveOrder: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/gradeSaveOrder`, {params})
  },
  queryBaseGradeList: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/queryBaseGradeList`, {params})
  },
  adjustFindOne: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/adjustFindOne`, {params})
  },
  adjustGetAndInit: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/adjustGetAndInit`, {params})
  },
  wfAdjustSubmit: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/wfAdjustSubmit`, {params})
  },
  wfDraftSubmit: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/wfDraftSubmit`, {params})
  },
  wfNodeSubmit: (params) => {
    return fetch.get(`/salarystruct/ssSalaryGrade/wfNodeSubmit`, {params})
  },

}

export default Standard_API;
