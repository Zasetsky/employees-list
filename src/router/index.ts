import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "employees",
    component: () => import("../views/EmployeesPage.vue"),
  },
  {
    path: "/employee/:id",
    name: "details",
    component: () => import("../views/EmployeeDetails.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
