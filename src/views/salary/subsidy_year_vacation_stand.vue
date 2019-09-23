<template>
  <div class="salary-pay-container">
    <el-row>
      <el-col :span="24">
        <div><b>未休年休假【补助标准维护】表</b></div>
      </el-col>
    </el-row>
    <el-row class="text-left">
      <el-col :span="24" class="text-right">
        <div>
          <el-button type="primary"   @click="showEdit()"  >
            补助比例调整
          </el-button>
          <el-button type="primary"   @click="goHis()">
            补助比例历史查询
          </el-button>
        </div>
      </el-col>
    </el-row>
    <!--element-loading-spinner="el-icon-loading"-->
    <el-table
      :data="tableData" v-loading="loading" element-loading-text="拼命加载中"
      stripe border :span-method="arraySpanMethod" :max-height="tableHeight"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="60">
      </el-table-column>
      <el-table-column prop="itemName" align="center" label="项目" minWidth="60"></el-table-column>
      <el-table-column prop="itemValueText1" align="center" label="补助比例" minWidth="85"></el-table-column>
      <el-table-column prop="startDate" align="center" label="开始执行时间" minWidth="85">
        <template slot-scope="scope">
          {{scope.row.startDate?scope.row.startDate.substring(0,10):''}}
        </template>
      </el-table-column>
      <el-table-column prop="remark" align="center" label="备注" minWidth="85"></el-table-column>
      </el-table>

    <el-dialog title="未休年休假补助标准维护" width="32%" :close-on-click-modal="false" :visible.sync="dialogEditVisible" >
      <el-row :span="24">
        <el-form size="mini" :model="editForm" ref="editForm" :rules="rules" label-position="right" label-width="120px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="补助比例(%)：" prop="itemValue" class="text-left">
                <!--<el-input v-model="editForm.othersDetailListObj.chest"></el-input>-->
                <el-input-number v-model="editForm.itemValue" :precision="1"
                                 :step="10"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="开始执行日期：" prop="startDate" class="text-left">
                <el-date-picker
                  v-model="editForm.startDate"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注：" class="text-left">
                <el-input v-model="editForm.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="float: right">
            <el-button type="primary" @click="submitForm('editForm')">保存</el-button>
            <el-button @click="dialogEditVisible=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
  .salary-pay-container {
    max-width: 800px;
  }

  .hidden_btn {
    display: none;
  }

  .el-select {
    width: 100% !important;
  }

  .el-input-number {
    width: 100%;
  }

  .el-autocomplete {
    width: 100% !important;
  }

  .el-date-editor.el-input {
    width: 100% !important;
  }

</style>
<script>
  import Subsidy_API from '@/api/salary/subsidy'

  export default {
    name: "subsidy_year_vacation_stand",
    data() {
      var checkNumber = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('数值不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 0) {
              callback(new Error('数值不能小于0'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return {
        loading: false,
        dialogEditVisible: false,
        tableHeight: null,
        title: '',
        itemType:'未休年休假补助',
        columnColtrol: {},
        tableData: [],

        calcLoading: false,//计算
        auditLoading: false,

        editForm: {
          itemValue: 0,
          remark: '',
          startDate: ''
        },
        rules: {
          itemValue: [{required: true, message: '比例值不能为空', trigger: 'blur'}],
          startDate: [{required: true, message: '开始执行时间不能为空', trigger: 'blur'}],
        },

        addList: [],
        subuctList: []
      }
    },
    watch: {
      '$route': function () {
        this.getTableHeight();
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
          return [1, 22];
        }
      },
      rowClass({row, column, rowIndex, columnIndex}) {
        if (row.rowType == 1) {
          return 'warning-row';
        }
      },

      //新增补录项目
      showEdit() {
        this.resetForm('editForm');
        this.dialogEditVisible = true;
      },
      resetForm(formName) {
        if (this.$refs[formName] !== undefined) {
          this.$refs[formName].resetFields();
        }
        this.editForm = {
          newName: '',
          plantDate: '',
          treeAge: '',
          address: '',
          plantArea: '',
          siteLevel: '',
          nature: '',
          othersDetailList: [],
          othersDetailListObj: {
            chest: '',
            high: '',
            stockAvg: '',
            rowDistance: '',
            density: '',
            generations: '',
            updateDate: '',
            tendDesc: '',
            investigateDate: '',
            investigator: '',
            investigatorArr: []
          }
        };
      },
      findListByType() {
        let params = {
          itemType:this.itemType
        }
        Subsidy_API.findListByType_subsidyStandardManual(params).then(res => {
          this.tableData=res.data||[];
        }).catch(err => {
          this.$message({type: 'error', message: '列表加载失败：' + err.msg})
        });
      },
      //保存主表、明细表
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = this.editForm || {};
            Subsidy_API.addOneForGiveupYearVacation_subsidyStandardManual(params).then(res => {
              if (res.success) {
                this.$message({
                  showClose: true,
                  message: res.msg||'保存成功',
                  type: 'success'
                });
                this.dialogEditVisible = false;
                this.initPage();
              } else {
                this.$message({
                  showClose: true,
                  message: '保存失败:' + res.msg,
                  type: 'error'
                });
              }
            }).catch(err => {
              if (err.msg) {
                this.$message({
                  showClose: true,
                  message: err.msg,
                  type: 'error'
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      goHis(){
        this.$router.push({path: './subsidy_year_vacation_stand_his'});
      },
      initPage() {
        this.findListByType();
      },
    },
    created() {
    },
    mounted() {
      var routerParams = this.$store.state.salary.routerCommParams;
      this.initPage();
      this.getTableHeight();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>




