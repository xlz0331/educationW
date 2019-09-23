<template>
  <div class="salary-container">
    <el-row>
      <el-col :span="24">
        <div><b>{{title}}【本月人员变动审核】界面</b></div>
      </el-col>
    </el-row>
    <el-row class="text-left">
      <el-col :span="6" class="text-left">
        <el-input v-model="salaryYearAndMon" placeholder="月份" readonly>
          <template slot="prepend"><b>月份：</b></template>
        </el-input>
      </el-col>
      <el-col :span="18" class="text-right">
        <div>
          <el-button type="primary" @click="showExplain()">说明</el-button>
          <el-button type="warning" @click="goback()">返回上一级</el-button>
        </div>
      </el-col>
    </el-row>
    <!--element-loading-spinner="el-icon-loading"-->
    <el-table
      :data="tableData" v-loading="loading" element-loading-text="拼命加载中"
      stripe border :span-method="spanMethod" :max-height="tableHeight"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      sum-text="合计">
      <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
      <el-table-column prop="changeTypeText" align="center" label="变动类型" width="100"></el-table-column>
      <el-table-column prop="empName" align="center" label="姓名" width="80"></el-table-column>
      <el-table-column prop="salaryGradeText" align="center" label="职等" min-width="130"></el-table-column>
      <el-table-column prop="salaryRank" align="center" label="职级" width="50"></el-table-column>
      <el-table-column prop="rankSalary" align="center" label="职级工资</br>（元）" :render-header="renderheader"
                       width="100"></el-table-column>
      <el-table-column prop="yearSalary" align="center" label="年薪总额</br>（万元）" :render-header="renderheader"
                       width="100"></el-table-column>
      <el-table-column align="center" label="薪酬增减" width="100">
        <el-table-column prop="changeMonth" align="center" label="月薪（元）" width="100">
        </el-table-column>
        <el-table-column prop="changeYear" align="center" label="年薪（万元）" width="100">
        </el-table-column>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog title="说明" width="58%" :close-on-click-modal="false"
                 :visible.sync="dialogVisible">
        <div class="text-left">
          <strong>1、本表作用：</strong>
          <br>（1）审核本月人员的增加和减少是否合理。
          <br>（2）审核本月异动人员的工资是否有调整，调整前和调整后的工资标准是否准确合理。
          <br><strong>2、本表数据：</strong>只显示本月工资与上月有发生变化的人员，工资没有调整的不显示。 <br> &nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .salary-container {
    width: 840px;
  }
</style>
<script>
  import Salary_API from '@/api/salary/salary'
  import TableUtils from '@/utils/tableUtils'

  export default {
    name: "list",
    data() {
      return {
        loading: false,
        title: '',
        tableHeight: null,
        tableDataArrAll: [],//特殊处理不要key值进行合并
        tableDataArr: [],
        tableData: [],
        colspanData_arr: [],//合并行列所在的位置
        colspanData_arr_nokey: [],//合并行列所在的位置
        salaryYearAndMon: '',
        salaryCompany: '',
        salaryYear: '',
        salaryMonth: '',
        gradeCategory: '',
        dialogVisible: false,
      }
    },
    components: {},
    methods: {
      getTableHeight() {
        this.tableHeight = window.innerHeight - 140;
      },
      renderheader(h, {column, $index}) {
        return h('span', {}, [
          h('span', {}, column.label.split('</br>')[0]),
          h('br'),
          h('span', {}, column.label.split('</br>')[1])
        ])
      },
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (row.rowType == 1) {
          return [1, 20];
        }
      },

      //计算合并的行列位置
      setTableDataArrAll(keyField) {//keyField为索引进行分类存储
        let obj = {};
        this.tableData.forEach((element, index) => {
          if (null != element[keyField]) {
            if (obj[element[keyField]]) {
              obj[element[keyField]].push(index);
            }
            else {
              obj[element[keyField]] = [];
              obj[element[keyField]].push(index);
            }
          }
        });
        for (let i in obj) {
          if (obj[i].length > 1) {
            this.tableDataArrAll.push(obj[i]);
          }
        }
      },
      setTableDataArr(keyField) {//keyField为索引进行分类存储
        let obj = {};
        this.tableData.forEach((element, index) => {
          element.rowIndex = index;
          if (null != element[keyField]) {
            if (obj[element[keyField]]) {
              obj[element[keyField]].push(index);
            }
            else {
              obj[element[keyField]] = [];
              obj[element[keyField]].push(index);
            }
          }
        });
        for (let i in obj) {
          if (obj[i].length > 1) {
            this.tableDataArr.push(obj[i]);
          }
        }
      },
      //合并
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 1) {
          for (let i = 0; i < this.tableDataArrAll.length; i++) {
            let element = this.tableDataArrAll[i]
            for (let j = 0; j < element.length; j++) {
              let item = element[j] == null ? "null" : element[j]
              if (rowIndex == item) {
                if (j == 0) {
                  return {
                    rowspan: element.length,
                    colspan: 1
                  }
                } else if (j != 0) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            }
          }
        }
        if (columnIndex === 2 || columnIndex === 7 || columnIndex === 8) {
          for (let i = 0; i < this.tableDataArr.length; i++) {
            let element = this.tableDataArr[i]
            for (let j = 0; j < element.length; j++) {
              let item = element[j] == null ? "null" : element[j]
              if (rowIndex == item) {
                if (j == 0) {
                  return {
                    rowspan: element.length,
                    colspan: 1
                  }
                } else if (j != 0) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            }
          }
        }
      },


      //合并  new
      spanMethod({row, column, rowIndex, columnIndex}) {
        let colArr_nokey = [1];
        let colspanData_arr_nokey = this.colspanData_arr_nokey || [];
        if (colArr_nokey.includes(columnIndex)) {
          for (let i = 0; i < colspanData_arr_nokey.length; i++) {
            let element = colspanData_arr_nokey[i]
            for (let j = 0; j < element.length; j++) {
              let item = element[j] == null ? "null" : element[j]
              if (rowIndex == item) {
                if (j == 0) {
                  return {
                    rowspan: element.length,
                    colspan: 1
                  }
                } else if (j != 0) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            }
          }
        }

        let colArr = [2,7,8];
        let colspanData_arr = this.colspanData_arr || [];
        if (colArr.includes(columnIndex)) {
          for (let i = 0; i < colspanData_arr.length; i++) {
            let element = colspanData_arr[i]
            for (let j = 0; j < element.length; j++) {
              let item = element[j] == null ? "null" : element[j]
              if (rowIndex == item) {
                if (j == 0) {
                  return {
                    rowspan: element.length,
                    colspan: 1
                  }
                } else if (j != 0) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            }
          }
        }

      },

      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '薪酬总价合计'
          }
          ;
          return;
        })
        const values = data.map(item => Number(item[column.property]));

      },
      rowClass({row, column, rowIndex, columnIndex}) {
        if (row.rowType == 1) {
          return 'warning-row';
        }
      },
      queryList() {
        let params = {
          salaryCompany: this.salaryCompany,
          salaryYear: this.salaryYear,
          salaryMonth: this.salaryMonth,
          gradeCategory: this.gradeCategory
        }
        this.loading = true;
        Salary_API.queryEmployeeDiffList_payAuditSalary(params).then(res => {
          this.tableData = res.data || [];
          // this.tableData.forEach((item,i)=>{
          //   item.changeYear=null
          //   if(i===1)           {
          //     item.yearSalary=null
          //     item.changeMonth=null
          //   }
          //   if(i==2)item.empNo='A202573'
          // })
          this.colspanData_arr_nokey = TableUtils.setTableDataArr(this.tableData, 'changeTypeText')||[];
          this.colspanData_arr = TableUtils.setTableDataArr(this.tableData, 'empNo')||[];
         console.log(this.tableData)
          // this.setTableDataArr("empNo");
          // this.setTableDataArrAll("changeTypeText");
          this.loading = false;
        }).catch(err => {
          this.loading = false;
          this.$message({type: 'error', message: '列表加载失败：' + err.msg})
        });
      },
      initPage() {
        this.queryList();
      },
      goback() {
        this.$store.commit('setSelectMonth',  this.salaryYearAndMon)
        history.go(-1);
      },
      showExplain() {
        this.dialogVisible = true;
      }

    },
    created() {
    },
    mounted() {
      var obj = this.$store.state.salary.commParams || {};
      this.salaryCompany = obj.salaryCompany;
      this.salaryYearAndMon = obj.salaryYearAndMon;
      this.salaryYear = obj.salaryYear;
      this.salaryMonth = obj.salaryMonth;
      this.gradeCategory = obj.gradeCategory;
      this.title = obj.title;
      this.initPage();
      this.getTableHeight();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>




