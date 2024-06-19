<template>
  <div>
    <el-space wrap>
      <!-- <router-link to="/hello-Vue">hello-Vue</router-link> -->
      <router-link to="/editTable">editTable</router-link>
      <router-link to="/formDemo">formDemo</router-link>
      <router-link to="/x6">x6</router-link>
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

<style lang="scss" scoped></style>
