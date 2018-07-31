<template>
    <el-container>
      <el-header style="background-color: #108ee9;color: white;align-content: center; height: 50px ; line-height: 50px">
        天狼星
      </el-header>
      <el-container>
        <el-aside style="width: 200px">
          <MySide/>
        </el-aside>
        <el-main>
          <MainApp/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
  import MainApp from '@/components/MainApp'
  import MySide from '@/components/MySide'

  export default {
    name: 'generate-template',
    components: {
      MainApp,
      MySide
    }
  }
</script>

<style scoped>

</style>
