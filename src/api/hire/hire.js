import fetch from '@/utils/request'

const Hire_API = {
  findAllBefore: (params) => {
    return fetch.get(`/hire/hireEntrySalaryConfirm/findAllBefore?companyId=${params}`)
  },
  findSalaryProof: (params) => {
    return fetch.get(`/hire/hireEntrySalaryConfirm/findSalaryProof`, { params })
  },
  findAllGetOffer: (params) => {
    return fetch.get(`/hire/hireEntrySalaryConfirm/findAllGetOffer?companyId=${params}`)
  },
  findPath: (params) => {
    return fetch.get(`/hire/hireEntrySalaryConfirm/findPath?companyId=${params}`)
  },
  findPath1: (params) => {
    return fetch.get(`/hire/hireEntrySalaryConfirm/findPath1`, { params })
  },
  findAllAcceptOffer: (params) => {
    return fetch.get(`/hire/hireEntrySalaryConfirm/findAllAcceptOffer`, { params })
  },
  findAllRefuseOffer: (params) => {
    return fetch.get(`/hire/hireEntrySalaryConfirm/findAllRefuseOffer`, { params })
  },
  salaryConfirmed: (params) => {
    return fetch.post(`/hire/hireEntrySalaryConfirm/salaryConfirmed?companyId=${params}`)
  },
  findOne: (params) => {
    return fetch.post(`/hire/hireEntrySalaryConfirm/findOne?fdId=${params}`)
  },
  ///hire/hireEntryBorrowMoney/findNowHistory
  findNowHistoryBorrow: (params) => {
    return fetch.get(`/hire/hireEntryBorrowMoney/findNowHistory?personalId=${params}`)
  },
  findOtherDataBorrow: (params) => {
    return fetch.get(`/hire/hireEntryBorrowMoney/findOtherData?personalId=${params}`)
  },
  findByPersonalIdBorrow: (params) => {
    return fetch.get(`/hire/hireEntryBorrowMoney/findByPersonalId?personalId=${params}`)
  },
  ///hire/hireEntryBorrowMoney/
  inputOneBorrow: (params) => {
    return fetch.post(`/hire/hireEntryBorrowMoney/inputOne`, params)
  },
  ///hire/hireEntrySalary/inputOne
  findNowHistorySalary: (params) => {
    return fetch.get(`/hire/hireEntrySalary/findNowHistory?personalId=${params}`)
  },
  findOtherDataSalary: (params) => {
    return fetch.get(`/hire/hireEntrySalary/findOtherData?personalId=${params}`)
  },
  findByPersonalIdSalary: (params) => {
    return fetch.get(`/hire/hireEntrySalary/findByPersonalId?personalId=${params}`)
  },
  inputOneSalary: (params) => {
    return fetch.post(`/hire/hireEntrySalary/inputOne`, params)
  },
  findByPersonalIdSalar: (params) => {
    return fetch.get(`/hire/hireEntrySalary/findByPersonalId?personalId=${params}`)
  },
  //hire/hireRepayArrearage/queryNotEntryRepaid
  queryNotEntryRepaid: (params) => {
    return fetch.get(`/hire/hireRepayArrearage/queryNotEntryRepaid?companyId=${params}`)
  },
  queryEntryRepaid: (params) => {
    return fetch.get(`/hire/hireRepayArrearage/queryEntryRepaid?companyId=${params}`)
  },
  ///hire/hireRepayArrearage/findNotEntryRepay
  findNotEntryRepay: (params) => {
    return fetch.get(`/hire/hireRepayArrearage/findNotEntryRepay?companyId=${params}`)
  },
  findNotEntryRepaid: (params) => {
    return fetch.get(`/hire/hireRepayArrearage/findNotEntryRepaid`, { params })
  },
  findEntryRepay: (params) => {
    return fetch.get(`/hire/hireRepayArrearage/findEntryRepay`, { params })
  },
  findEntryRepaid: (params) => {
    return fetch.get(`/hire/hireRepayArrearage/findEntryRepaid`, { params })
  },
  ///hire/hireRepayArrearage/repayRegister
  refuseEntryRepayRegister: (params) => {
    return fetch.post(`/hire/hireRepayArrearage/repayRegister`, params)
  },
  //hire/hireEntryRepayDetail/findByPersonalId
  findRepaidDetailByPersonalId: (params) => {
    return fetch.get(`/hire/hireEntryRepayDetail/findByPersonalId?personalId=${params}`)
  },
  findRepaidDetailByPersonalId2: (params) => {
    return fetch.get(`/hire/hireEntryRepayDetail/findByPersonalId2?personalId=${params}`)
  },
  //hire/hireEntryRepayDetail/addOne
  addOneRepayDetail: (params) => {
    return fetch.post(`/hire/hireEntryRepayDetail/addOne?personalId=${params}`)
  },
  //saveConfirm
  saveConfirmRepayDetail: (params) => {
    return fetch.post(`/hire/hireEntryRepayDetail/saveConfirm`, params)
  },
  uploadFile: (params, personalId, fileId, proofType) => {
    return fetch.post(`/hire/hireProofFiles/upload?personalId=` + personalId + `&fileId=` + fileId + `&proofType=` + proofType + ``, params)
  },
  //hire/hireProofFiles/singlefile
  testUploadFile:(params,test)=>{
    return fetch.post(`/hire/hireProofFiles/singlefile?type=`+test, params)
  },
  downloadFile: (params) => {
    return `/hire/hireProofFiles/download?path=` + params;
  },
  //hire/hireProofFiles/findHireProofByFileId
  findHireProofByFileId: (params) => {
    return fetch.get(`/hire/hireProofFiles/findHireProofByFileId?fileId=${params}`)
  },
  findHireProof: (params) => {
    return fetch.get(`/hire/hireProofFiles/findHireProof`, { params })
  },
  findFilePath: (params) => {
    return fetch.get(`/hire/hireProofFiles/findFilePath`)
  },
  findSalay: (params) => {
    return fetch.get(`/hire/hireProofFiles/findSalay`, { params })
  },
  deleteProofById: (params) => {
    return fetch.get(`/hire/hireProofFiles/delete?ids=${params}`)
  },
  //findAll
  findAllRight: (params) => {
    return fetch.get(`hire/hireEditRight/findAll`)
  },
  addOnePersonalRight: (params) => {
    return fetch.post(`hire/hireEditRight/save`, params)
  },
  deleteRightById: (params) => {
    return fetch.get(`hire/hireEditRight/delete?ids=${params}`)
  },
  //
  getCompanyList: (params) => {
    return fetch.get(`hire/hireEditRight/getCompanyList`)
  },
  getGradeByCompanyId: (params) => {
    return fetch.get(`hire/hireEditRight/getGradeByCompanyId?companyId=${params}`)
  },
  //updateGrade
  updateGrade: (params) => {
    return fetch.post(`hire/hireEditRight/updateGrade`, params)
  },
  //hire/hireEditRight/getBaseRight?companyId=14000
  getBaseRight: (params) => {
    return fetch.get(`hire/hireEditRight/getBaseRight?companyId=${params}`)
  },
  ///
  getAllIsOrgCompany: (params) => {
    return fetch.get(`org/orgDepartment/getAllIsOrgCompany`, { params })
  },


  /**
   * 录用-薪酬报批
   */
  findAllBeforeEntry: (params) => {
    return fetch.get(`hire/hireSalaryContrast/findAllBeforeEntry`, { params })
  },
  findAllByPersonalId: (params) => {
    return fetch.get(`hire/hireSalaryContrast/findAllByPersonalId`, { params })
  },
  saveAllEdit: (nodeParams, params) => {
    let strUrl = `?nodeTyped=${nodeParams.nodeTyped}`;
    strUrl += (nodeParams.nodeId ? `&nodeId=${nodeParams.nodeId}` : '');
    strUrl += (nodeParams.disposeResult ? `&disposeResult=${nodeParams.disposeResult}` : '');
    strUrl += (nodeParams.disposeOpinion ? `&disposeOpinion=${nodeParams.disposeOpinion}` : '');
    return fetch.post(`hire/hireSalaryContrast/saveAllEdit` + strUrl, params)
  },
  saveAllSubProject: (params) => {
    return fetch.post(`hire/hireSalaryContrast/saveAllSubProject`, params)
  },

  deleteByFdId: (params) => {
    return fetch.get(`hire/hireSalaryContrast/deleteByFdId`, { params })
  },

  //谈薪不成功
  talkAboutSalaryFailed: (params) => {
    return fetch.get(`hire/hireSalaryContrast/talkAboutSalaryFailed`, { params })
  },
  findAllTalkSalaryFail: (params) => {
    return fetch.get(`hire/hireSalaryContrast/findAllTalkSalaryFail`, { params })
  },

}
export default Hire_API;
