<template>
  <div class="grade-container text-center">
    <el-row>
      <el-col :span="24">
        <div><b>工资职等分类维护</b></div>
      </el-col>
    </el-row>
    <el-row class="text-left">
      <el-col :span="8" >
        <label style="font-size:small">财务公司：</label>
          <el-select v-model="company" filterable placeholder="请选择财务公司" @change="findListByCompany">
            <el-option
              v-for="item in companyList"
              :key="item.company"
              :label="item.descrShort"
              :value="item.company">
            </el-option>
          </el-select>
      </el-col>
      <el-col :span="10">
        <div>&nbsp;</div>
      </el-col>
      <el-col :span="6" class="text-right">
        <div>
          <el-button type="primary" @click="showExplain">说明</el-button>
          <el-button type="primary" @click="showAddForm(true)">新增</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      :data="tableData" v-loading="loading" element-loading-text="加载中..."
      stripe border :span-method="arraySpanMethod"  :max-height="tableHeight"
      :row-class-name="rowClass"
      :cell-class-name="rowClass"
      style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="60"></el-table-column>
      <el-table-column prop="companyName" align="center" label="财务公司" minWidth="80"></el-table-column>
      <el-table-column prop="name" align="center" label="职等" minWidth="80"></el-table-column>
      <el-table-column prop="sequence" align="center" label="职等排序号" minWidth="80"></el-table-column>
      <el-table-column prop="gradeCategoryName" align="center" :render-header="renderheader"  label="职等分组类别" minWidth="100"></el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" width="28%" :close-on-click-modal="false"
               :visible.sync="dialogEditVisible">
      <el-form :model="editFormData" status-icon :rules="rules" ref="editFormData" label-width="120px" class="text-left">
        <el-form-item label="财务公司" prop="companySalary">
          <el-select v-model="editFormData.companySalary" filterable placeholder="请选择财务公司"  @change="companySalaryChange()">
            <el-option
              v-for="item in companyList"
              :key="item.company"
              :label="item.descrShort"
              :value="item.company">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职等" prop="name">
          <el-input type="text" v-model="editFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="职等排序号" prop="sequence">
          <el-input type="text" v-model="editFormData.sequence"></el-input>
        </el-form-item>
        <el-form-item label="职等分组类别" prop="gradeCategory">
          <el-select   v-model="editFormData.gradeCategory" filterable placeholder="请选择职等分组类别" @change="gradeCategoryChange()">
            <el-option
              v-for="item in gradeCategoryList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('editFormData')">提交</el-button>
          <el-button @click="resetForm('editFormData')">重置</el-button>
          <el-button @click="cancelForm('editFormData')">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>

    <div>
      <el-dialog title="【说明】" width="50%" :close-on-click-modal="false"
                 :visible.sync="dialogVisible">
        <div class="text-left">
          <strong>1、本表作用：</strong>
          <br>（1）用于对各公司的职等进行分组。
          <br>（2）用于对各公司的职等进行排序。
          <br>（3）目的：方便使用人员能够按职等类别进行查看，同时也便于进行权限管理控制。
          <br> <strong>2、本表权限：</strong>只有薪酬管理系统管理员才有权限对本表进行维护和调整。
          <br> &nbsp;
           </div>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .grade-container {
   max-width: 800px;
    /*margin: auto;*/
  }
</style>
<script>
  import SalarySys_API from '@/api/salary/salarySys'
  // import tableUtils from '@/utils/tableUtils'

  export default {
    name: "list",
    data() {
      return {
        loading: false,
        dialogEditVisible: false,
        dialogVisible:false,
        tableHeight:null,
        tableData: [],
        gradeCategoryList: '',
        companyList: [],
        company: '',
        isNew:true,
        dialogTitle:'新增',
        editFormData: {//编辑表单字段
          fdId:'',
          companySalary: '',//财务公司编码（001;003;004;005...）
          companyName: '',//财务公司名称
          name: '',//职等名称
          sequence: '',//排序
          gradeCategory: '',//职等分类
          gradeCategoryName: '',//职等分类名称
        },
        rules: {
          sequence: [{required: true, message: '请输入序号', trigger: 'blur'}],
          companySalary: [{required: true, message: '请选择财务公司', trigger: 'blur'}],
          name: [{required: true, message: '请输入职等名称', trigger: 'blur'}],
          gradeCategory: [{required: true, message: '请选择职等分类', trigger: 'blur'}]
        },

      }
    },
    components: {},
    methods: {
      getTableHeight(){
        this.tableHeight=window.innerHeight-140;
      },

      // renderheader(h, {column, $index}) {
      //   console.log($index)
      //   let arr=column.label.split('</br>')||'';
      //   let hArr=[];
      //   arr.forEach((item,i)=>{
      //     let obj=h('span',{},item);
      //     if(i>0) hArr.push(h('br'));
      //     hArr.push(obj);
      //   });
      //   console.log('harr',hArr)
      //   return h('span', {},hArr);
      //
      //   // return h('span', {}, [
      //   //   h('span', {}, arr.length>=0?arr[0]:''),
      //   //   h('br'),
      //   //   h('span', {}, arr.length>=1?arr[1]:''),
      //   //   h('br'),
      //   //   h('span', {}, arr.length>=2?arr[2]:'')
      //   // ])
      // },
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (row.rowType == 1) {
          return [1, 20];
        }
      },
      rowClass({row, column, rowIndex, columnIndex}) {
        if (row.rowType == 1) {
          return 'warning-row';
        }
      },
      getCompanyList() {
        SalarySys_API.getCompanyList_orgDepartment().then(res => {
          this.companyList = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '公司列表请求异常：' + err.msg})
        });
      },
      findListByCompany() {
        if (this.company == '') return;
        let para = {
          company: this.company
        }
        SalarySys_API.findListByCompany_payAuditSalaryGradeCategory(para).then(res => {
          this.tableData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '状态加载失败：' + err.msg})
        });
      },
      findByType(typeObj) {
        SalarySys_API.findByType_sysBaseData(typeObj).then(res => {
          this.gradeCategoryList = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '工资职等分类加载异常：' + err.msg})
        });
      },
      showAddForm(isNew) {
        this.resetForm('editFormData');
        this.dialogEditVisible = true;
        if(isNew)    {
          this.isNew=true;
          this.dialogTitle='新增';
        } else{
          this.isNew=false;
          this.dialogTitle='编辑';
        }
      },
      //新增、修改保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.isNew){
              SalarySys_API.save_payAuditSalaryGradeCategory(this.editFormData).then(res => {
                this.$message(res.success?{type: 'success', message: '新增成功'}:{type: 'error', message: '新增失败'+res.msg});
                this.resetForm('editFormData');
                this.dialogEditVisible=false;
                this.findListByCompany();
              }).catch(err => {
                this.$message({type: 'error', message: '新增失败：' + err.msg})
              });
            }else{
              SalarySys_API.update_payAuditSalaryGradeCategory(this.editFormData).then(res => {
                this.$message(res.success?{type: 'success', message: '修改成功'}:{type: 'error', message: '修改失败'+res.msg});
                this.resetForm('editFormData');
                this.dialogEditVisible=false;
                this.findListByCompany();
              }).catch(err => {
                this.$message({type: 'error', message: '修改失败：' + err.msg})
              });
            }


          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.isNew=true;
        this.dialogTitle='新增';
        // this.$refs[formName].resetFields();
        this.editFormData={//编辑表单字段
            fdId:'',
            companySalary: '',//财务公司编码（001;003;004;005...）
            companyName: '',//财务公司名称
            name: '',//职等名称
            sequence: '',//排序
            gradeCategory: '',//职等分类
            gradeCategoryName: '',//职等分类名称
        };
      },
      cancelForm(formName){
        this.$refs[formName].resetFields();
        this.dialogEditVisible=false;
      },
      handleEdit(index, row) {
        this.showAddForm(false);
        this.editFormData.fdId=row.fdId;
        this.editFormData.companySalary=row.companySalary;
        this.editFormData.companyName=row.companyName;
        this.editFormData.name=row.name;
        this.editFormData.sequence=row.sequence;
        this.editFormData.gradeCategoryName=row.gradeCategoryName;
        // this.editFormData.gradeCategory=row.gradeCategory;
        var str=row.gradeCategory.toString()||'';
        this.editFormData.gradeCategory=str.replace(/(^\s*)|(\s*$)/g,"");

      },
      handleDelete(index, row) {
        this.$confirm('确定要删除吗？', {type: 'warning'}).then((item) => {
          let para = {ids: row.fdId}
          SalarySys_API.delete_payAuditSalaryGradeCategory(para).then(res => {
            this.$message(res.success ? {type: 'success', message: '删除成功'} : {
              type: 'error',
              message: '删除异常：' + res.msg
            });
            this.findListByCompany();
          }).catch(err => {
            this.$message({type: 'error', message: '删除失败：' + err.msg});
          });
        }).catch(error => {
          this.$message({type: 'info', message: '已取消删除'});
        });
      },
      gradeCategoryChange(){
        var obj=this.gradeCategoryList.find((item)=>{return item.code===this.editFormData.gradeCategory} );
        this.editFormData.gradeCategoryName=obj.name||'';
      },
      companySalaryChange(){
        var obj=this.companyList.find((item)=>{return item.company===this.editFormData.companySalary} );
        this.editFormData.companyName=obj.descrShort||'';
      },

      showExplain(){
        this.dialogVisible=true;
      }
    },
    created() {
    },
    mounted() {
      this.getCompanyList();
      this.findByType({type: '工资职等分类'});
      this.getTableHeight();
    },
    beforeMount(){
      window.addEventListener('resize',this.getTableHeight);
    }
  }
</script>




