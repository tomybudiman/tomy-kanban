import Vue from "vue";
import Router from "vue-router";
import Kanban from "@/components/kanban";

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      component: Kanban
    }
  ]
})
