import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./style.css";
import App from "./App.vue";

// 导入路由模块
import router from "./router";

const app = createApp(App);

app.use(ElementPlus);

// 挂载路由模块
app.use(router);

app.mount("#app");
