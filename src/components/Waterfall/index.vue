<script setup>
import { ref } from "vue";
import { ItemFactory } from "./utils.js";
import Waterfall from "./Waterfall.vue";
import WaterfallSlot from "./WaterfallSlot.vue";

// mock数据
const items = ref(ItemFactory.get(100));
</script>
<template>
  <div class="waterfall_box">
    <Waterfall
      line="h"
      :line-gap="300"
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
  transition: opacity 0.3s ease;
  -webkit-transition: opacity 0.3s ease;
}
.wf-enter {
  opacity: 0;
}
</style>
