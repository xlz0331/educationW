import fetch from '@/utils/request'

const Subsidy_API = {
  calculateData_subsidyGiveupYearVacation: (params) => {
    return fetch.get(`subsidy/subsidyGiveupYearVacation/calculateData`, {params})
  },

  queryShowList_subsidyGiveupYearVacation: (params) => {
    return fetch.get(`subsidy/subsidyGiveupYearVacation/queryShowList`, {params})
  },

  queryShowOne_subsidyGiveupYearVacation: (params) => {
    return fetch.get(`subsidy/subsidyGiveupYearVacation/queryShowOne`, {params})
  },


  //补助标准
  findListByType_subsidyStandardManual: (params) => {
    return fetch.get(`subsidy/subsidyStandardManual/findListByType`, {params})
  },

  findInputHistoryByType_subsidyStandardManual: (params) => {
    return fetch.get(`subsidy/subsidyStandardManual/findInputHistoryByType`, {params})
  },

  findHistoryByType_subsidyStandardManual: (params) => {
    return fetch.get(`subsidy/subsidyStandardManual/findHistoryByType`, {params})
  },
  addOneForGiveupYearVacation_subsidyStandardManual: (params) => {
    return fetch.get(`subsidy/subsidyStandardManual/addOneForGiveupYearVacation`, {params})
  },

}

export default Subsidy_API;
