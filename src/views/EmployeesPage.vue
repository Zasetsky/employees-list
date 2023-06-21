<template>
  <v-container>
    <employee-form ref="form"></employee-form>
    <employees-table
      @edit="editEmployee"
      @addEmployee="addEmployee"
    ></employees-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import EmployeeForm from "@/components/EmployeeForm.vue";
import { Employee } from "@/types";
import EmployeesTable from "@/components/EmployeesTable.vue";

@Component({
  components: {
    EmployeeForm,
    EmployeesTable,
  },
})
export default class EmployeesPage extends Vue {
  @Ref() readonly form!: EmployeeForm;

  editEmployee(employee: Employee) {
    this.form.edit(employee);
  }

  addEmployee() {
    const emptyEmployee: Employee = {
      id: 0,
      firstName: "",
      lastName: "",
      middleName: "",
      position: "",
      employmentBookSubmitted: false,
      salary: 0,
      employmentDate: new Date(),
      fullTime: true,
    };
    this.form.openForm(emptyEmployee);
  }
}
</script>
