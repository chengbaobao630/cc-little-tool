<template>
  <div>
    当前环境:{{cuListEnv}}
    <el-button type="text" @click="choiceEvnShow = true">切换环境</el-button>
    <el-tabs type="border-card">
      <el-tab-pane label="白名单列表">
        <el-table
          :data="whiteList"
          style="width: 100%">
          <el-table-column
            prop="realName"
            label="昵称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="whiteListId"
            label="白名单账号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="whiteListName"
            label="可视化账号"
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteWhiteList(scope.$index, whiteList)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="text" @click="dialogFormVisible = true">添加</el-button>
      </el-tab-pane>
      <el-tab-pane label="接入app">
          <el-table
            :data="registerNode"
            style="width: 100%">
            <el-table-column
              prop="node.node"
              label="节点"
              width="180">
            </el-table-column>
            <el-table-column
              prop="node.nodeName"
              label="名称"
              width="180">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, registerNode, 'registerNode')"
                  type="text"
                  size="small">
                  移除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-tab-pane>
      <el-tab-pane label="黑名单">
        <el-table
          :data="badNode"
          style="width: 100%">
          <el-table-column
            prop="node.node"
            label="节点"
            width="180">
          </el-table-column>
          <el-table-column
            prop="node.nodeName"
            label="名称"
            width="180">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, badNode, 'badNode')"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>

    <el-dialog title="白名单" :visible.sync="dialogFormVisible">
      <el-form :model="whiteAddNode">
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入账号"  v-model="whiteAddNode.id" class="input-with-select">
            <el-select v-model="whiteAddNode.type" style="width: 150px" slot="prepend"  value="wid">
              <el-option label="WID" value="wid"/>
              <el-option label="ldapName" value="ldapName"/>
              <el-option label="ldapId" value="ldapId"/>
              <el-option label="MOBILE" value="mobile"/>
            </el-select>
          </el-input>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addWhiteNode">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="环境选择" :visible.sync="choiceEvnShow">
      <el-form >
        <div style="margin-top: 15px;">
          <el-radio-group v-model="whitelistEnv">
            <el-radio label="dev">dev</el-radio>
            <el-radio label="qa">qa</el-radio>
            <el-radio label="pl">pl</el-radio>
            <el-radio label="online">online</el-radio>
          </el-radio-group>
         <!-- <el-form-item label="账号" prop="pass">
            <el-input v-model="user.account" auto-complete="off"/>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="user.pass" auto-complete="off"/>
          </el-form-item>-->
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
  import service from '@/utils/Service'
  import { mapGetters } from 'vuex'
  import {CHOOSE_HOST} from '@/store/white_list_mutations'
  // import Cookies from 'js-cookie'

  export default {
    name: 'white-list',
    data () {
      return {
        whiteList: [],
        inputVisible: false,
        inputValue: '',
        registerNode: [],
        badNode: [],
        dialogFormVisible: false,
        whiteAddNode: {
          id: '',
          type: ''
        },
        formLabelWidth: '120px',
        cuHost: '',
        whitelistEnv: 'dev',
        cuListEnv: 'dev',
        choiceEvnShow: false,
        user: {
          account: '',
          pass: ''
        }
      }
    },
    methods: {
      addWhiteNode () {
        service(
          {
            url: this.cuHost + '/whitelist/add',
            method: 'POST',
            data: {
              type: this.$data.whiteAddNode.type,
              whiteNode: this.$data.whiteAddNode.id
            }
          }
        ).then(response => {
          if (response.data.code === 0) {
            this.successDialog('保存成功')
            this.getWhiteList()
          }
          this.$data.dialogFormVisible = false
          console.dir(response)
        }).catch(error => {
          console.dir(error)
        })
      },
      errorDialog (msg) {
        this.$message.error(msg)
      },
      successDialog (msg) {
        this.$message({
          message: msg,
          type: 'success'
        })
      },
      openAdd () {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      deleteRow (index, rows, uri) {
        function successDel (params) {
          service({
            url: this.cuHost + '/whitelist/' + uri,
            method: 'POST',
            data: {
              operation: 'del',
              node: params.node
            }
          }).then(delResp => {
            console.dir(delResp)
            if (delResp.data.code === 0) {
              rows.splice(index, 1)
            }
          }).catch(error => {
            this.errorDialog(error.code)
          })
        }
        this.delConfirm('确定删除该节点吗？', successDel, null, {
          node: rows[index].node
        })
      },
      deleteWhiteList (index, rows) {
        let cuVue = this
        function sureDel (params) {
          let whiteNode = params.node.whiteListId
          service({
            url: cuVue.cuHost + '/whitelist/delete',
            method: 'POST',
            data: {
              whiteNode: whiteNode
            }
          }).then(delResp => {
            console.dir(delResp)
            if (delResp.data.code === 0) {
              rows.splice(index, 1)
            }
          }).catch(error => {
            console.dir(error)
            this.errorDialog(error.code)
          })
        }
        this.delConfirm('确定删除吗？', sureDel, null, {
          node: rows[index]
        })
      },
      delConfirm (msg, success, cancel, params) {
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (success) {
            success(params)
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch((error) => {
          console.dir(error)
          if (cancel) {
            cancel()
          }
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      getWhiteList () {
        return service({
          url: this.cuHost + '/whitelist/getAllInfo',
          method: 'POST'
        }).then(response => {
          if (response) {
            if (response.data.code === 0) {
              this.$data.whiteList = response.data.data.whiteListBoList
            }
          }
        }).catch(error => {
          this.errorDialog(error)
        })
      },
      login () {
        return service({
          url: this.cuHost + '/supplier/test/login?username=' + this.user.account + '&password=' + this.user.pass,
          method: 'GET'
        })
      },
      getNodeList () {
        return service({
          url: this.cuHost + '/whitelist/registerNode',
          method: 'POST',
          data: {
            operation: 'get'
          }
        }).then(response => {
          if (response.data.data.node) {
            response.data.data.node.forEach(node => {
              this.$data.registerNode.push({node: node})
            })
          }
        }).catch(error => {
          this.errorDialog(error)
        })
      },
      getBadNodeList () {
        return service({
          url: this.cuHost + '/whitelist/badNode',
          method: 'POST',
          data: {
            operation: 'get'
          }
        }).then(response => {
          if (response.data.data.node) {
            response.data.data.node.forEach(node => {
              this.$data.badNode.push({node: node})
            })
          }
        }).catch(error => {
          this.errorDialog(error)
        })
      },
      choiceEvn () {
        let changeToEnv = this.$data.whitelistEnv
        let cuEnv = this.$data.cuListEnv
        if (changeToEnv === 'pl') {
          changeToEnv = cuEnv
          this.funny()
        }
        this.$store.commit(CHOOSE_HOST, changeToEnv)
        this.$data.cuListEnv = changeToEnv
        this.$data.choiceEvnShow = false
        this.cuHost = this.$store.getters.getCurrentHost
        this.$data.whiteList = []
        // this.login().then(response => {
        //   console.dir(response)
        //   if (response.data.code === 0) {
        //     let domain = this.cuHost.substr(8)
            // domain = '.' + domain
            // console.log(domain)
            // Cookies.set('jx_sid123', '123321', { domain: domain, path: '/', secure: true })
        this.getWhiteList()
          // } else {
          //   this.errorDialog(response.data.message)
          // }
          // location.reload()
        // }).catch(error => {
        //   this.errorDialog(error)
        // })
      },
      funny () {
        this.$notify({
          title: '警告',
          message: '木有pl环境，你是不是傻',
          type: 'warning'
        })
      }
    },
    computed: {
      ...mapGetters([
        'getCurrentHost'
      ])
    },
    mounted () {
      this.cuHost = this.$store.getters.getCurrentHost
      this.getWhiteList()
    }
  }
</script>


<style scoped>

  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
