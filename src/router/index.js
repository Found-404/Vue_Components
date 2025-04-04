// 1 从vue-router按需导入两个方法
// createRouter方法用于创建路由实例对象
// createWebHashHistory方法用于指定路由的工作模式（hash模式）
import { createRouter, createWebHashHistory } from "vue-router";

import EditTable from "@/components/EditTable";
import FormDemo from "@/components/FormDemo";
import HelloWorld from "@/components/HelloWorld";
import Antdx6 from "@/components/antdx6";
import Drag from "@/components/Drag/Drag";
import Waterfall from "@/components/Waterfall/index.vue";

// 3 创建路由对象
const router = createRouter({
  // 3.1 通过 history 属性，指定路由的工作模式
  history: createWebHashHistory(),
  // 3.2 通过 routes 数组，指定路由规则
  // path 是 hash 地址，component 是要展示的组件
  routes: [
    {
      path: "",
      hidden: true,
      redirect: "/editTable",
    },
    { path: "/hello-Vue", component: HelloWorld },
    { path: "/editTable", component: EditTable },
    { path: "/formDemo", component: FormDemo },
    { path: "/x6", component: Antdx6 },
    { path: "/drag", component: Drag },
    { path: "/vue3-waterfall", component: Waterfall },
  ],
});

// 4、向外共享路由对象
export default router;
