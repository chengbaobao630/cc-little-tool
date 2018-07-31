<template>

  <div>
    当前环境:{{cartEnv}}
    <el-button type="text" @click="choiceEvnShow = true">切换环境</el-button>
    <el-form-item label=平台背书 prop="endorsement">
      <!--12345-->
      <el-input v-model="endorsement" auto-complete="off"/>
    </el-form-item>
    <el-dialog title="环境选择" :visible.sync="choiceEvnShow">
      <el-form >
        <div style="margin-top: 15px;">
          <el-radio-group v-model="cartEnv">
            <el-radio label="dev">dev</el-radio>
            <el-radio label="qa">qa</el-radio>
            <el-radio label="pl">pl</el-radio>
            <el-radio label="online">online</el-radio>
          </el-radio-group>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="choiceEvnShow = false">取 消</el-button>
          <el-button type="primary" @click="choiceEvn">确 定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  // import service from '@/utils/Service'
  import {CHOOSE_HOST} from '@/store/white_list_mutations'

  export default {
    name: 'endorsement',
    data () {
      return {
        choiceEvnShow: false,
        endorsement: '',
        cuListEnv: '',
        cartEnv: '',
        cuHost: ''
      }
    },
    methods: {
      choiceEvn () {
        let changeToEnv = this.$data.cartEnv
        let cuEnv = this.$data.cuListEnv
        if (changeToEnv === 'pl') {
          changeToEnv = cuEnv
          this.funny()
        }
        this.$store.commit(CHOOSE_HOST, changeToEnv)
        this.$data.cuListEnv = changeToEnv
        this.$data.choiceEvnShow = false
        this.cuHost = this.$store.getters.getCurrentHost
        this.$data.endorsement = ''
      }
    },
    mounted () {
      this.cuHost = this.$store.getters.getCurrentHost
    }
  }
</script>

<style scoped>

</style>
