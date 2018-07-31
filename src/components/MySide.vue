<template>
  <div align="left">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          default-active="1-3"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">小工具</span>
            </template>
            <el-menu-item-group>
              <span slot="title">java模版</span>
              <el-menu-item index="1-1" @click="to('/tpl/springboot')">spring boot</el-menu-item>
              <el-menu-item index="1-2" @click="to('/tpl/spring4')">spring mvc</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="白名单">
              <el-menu-item index="1-3" @click="to('/whitelist/list')">列表</el-menu-item>
              <!--<el-menu-item index="1-4" @click="to('/whitelist/add')">添加</el-menu-item>-->
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">购物车</span>
              <el-menu-item index="1-5-1" @click="to('/cart/endorsement')">背书设置</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-setting"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>


<script>
  export default {
    name: 'myside',
    data () {
      return {
        isCollapse: true
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      to (location) {
        this.$router.push(location)
      }
    }
  }
</script>
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
