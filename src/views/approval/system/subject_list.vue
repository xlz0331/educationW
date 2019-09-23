<template>
  <div class="grade-container text-center">
    <el-row>
      <el-col :span="24">
        <div><b>公文主题维护</b></div>
      </el-col>
    </el-row>
    <el-row class="text-left">
      <el-col :span="8">
        <label style="font-size:small">表单类型：</label>
        <el-select v-model="fromType" filterable placeholder="表单类型" @change="initPage">
          <el-option :key="11" label="通用表单" value="通用表单"></el-option>
          <el-option :key="22" label="固定表单" value="固定表单"></el-option>
          <el-option label="" value=""></el-option>
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
      stripe border :max-height="tableHeight"
      style="width: 100%">
      <el-table-column type="index" align="center" label="序号" width="60"></el-table-column>
      <el-table-column prop="formType" align="center" label="表单类型" minWidth="80"></el-table-column>
      <el-table-column prop="code" align="center" label="编号" minWidth="80"></el-table-column>
      <el-table-column prop="name" align="center" label="公文主题名称" minWidth="80"></el-table-column>
      <el-table-column prop="sequence" align="center" label="排序号" minWidth="80"></el-table-column>
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
      <el-form :model="editFormData" status-icon :rules="rules" ref="editFormData" label-width="120px"
               class="text-left">
        <el-form-item label="表单类型" prop="formType">
          <el-select v-model="editFormData.formType" filterable placeholder="表单类型">
            <el-option :key="1" label="通用表单" value="通用表单"></el-option>
            <el-option :key="2" label="固定表单" value="固定表单"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编号" prop="code">
          <el-input type="text" v-model="editFormData.code"></el-input>
        </el-form-item>
        <el-form-item label="主题名称" prop="name">
          <el-input type="text" v-model="editFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="排序号" prop="sequence">
          <el-input type="number" v-model="editFormData.sequence"></el-input>
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
  import SystemApproval_API from '@/api/approval/systemApproval'


  export default {
    name: "list",
    data() {
      return {
        loading: false,
        dialogEditVisible: false,
        dialogVisible: false,
        tableHeight: null,
        tableData: [],
        isNew: true,
        dialogTitle: '新增',
        fromType: '',
        editFormData: {//编辑表单字段
          fdId: '',
          fromType: '',//表单类型
          code:'',
          name: '',//主题名称
          sequence: '',//排序
        },
        rules: {
          sequence: [{required: true, message: '请输入序号', trigger: 'blur'}],
          formType: [{required: true, message: '请选择表单类型', trigger: 'blur'}],
          code: [{required: true, message: '主题代码', trigger: 'blur'}],
          name: [{required: true, message: '请输入名称', trigger: 'blur'}],
        },
      }
    },
    components: {},
    methods: {
      getTableHeight() {
        this.tableHeight = window.innerHeight - 140;
      },
      findList() {
        let params = {
          fromType: this.fromType
        }
        SystemApproval_API.findList(params).then(res => {
          this.tableData = res.data || [];
        }).catch(err => {
          this.$message({type: 'error', message: '状态加载失败：' + err.msg})
        });
      },
      showAddForm(isNew) {
        this.resetForm('editFormData');
        this.dialogEditVisible = true;
        if (isNew) {
          this.isNew = true;
          this.dialogTitle = '新增';
        } else {
          this.isNew = false;
          this.dialogTitle = '编辑';
        }
      },
      //新增、修改保存
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.isNew) {
              SystemApproval_API.addOne(this.editFormData).then(res => {
                this.$message(res.success ? {type: 'success', message: '新增成功'} : {
                  type: 'error',
                  message: '新增失败' + res.msg
                });
                this.resetForm('editFormData');
                this.dialogEditVisible = false;
                this.initPage();
              }).catch(err => {
                this.$message({type: 'error', message: '新增失败：' + err.msg})
              });
            } else {
              SystemApproval_API.updateOne(this.editFormData).then(res => {
                this.$message(res.success ? {type: 'success', message: '修改成功'} : {
                  type: 'error',
                  message: '修改失败' + res.msg
                });
                this.resetForm('editFormData');
                this.dialogEditVisible = false;
                this.initPage();
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
        this.isNew = true;
        this.dialogTitle = '新增';
        // this.$refs[formName].resetFields();
        this.editFormData = {//编辑表单字段
          fdId: '',
          fromType: '',//表单类型
          name: '',//主题名称
          sequence: '',//排序
          code:''
        };
      },
      cancelForm(formName) {
        this.$refs[formName].resetFields();
        this.dialogEditVisible = false;
      },
      handleEdit(index, row) {
        this.showAddForm(false);
        // this.editFormData = {};
        // this.editFormData.fdId=row.fdId;
        // this.editFormData.code=row.code;
        // this.editFormData.name=row.name;
        // this.editFormData.formType=row.formType;
        // this.editFormData.sequence=row.sequence;
        this.editFormData =Object.assign({},row) ;
      },
      handleDelete(index, row) {
        this.$confirm('确定要删除吗？', {type: 'warning'}).then((item) => {
          let para = {ids: row.fdId}
          SystemApproval_API.delete(para).then(res => {
            this.$message(res.success ? {type: 'success', message: '删除成功'} : {
              type: 'error',
              message: '删除异常：' + res.msg
            });
            this.initPage();
          }).catch(err => {
            this.$message({type: 'error', message: '删除失败：' + err.msg});
          });
        }).catch(error => {
          this.$message({type: 'info', message: '已取消删除'});
        });
      },
      initPage() {
        this.findList();
      },
      showExplain() {
        this.dialogVisible = true;
      }
    },
    created() {
    },
    mounted() {
      this.initPage();
      this.getTableHeight();
    },
    beforeMount() {
      window.addEventListener('resize', this.getTableHeight);
    }
  }
</script>




