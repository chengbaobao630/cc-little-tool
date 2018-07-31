<template>
  <div align="center">
    <el-steps :active="step" simple>
      <el-step title="配置" icon="el-icon-edit"/>
      <el-step title="生成" icon="el-icon-upload"/>
      <el-step title="下载" icon="el-icon-picture"/>
    </el-steps>
    <div v-show="step === 1 || step === 2"  v-loading="loading"
         :data="ruleForm"
         style="width: 100%">
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="80px" style="width: 400px;margin: 60px 0 0 -100px">
        <el-form-item label="模块名称" prop="moduleName">
          <el-input v-model="ruleForm.moduleName" placeholder="模块名"/>
        </el-form-item>
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="ruleForm.projectName" placeholder="项目名"/>
        </el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form>
    </div>
    <div v-show="step === 3" style="margin: 60px 0 0 -100px">
        <el-button type="primary" @click="download">下载</el-button>
    </div>
  </div>
</template>

<script>
  import service from '@/utils/Service'

  export default {
    name: 'spring-boot',
    data () {
      return {
        ruleForm: {
          moduleName: '',
          projectName: ''
        },
        step: 1,
        rules: {
          moduleName: [{
            required: true,
            message: '模块名不能为空',
            trigger: 'blur'
          }, {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }],
          projectName: [{
            required: true,
            message: '项目名称不能为空',
            trigger: 'blur'
          }, {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }]
        },
        loading: false,
        projectId: ''
      }
    },
    methods: {
      download () {
        window.location.href = 'http://127.0.0.1:8000/download/?projectId=' + this.$data.projectId
        this.resetForm('ruleForm')
        this.$data.step = 1
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$data.step = this.$data.step + 1
            this.$data.loading = true
            service({
              url: 'file/',
              method: 'POST',
              params: {
                moduleName: this.$data.ruleForm.moduleName,
                projectName: this.$data.ruleForm.projectName
              }
            }).then(response => {
              console.dir(response)
              this.$data.loading = false
              this.$data.step = this.$data.step + 1
              this.$data.projectId = response.data.projectId
            }).catch(error => {
              console.dir(error)
              this.$data.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>

</style>
