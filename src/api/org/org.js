import fetch from '@/utils/request'

const Org_API = {
  //查询人员信息
  findEmployeeIntoList: (params) => {
    return fetch.get(`org/orgDepartment/findEmployeeIntoList`, {params})
  },


}

export default Org_API;
