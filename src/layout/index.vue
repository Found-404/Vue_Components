<template>
  <div>
    <el-space wrap class="link">
      <!-- <router-link to="/hello-Vue">hello-Vue</router-link> -->
      <router-link to="/editTable">editTable</router-link>
      <router-link to="/formDemo">formDemo</router-link>
      <router-link to="/x6">x6</router-link>
      <router-link to="/drag">drag</router-link>
    </el-space>

    <!-- 声明路由的占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  }, 
};
</script>

<style scoped>
.link{
  width: 100%;
}
</style>
