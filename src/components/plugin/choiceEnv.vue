<template>
    <div>
      <el-dialog title="环境选择" :visible.sync="choiceEvnShow">
        <el-form >
          <div style="margin-top: 15px;">
            <el-radio-group v-model="whitelistEnv">
              <el-radio label="dev">dev</el-radio>
              <el-radio label="qa">qa</el-radio>
              <el-radio label="pl">pl</el-radio>
              <el-radio label="online">online</el-radio>
            </el-radio-group>
            <el-form-item label="账号" prop="pass">
              <el-input v-model="user.account" auto-complete="off"/>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="user.pass" auto-complete="off"/>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="choiceEvnShow = false">取 消</el-button>
          <el-button type="primary" @click="choiceEvn">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>

<script>
    export default {
      name: 'choice-env',
      data () {
      },
      props: ['choiceEvnShow']
    }
</script>

<style scoped>

</style>
