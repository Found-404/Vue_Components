<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { ItemFactory } from "./utils.js";
import { Waterfall, WaterfallSlot } from "waterfall-v3";

// mock数据
const items = ref(ItemFactory.get(100));
const line = ref(true);

const switchDirection = () => {
  items.value[0].width = 300;
};

function addItems() {
  if (items.value.length < 500) {
    items.value = [...items.value, ...ItemFactory.get(50)];
  }
}
const handleScroll = () => {
  // 滚动高度 + 可视高度 >= 文档总高度（阈值可微调）
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  const scrollHeight = document.documentElement.scrollHeight;
  const threshold = 50; // 距离底部阈值（像素）
  if (scrollTop + clientHeight >= scrollHeight - threshold) {
    // 触发加载更多等逻辑
    addItems();
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
<template>
  <div class="waterfall_box">
    <el-button type="primary" @click="switchDirection">切换方向</el-button>
    <Waterfall
      :line="line ? 'h' : 'v'"
      :line-gap="200"
      :min-line-gap="180"
      :max-line-gap="220"
      ref="waterfall"
    >
      <WaterfallSlot
        v-for="(item, index) in items"
        :width="item.width"
        :height="item.height"
        :key="item.index"
        :order="index"
        move-class="item-move"
      >
        <div class="item" :style="item.style" :index="item.index"></div>
      </WaterfallSlot>
    </Waterfall>
  </div>
</template>
<style scoped>
.waterfall_box {
  height: calc(100vh - 32px);
}

.item-move {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  -webkit-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.item {
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  font-size: 1.2em;
  color: rgb(0, 158, 107);
}
.item:after {
  content: attr(index);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.wf-transition {
  transition: opacity 1s ease;
  -webkit-transition: opacity 0.3s ease;
}
.wf-enter {
  opacity: 0;
}
</style>
