<template>
  <div id="container"></div>
  <TeleportContainer />
</template>

<script setup>
import { onMounted } from "vue";
import { Graph } from "@antv/x6";
import AlgoNode from "../components/AlgoNode.vue";
import { register, getTeleport } from "@antv/x6-vue-shape";

//________________________________________________________________
// 定义节点

// 注册
// Node.registry.register("tree-node", TreeNode, true);

//________________________________________________________________

// 注册自定义节点
register({
  shape: "node-item",
  width: 150,
  height: 100,
  component: AlgoNode,
  // 注册自定义锚点
  ports: {
    groups: {
      in: {
        position: "left",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#C2C8D5",
            strokeWidth: 1,
            fill: "#fff",
          },
        },
      },
      out: {
        position: "right",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#C2C8D5",
            strokeWidth: 1,
            fill: "#fff",
          },
        },
      },
    },
  },
});

// Graph.registerNode("node-item", {
//   inherit: "vue-shape",
//   x: 200,
//   y: 150,
//   width: 150,
//   height: 100,
//   component: AlgoNode,
//   // 注册自定义锚点
//   ports: {
//     groups: {
//       in: {
//         position: "left",
//         attrs: {
//           circle: {
//             r: 4,
//             magnet: true,
//             stroke: "#C2C8D5",
//             strokeWidth: 1,
//             fill: "#fff",
//           },
//         },
//       },
//       out: {
//         position: "right",
//         attrs: {
//           circle: {
//             r: 4,
//             magnet: true,
//             stroke: "#C2C8D5",
//             strokeWidth: 1,
//             fill: "#fff",
//           },
//         },
//       },
//     },
//   },
// });
// Graph.registerRouter("random", randomRouter);
// 注册锚点样式
Graph.registerEdge(
  "dag-edge",
  {
    inherit: "edge",
    attrs: {
      line: {
        stroke: "#C2C8D5",
        strokeWidth: 2,
        targetMarker: null,
      },
    },
  },
  true
);
// 边样式
// Graph.registerConnector(
//   "algo-connector",
//   (s, e) => {
//     const offset = 1;
//     const deltaY = Math.abs(e.y - s.y);
//     const control = Math.floor((deltaY / 3) * 2);

//     const v1 = { x: s.x, y: s.y + offset + control };
//     const v2 = { x: e.x, y: e.y - offset - control };

//     return Path.normalize(
//       `M ${s.x} ${s.y}
//        L ${s.x} ${s.y + offset}
//        C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
//        L ${e.x} ${e.y}
//       `
//     );
//   },
//   true
// );
// function calculateRightAngleCornerPoint(x1, y1, x2, y2) {
//   // Check if x1 and y1 are not equal to x2 and y2
//   if (x1 !== x2 && y1 !== y2) {
//     // Choose one of the possible right angle corner points
//     // For example, (x1, y2) or (x2, y1)
//     return { x: x1, y: y2 }; // You can also return { x: x2, y: y1 };
//   } else {
//     // If x1 equals x2 or y1 equals y2, no right angle corner can be formed
//     console.log("Cannot form a right angle corner with these points.");
//     return null;
//   }
// }
// function randomRouter(vertices, args, view) {
//   // console.log(vertices, args, view);

//   const bounces = args.bounces || 20;
//   const points = vertices.map((p) => Point.create(p));

//   for (var i = 0; i < bounces; i++) {
//     const sourceCorner = view.sourceBBox.getCenter();
//     const targetCorner = view.targetBBox.getCenter();
//     console.log(sourceCorner, targetCorner);

//     const source = {
//       x: 100,
//       y: 100,
//     };
//     const target = {
//       x: 100,
//       y: 100,
//     };
//     //

//     const randomPoint = Point.create(source.x, target.x, source.y, target.y);
//     // console.log("randomPoint", randomPoint);

//     points.push(randomPoint);
//   }
// //   console.log(points);
// //   let cornerPoint = calculateRightAngleCornerPoint(
// //     source.x,
// //     source.y,
// //     target.x,
// //     target.y
// //   );
//   return;
// }

let graph;
const TeleportContainer = getTeleport(); // 自定义节点优化

const refreshData = (data) => {
  //渲染节点数据
  const cells = data.nodes.map((item) => {
    // const node = new TreeNode(item);
    // return new TreeNode(item);
    return graph.createNode(item);
  });
  const edges = data.edges.map((item) => {
    // console.log(item);

    return graph.createEdge(item);
  });
  graph.resetCells([...cells, ...edges]);
  // graph.centerContent();
  // graph.zoomToFit({ padding: 10, maxScale: 1 });
};
const graphInit = () => {
  graph = new Graph({
    container: document.getElementById("container"),
    panning: {
      enabled: true,
      eventTypes: ["leftMouseDown", "mouseWheel"],
    },
    mousewheel: {
      enabled: true,
      modifiers: "ctrl",
      factor: 1.1,
      maxScale: 1.5,
      minScale: 0.5,
    },
    connecting: {
      // snap: true,
      allowBlank: false,
      allowLoop: false,
      highlight: true,
      router: {
        name: "manhattan",
        args: {
          startDirections: ["right"],
          endDirections: ["left"],
          padding: 15,
        },
      },
      // connector: "algo-connector",
      // connectionPoint: "anchor",
      // anchor: "center",
      // validateMagnet({ magnet }) {
      //   return magnet.getAttribute("port-group") !== "top";
      // },
      // createEdge() {
      //   return graph.createEdge({
      //     shape: "dag-edge",
      //     attrs: {
      //       line: {
      //         strokeDasharray: "5 5",
      //       },
      //     },
      //     zIndex: -1,
      //   });
      // },
    },
  });

  let data = {
    nodes: [
      {
        id: "node1", // String，可选，节点的唯一标识
        shape: "node-item",
        x: 40, // Number，必选，节点位置的 x 值
        y: 200, // Number，必选，节点位置的 y 值
        data: {
          nodeId: "node1",
          nodeName: "节点1",
        },
        ports: [
          {
            id: "ports1",
            group: "in",
          },
          {
            id: "ports2",
            group: "out",
          },
        ],
      },
      {
        id: "node2", // String，可选，节点的唯一标识
        shape: "node-item",
        x: 300, // Number，必选，节点位置的 x 值
        y: 100, // Number，必选，节点位置的 y 值
        data: {
          nodeId: "node2",
          nodeName: "节点2",
        },
        ports: [
          {
            id: "ports1",
            group: "in",
          },
          {
            id: "ports2",
            group: "out",
          },
        ],
      },
      {
        id: "node3", // String，可选，节点的唯一标识
        shape: "node-item",
        x: 600, // Number，必选，节点位置的 x 值
        y: 40, // Number，必选，节点位置的 y 值
        data: {
          nodeId: "node2",
          nodeName: "节点2",
        },
        ports: [
          {
            id: "ports1",
            group: "in",
          },
          {
            id: "ports2",
            group: "out",
          },
        ],
      },
      {
        id: "node4", // String，可选，节点的唯一标识
        shape: "node-item",
        x: 600, // Number，必选，节点位置的 x 值
        y: 200, // Number，必选，节点位置的 y 值
        data: {
          nodeId: "node2",
          nodeName: "节点2",
        },
        ports: [
          {
            id: "ports1",
            group: "in",
          },
          {
            id: "ports2",
            group: "out",
          },
        ],
      },
      {
        id: "node5", // String，可选，节点的唯一标识
        shape: "node-item",
        x: 300, // Number，必选，节点位置的 x 值
        y: 400, // Number，必选，节点位置的 y 值
        data: {
          nodeId: "node2",
          nodeName: "节点2",
        },
        ports: [
          {
            id: "ports1",
            group: "in",
          },
          {
            id: "ports2",
            group: "out",
          },
        ],
      },
      {
        id: "node6", // String，可选，节点的唯一标识
        shape: "node-item",
        x: 600, // Number，必选，节点位置的 x 值
        y: 350, // Number，必选，节点位置的 y 值
        data: {
          nodeId: "node2",
          nodeName: "节点2",
        },
        ports: [
          {
            id: "ports1",
            group: "in",
          },
          {
            id: "ports2",
            group: "out",
          },
        ],
      },
      {
        id: "node7", // String，可选，节点的唯一标识
        shape: "node-item",
        x: 600, // Number，必选，节点位置的 x 值
        y: 500, // Number，必选，节点位置的 y 值
        data: {
          nodeId: "node2",
          nodeName: "节点2",
        },
        ports: [
          {
            id: "ports1",
            group: "in",
          },
          {
            id: "ports2",
            group: "out",
          },
        ],
      },
    ],
    edges: [
      {
        id: "edges1",
        shape: "dag-edge",
        source: {
          cell: "node1",
          port: "ports2",
        },
        target: {
          cell: "node2",
          port: "ports1",
        },
        zIndex: 0,
      },
      {
        id: "edges2",
        shape: "dag-edge",
        source: {
          cell: "node2",
          port: "ports2",
        },
        target: {
          cell: "node3",
          port: "ports1",
        },
        zIndex: 0,
      },
      {
        id: "edges3",
        shape: "dag-edge",
        source: {
          cell: "node2",
          port: "ports2",
        },
        target: {
          cell: "node4",
          port: "ports1",
        },
        zIndex: 0,
      },
      {
        id: "edges4",
        shape: "dag-edge",
        source: {
          cell: "node1",
          port: "ports2",
        },
        target: {
          cell: "node5",
          port: "ports1",
        },
        zIndex: 0,
      },
      {
        id: "edges5",
        shape: "dag-edge",
        source: {
          cell: "node5",
          port: "ports2",
        },
        target: {
          cell: "node6",
          port: "ports1",
        },
        zIndex: 0,
      },
      {
        id: "edges6",
        shape: "dag-edge",
        source: {
          cell: "node5",
          port: "ports2",
        },
        target: {
          cell: "node7",
          port: "ports1",
        },
        zIndex: 0,
      },
    ],
  };

  refreshData(data);

  // graph.on("edge:connected", ({ edge }) => {
  //   edge.attr({
  //     line: {
  //       strokeDasharray: "",
  //     },
  //   });
  // });
  // graph.on("node:collapse", ({ node }: { node }) => {

  //   console.log(node);

  //   // node.toggleCollapse();
  //   // const collapsed = node.isCollapsed();
  //   // const run = (pre) => {
  //   //   const succ = graph.getSuccessors(pre, { distance: 1 });
  //   //   if (succ) {
  //   //     succ.forEach((node) => {
  //   //       node.toggleVisible(!collapsed);
  //   //       if (!node.isCollapsed()) {
  //   //         run(node);
  //   //       }
  //   //     });
  //   //   }
  //   // };
  //   // run(node);
  // });
};

onMounted(() => {
  graphInit();
});
</script>

<style>
#container {
  width: 100vw;
  height: 100vh;
}
</style>
