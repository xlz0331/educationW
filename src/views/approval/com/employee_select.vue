<template>
  <div style="text-align: center;height: 520px">
    <el-transfer
      style="text-align: left; display: inline-block"
      v-model="selectedEmployee"
      filterable
      :filter-method="filterMethod"
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :titles="['选择', '已选择']"
      :button-texts="['移除', '添加']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      @change="handleChange"
      :data="data">
      <span slot-scope="{ option }"> {{option.deptname}} -{{option.posiName}}-{{option.userName}}</span>
    </el-transfer>
  </div>
</template>

<script>
  import Org_API from '@/api/org/org'

  export default {
    name: "flow_node",
    props: {
      keyVal: {
        type: String,
        required: false,
      },
      selectedEmployeeStr: {
        type: String,
        required: true
      },
      empList: {
        type: Array,
        required: false
      }
    },
    data() {
      return {
        data: [],
        selectedEmployee: [],
        tableHeight: null,
        tableData: [],
        loading: false
      }
    },
    components: {},
    methods: {
      findEmployeeIntoList(params) {
        Org_API.findEmployeeIntoList(params).then(res => {
          this.data = res.data || [];
          this.data.forEach((_item, _index) => {
            _item.key = _item.userName;
          })
        }).catch(err => {
          this.$message({type: 'error', message: '数据列表请求异常：' + err.msg})
        });
      },

      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
        // let params = {empName:value};
        // this.findEmployeeIntoList(params);
      },
      filterMethod(query, item) {
        return (item.posiName.indexOf(query) > -1 || item.userName.indexOf(query) > -1);
      },

    },
    mounted() {
      let str = this.selectedEmployeeStr || '';
      let arrEmp = str ? str.trim().split(',') : [];
      this.selectedEmployee = arrEmp;
      this.data = this.empList || [];
      if (this.data.length == 0) {
        this.findEmployeeIntoList({empName: ''});
      }
    },
    watch: {
      selectedEmployeeStr: function (obj, i) {
        let arrEmp = obj ? obj.split(',') : [];
        this.selectedEmployee = arrEmp;
      },
      empList: function (obj) {
        this.data = obj || [];
      }
    }
  }
</script>

<style lang="scss">

  .el-transfer-panel__body {
    height: 420px;
    .el-transfer-panel__list {
      height: 390px;
    }
  }

  .el-transfer-panel {
    width: 300px;
  }

</style>
