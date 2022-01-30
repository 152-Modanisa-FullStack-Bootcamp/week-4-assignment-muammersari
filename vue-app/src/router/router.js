import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import WatchPage from "@/views/WatchPage";

Vue.use(VueRouter);

const routes = [
  { path: "/Home", component: Home },
  { path: "/watch/:videoId", component: WatchPage },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
