import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import { Employee } from "@/types";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    employees: [] as Employee[],
  },

  actions: {
    setEmployees({ commit }, employees) {
      commit("setEmployees", employees);
    },
    addEmployee({ commit }, employee) {
      commit("addEmployee", employee);
    },
    editEmployee({ commit }, employee) {
      commit("editEmployee", employee);
    },
    deleteEmployee({ commit }, employee) {
      commit("deleteEmployee", employee);
    },
  },

  mutations: {
    setEmployees(state, employees) {
      state.employees = employees;
    },
    addEmployee(state, employee) {
      state.employees.push(employee);
    },
    editEmployee(state, editedEmployee) {
      const index = state.employees.findIndex(
        (employee) => employee.id === editedEmployee.id
      );
      if (index !== -1) {
        state.employees.splice(index, 1, editedEmployee);
      }
    },
    deleteEmployee(state, employeeToDelete) {
      state.employees = state.employees.filter(
        (employee) => employee.id !== employeeToDelete.id
      );
    },
  },
  plugins: [vuexLocal.plugin],
});
