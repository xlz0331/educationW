import fetch from '@/utils/request'

const SystemApproval_API = {
  addOne: (params) => {
    return fetch.post(`/workflow/wfSubject/addOne`, params)
  },

  delete: (params) => {
    return fetch.get(`/workflow/wfSubject/delete`, {params})
  },
  findList: (params) => {
    return fetch.get(`/workflow/wfSubject/findList`, {params})
  },
  findOne: (params) => {
    return fetch.post(`/workflow/wfSubject/findOne`, params)
  },
  updateOne: (params) => {
    return fetch.post(`/workflow/wfSubject/updateOne`, params)
  },

}

export default SystemApproval_API;
