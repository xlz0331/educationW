import fetch from '@/utils/request'

const WaittingApproval_API = {
  queryNeedToDoList: (params) => {
    return fetch.get(`/workflow/wfInstance/queryNeedToDoList`, {params})
  },

  queryInstanceListForRunning: (params) => {
    return fetch.get(`/workflow/wfInstance/queryInstanceListForRunning`, {params})
  },

  queryInstanceListForFinish: (params) => {
    return fetch.get(`/workflow/wfInstance/queryInstanceListForFinish`, {params})
  },

  //流程
  getWorkFlowCode: (params) => {
    return fetch.get(`/workflow/wfInstance/getWorkFlowCode`, {params})
  },
  testDraftSubmit: (params) => {
    return fetch.get(`/workflow/wfInstance/testDraftSubmit`, {params})
  },


  findOneInstance: (params) => {
    return fetch.get(`/workflow/wfInstance/findOneInstance`, {params})
  },
  draftSubmit: (params) => {
    return fetch.post(`/workflow/wfInstance/draftSubmit`, params)
  },
  draftSubmit2: (params) => {
    return fetch.get(`/workflow/wfInstance/draftSubmit2`, {params})
  },

  queryFlowNodeList: (params) => {
    return fetch.get(`/workflow/wfInstance/queryFlowNodeList`, {params})
  },
  nodeSubmit: (params) => {
    return fetch.get(`/workflow/wfInstance/nodeSubmit`, {params})
  },
  recallBack: (params) => {
    return fetch.get(`/workflow/wfInstance/recallBack`, {params})
  },
  checkCanRecallBack: (params) => {
    return fetch.get(`/workflow/wfInstance/checkCanRecallBack`, {params})
  },

  getId: () => {
    return fetch.get(`/base/sysBaseData/getId`)
    // return window.global_config.BASE_API + `/base/sysBaseData/getId`;
  },
  getId2: () => {
    return fetch.get(`/base/sysBaseData/getId2`)
  },

  //查找附件
  wfFileDownload: (params) => {
    return window.global_config.BASE_API + `/workflow/wfInstance/wfFileDownload?fdid=${params.fdid}`;
  },
  getAndInitAttToken: (params) => {
    return fetch.get(`/workflow/wfAttDocFile/getAndInitAttToken`, {params})
  },

  //上传正文附件
  wfFileUpload: (params) => {
    return fetch.get(`/workflow/wfInstance/wfFileUpload`, {params})
  },
  wfFileUploadUrl: (params) => {
    return window.global_config.BASE_API + `/workflow/wfInstance/wfFileUpload?instanceId=${params.instanceId}`;
    // return fetch.get(`/workflow/wfInstance/wfFileUpload`, {params})
  },

  //附件
  downloadWfWorkFile: (params) => {
    return window.global_config.BASE_API + `/workflow/wfAttDocFile/downloadWfWorkFile?wfCode=${params.wfCode}`;
  },


}

export default WaittingApproval_API;
