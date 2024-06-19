<template>
  <div class="my-node">
    <div>{{ nodeLabel }}</div>
    <button @click="toggleCollapse" event="node:collapse">
      {{ isCollapsed ? "Expand" : "Collapse" }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
// import { useGraph } from "@antv/x6-vue-shape";

const props = defineProps(["node", "graph"]);
// const emit = defineEmits(["collapse"]);

const isCollapsed = ref(false);
const nodeLabel = ref("");

onMounted(() => {
  console.log(props.node);
  // nodeLabel.value = props.node.getLabel();
});

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  props.graph.getEdges().forEach((edge) => {
    const originEdge = edge.toJSON();
    function run(source, target, clickNode) {
      if (source.cell === clickNode) {
        if (!isCollapsed.value) {
          if (props.graph.getOutgoingEdges(target.cell)) {
            props.graph.getOutgoingEdges(target.cell).forEach((edge) => {
              if (edge.getTarget()) {
                const target = edge.getTarget();
                props.graph.getCellById(target.cell).show();
              }
            });
          }
          props.graph.getCellById(target.cell).show();
        } else {
          if (props.graph.getOutgoingEdges(target.cell)) {
            props.graph.getOutgoingEdges(target.cell).forEach((edge) => {
              if (edge.getTarget()) {
                const target = edge.getTarget();
                props.graph.getCellById(target.cell).hide();
              }
            });
          }
          props.graph.getCellById(target.cell).hide();
        }
      }
    }
    run(originEdge.source, originEdge.target, props.node.id);
  });
};
</script>

<style scoped>
.my-node {
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  text-align: center;
}
</style>
